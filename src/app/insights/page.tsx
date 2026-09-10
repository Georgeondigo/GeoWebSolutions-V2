import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { insights } from "@/data/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Ideas and practical perspectives from GeoWeb Solutions on digital products, web development and technology.",
};

export default function InsightsPage() {
  const featuredInsight = insights.find((insight) => insight.featured);
  const otherInsights = insights.filter((insight) => !insight.featured);

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              Insights
            </p>

            <h1 className="font-display mt-5 text-5xl font-normal leading-[1.05] tracking-[-0.03em] text-geoweb-text sm:text-6xl lg:text-7xl">
              Ideas about technology, digital products and business.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-geoweb-text/65 sm:text-xl">
              Practical perspectives on building better digital experiences,
              solving business problems with technology and creating products
              that are useful beyond launch.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured */}
      {featuredInsight && (
        <section className="bg-geoweb-gray py-20 sm:py-28">
          <Container>
            <Link
              href={`/insights/${featuredInsight.slug}`}
              className="group block"
            >
              <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-geoweb-indigo">
                  <div
                    aria-hidden="true"
                    className="relative h-48 w-48 rounded-full border border-white/10 sm:h-64 sm:w-64"
                  >
                    <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-geoweb-red sm:h-32 sm:w-32" />
                    <div className="absolute -right-5 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white/10" />
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em]">
                    <span className="text-geoweb-red">
                      {featuredInsight.category}
                    </span>

                    <span className="text-geoweb-text/30">•</span>

                    <span className="text-geoweb-text/45">
                      {featuredInsight.readTime}
                    </span>
                  </div>

                  <h2 className="font-display mt-5 text-4xl font-normal leading-tight tracking-tight text-geoweb-text transition-colors group-hover:text-geoweb-red sm:text-5xl">
                    {featuredInsight.title}
                  </h2>

                  <p className="mt-6 max-w-xl text-lg leading-8 text-geoweb-text/65">
                    {featuredInsight.excerpt}
                  </p>

                  <span className="mt-8 text-sm font-semibold text-geoweb-text">
                    Read article →
                  </span>
                </div>
              </div>
            </Link>
          </Container>
        </section>
      )}

      {/* Articles */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              Latest thinking
            </p>

            <h2 className="font-display mt-5 text-4xl font-normal tracking-tight text-geoweb-text sm:text-5xl">
              More from GeoWeb.
            </h2>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2">
            {otherInsights.map((insight) => (
              <article
                key={insight.slug}
                className="border-t border-geoweb-indigo/10 pt-6"
              >
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em]">
                  <span className="text-geoweb-red">{insight.category}</span>

                  <span className="text-geoweb-text/30">•</span>

                  <span className="text-geoweb-text/40">
                    {insight.readTime}
                  </span>
                </div>

                <h3 className="font-display mt-5 text-3xl font-normal leading-tight text-geoweb-text">
                  {insight.title}
                </h3>

                <p className="mt-4 max-w-xl leading-7 text-geoweb-text/60">
                  {insight.excerpt}
                </p>

                <Link
                  href={`/insights/${insight.slug}`}
                  className="mt-6 inline-flex text-sm font-semibold text-geoweb-text transition-colors hover:text-geoweb-red"
                >
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-geoweb-gray py-24 sm:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              Have a problem to solve?
            </p>

            <h2 className="font-display mt-5 text-4xl font-normal leading-tight tracking-tight text-geoweb-text sm:text-5xl">
              Let&apos;s turn the problem into something useful.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-geoweb-text/65">
              If you&apos;re thinking about a new website, application or business
              system, we&apos;d be happy to understand what you&apos;re trying to
              achieve.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-full bg-geoweb-red px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-geoweb-indigo"
            >
              Start a project →
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}