"use client";

import { FormEvent, useMemo, useState } from "react";

type ListingResult = {
  title: string;
  tags: string[];
  description: string;
};

type GenerateListingResponse =
  | ListingResult
  | {
      error?: string;
    };

const initialResult: ListingResult = {
  title: "",
  tags: [],
  description: "",
};

export default function DashboardPage() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [result, setResult] = useState<ListingResult>(initialResult);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedSection, setCopiedSection] = useState<
    "title" | "tags" | "description" | ""
  >("");

  const canGenerate = useMemo(() => {
    return [productName, category, style, targetAudience].every(
      (value) => value.trim().length > 0,
    );
  }, [productName, category, style, targetAudience]);

  const handleGenerate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");
    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: productName,
          category,
          style,
          audience: targetAudience,
        }),
      });

      const data = (await response.json()) as GenerateListingResponse;

      if (!response.ok) {
        setErrorMessage(data.error ?? "Unable to generate listing right now.");
        return;
      }

      if (
        typeof data.title !== "string" ||
        !Array.isArray(data.tags) ||
        typeof data.description !== "string"
      ) {
        setErrorMessage("Invalid response from generate-listing API.");
        return;
      }

      setResult({
        title: data.title,
        tags: data.tags,
        description: data.description,
      });
    } catch {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (
    key: "title" | "tags" | "description",
    value: string,
  ) => {
    if (!value.trim()) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopiedSection(key);
      setTimeout(() => setCopiedSection(""), 1200);
    } catch {
      setCopiedSection("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:py-14">
        <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-sky-700">
            Listify Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Generate Better Product Listings
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Fill in the product details, generate your listing assets, and copy
            each result section in one click.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <form
            onSubmit={handleGenerate}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-semibold">Listing Inputs</h2>
            <div className="mt-6 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">
                  Product Name
                </span>
                <input
                  type="text"
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                  placeholder="Example: Handwoven Boho Throw Blanket"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">
                  Category
                </span>
                <input
                  type="text"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  placeholder="Example: Home Decor"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">
                  Style
                </span>
                <input
                  type="text"
                  value={style}
                  onChange={(event) => setStyle(event.target.value)}
                  placeholder="Example: Minimalist"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">
                  Target Audience
                </span>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(event) => setTargetAudience(event.target.value)}
                  placeholder="Example: First-time homeowners"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={!canGenerate || isGenerating}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isGenerating ? "Generating..." : "Generate Listing"}
            </button>
            {errorMessage ? (
              <p className="mt-3 text-sm font-medium text-rose-600">
                {errorMessage}
              </p>
            ) : null}
          </form>

          <div className="grid gap-4">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold">Title</h3>
                <button
                  type="button"
                  onClick={() => copyToClipboard("title", result.title)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
                >
                  {copiedSection === "title" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="mt-3 min-h-16 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                {result.title || "Your generated title will appear here."}
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold">Tags</h3>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard("tags", result.tags.join(", "))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
                >
                  {copiedSection === "tags" ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="mt-3 min-h-16 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                {result.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-900"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  "Your generated tags will appear here."
                )}
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold">Description</h3>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard("description", result.description)
                  }
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
                >
                  {copiedSection === "description" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="mt-3 min-h-24 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                {result.description ||
                  "Your generated description will appear here."}
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
