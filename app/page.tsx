export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,#eff6ff,transparent_35%),radial-gradient(circle_at_90%_0%,#e0f2fe,transparent_30%),linear-gradient(180deg,#f8fafc_0%,#ffffff_45%,#f8fafc_100%)] text-slate-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-500 font-bold text-white shadow-lg shadow-sky-200">
            L
          </div>
          <span className="text-lg font-semibold tracking-tight">Listify</span>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a className="transition hover:text-slate-900" href="#how-it-works">
            How it works
          </a>
          <a className="transition hover:text-slate-900" href="#example-output">
            Example output
          </a>
          <a
            className="rounded-full border border-slate-300 px-4 py-2 text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            href="#cta"
          >
            Start free
          </a>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-28 px-6 pb-20 pt-6 sm:px-8 sm:pt-10">
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-sky-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700">
              Built for Etsy sellers
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Generate high-converting Etsy listings in seconds.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Listify instantly creates optimized titles, tags, and product
              descriptions so you can launch products faster and spend less time
              writing.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#cta"
                className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-500"
              >
                Generate my first listing
              </a>
              <a
                href="#example-output"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                See sample output
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-30px_rgba(14,116,144,0.35)] sm:p-8">
            <p className="text-sm font-medium text-slate-500">Prompt</p>
            <p className="mt-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              &quot;Handmade soy candle, lavender scent, 8oz glass jar, gift for
              her&quot;
            </p>
            <p className="mt-5 text-sm font-medium text-slate-500">
              Generated title
            </p>
            <p className="mt-2 rounded-xl bg-sky-50 p-4 text-sm font-semibold text-slate-900">
              Lavender Soy Candle in Glass Jar | Handmade 8oz Aromatherapy Gift
              for Her
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2 text-xs font-medium text-sky-800 sm:text-sm">
              {[
                "lavender candle",
                "soy wax gift",
                "gift for her",
                "handmade decor",
                "aromatherapy",
                "8oz jar candle",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-sky-100 px-2 py-1 text-center"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How it works
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Three simple steps to transform rough product notes into polished
              Etsy listing content.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Describe your product",
                description:
                  "Paste your raw details, style, audience, and keywords in one input.",
              },
              {
                step: "02",
                title: "AI generates listing copy",
                description:
                  "Listify creates SEO-friendly titles, tag sets, and persuasive descriptions.",
              },
              {
                step: "03",
                title: "Publish and test",
                description:
                  "Copy to Etsy, launch faster, and iterate based on clicks and conversions.",
              },
            ].map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-xs font-semibold tracking-[0.14em] text-sky-700">
                  STEP {item.step}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="example-output" className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Example output
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              This is the kind of polished content Listify generates from a
              single product prompt.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">SEO title</p>
              <p className="mt-3 text-lg font-semibold leading-8 text-slate-900">
                Personalized Teacher Tote Bag, Canvas School Gift, Custom Name
                Market Bag
              </p>
              <p className="mt-6 text-sm font-medium text-slate-500">
                High-intent tags
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                {[
                  "teacher gift",
                  "custom tote",
                  "canvas bag",
                  "back to school",
                  "teacher appreciation",
                  "personalized gift",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Description</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Celebrate your favorite educator with a personalized canvas tote
                made for busy school days. This durable and lightweight bag is
                perfect for carrying lesson plans, books, and daily essentials
                while adding a thoughtful custom touch.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Choose your preferred name and color style to create a practical
                gift teachers will actually use. Great for teacher appreciation
                week, end-of-year thank you gifts, and back-to-school surprises.
              </p>
            </div>
          </div>
        </section>

        <section
          id="cta"
          className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl shadow-slate-300 sm:p-12"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-300">
            Call to action
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Turn product ideas into Etsy-ready listings in under 30 seconds.
          </h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            Join sellers using Listify to write faster, rank better, and publish
            more consistently.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Start for free
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60"
            >
              Book a demo
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
