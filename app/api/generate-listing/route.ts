import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

type GenerateListingRequest = {
  product_name?: string;
  audience?: string;
  productName?: string;
  category?: string;
  style?: string;
  targetAudience?: string;
};

type GeneratedListing = {
  title: string;
  tags: string[];
  description: string;
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function truncate(text: string, maxChars: number): string {
  if (text.length <= maxChars) {
    return text;
  }

  return text.slice(0, maxChars - 1).trimEnd() + "...";
}

function normalizeTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) {
    return [];
  }

  const unique = new Set<string>();

  for (const rawTag of tags) {
    if (typeof rawTag !== "string") {
      continue;
    }

    const tag = rawTag.trim().toLowerCase();
    if (!tag) {
      continue;
    }

    unique.add(tag.slice(0, 20));
    if (unique.size >= 13) {
      break;
    }
  }

  return Array.from(unique);
}

function fallbackTags(
  productName: string,
  category: string,
  style: string,
  audience: string,
): string[] {
  const seeds = [
    productName,
    category,
    style,
    audience,
    `${style} ${category}`,
    `${productName} gift`,
    "etsy gift",
    "handmade",
    "small business",
    "gift for her",
    "gift for him",
    "home decor",
    "unique gift",
  ];

  return normalizeTags(seeds).slice(0, 13);
}

export async function POST(request: Request) {
  let body: GenerateListingRequest;

  try {
    body = (await request.json()) as GenerateListingRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const productName = (body.product_name ?? body.productName ?? "").trim();
  const category = body.category?.trim() ?? "";
  const style = body.style?.trim() ?? "";
  const targetAudience = (body.audience ?? body.targetAudience ?? "").trim();

  if (!productName || !category || !style || !targetAudience) {
    return NextResponse.json(
      {
        error:
          "All fields are required: product_name, category, style, audience.",
      },
      { status: 400 },
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error: "Missing OPENAI_API_KEY environment variable.",
      },
      { status: 500 },
    );
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are an expert Etsy SEO copywriter. Always return valid JSON with keys: title, tags, description. Rules: title max 140 characters; tags must be exactly 13 unique Etsy-style tags (short keyword phrases); description should be persuasive and optimized for Etsy search.",
        },
        {
          role: "user",
          content: JSON.stringify({
            product_name: productName,
            category,
            style,
            audience: targetAudience,
          }),
        },
      ],
    });

    const rawContent = completion.choices[0]?.message?.content;
    if (!rawContent) {
      return NextResponse.json(
        { error: "OpenAI returned an empty response." },
        { status: 502 },
      );
    }

    const parsed = JSON.parse(rawContent) as Partial<GeneratedListing>;

    const title = truncate((parsed.title ?? "").trim(), 140);
    const tags = normalizeTags(parsed.tags);
    const description = (parsed.description ?? "").trim();

    const safeTitle =
      title ||
      truncate(
        `${productName} ${style} ${category} for ${targetAudience}`,
        140,
      );
    const safeTags =
      tags.length === 13
        ? tags
        : fallbackTags(productName, category, style, targetAudience);
    const safeDescription =
      description ||
      `${productName} is a ${style.toLowerCase()} ${category.toLowerCase()} made for ${targetAudience.toLowerCase()}. Discover Etsy-ready messaging with clear benefits and keyword-rich phrasing to improve visibility and conversions.`;

    return NextResponse.json({
      title: safeTitle,
      tags: safeTags,
      description: safeDescription,
    });
  } catch (error: unknown) {
    const fallbackMessage =
      error instanceof Error ? error.message : "Unknown OpenAI error.";
    const status =
      typeof (error as { status?: unknown })?.status === "number"
        ? ((error as { status: number }).status as number)
        : 502;
    const providerMessage =
      typeof (error as { error?: { message?: unknown } })?.error?.message ===
      "string"
        ? ((error as { error: { message: string } }).error.message as string)
        : fallbackMessage;
    const safeMessage = providerMessage.replace(
      /sk-[A-Za-z0-9_-]+/g,
      "[redacted-key]",
    );

    console.error("OpenAI listing generation failed", {
      status,
      message: safeMessage,
    });

    return NextResponse.json(
      { error: `Failed to generate listing from OpenAI: ${safeMessage}` },
      { status: status >= 400 && status <= 599 ? status : 502 },
    );
  }
}
