import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { insights } from "@/data/insights";

interface InsightPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return insights.map((insight) => ({
    slug: insight.slug,
  }));
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = insights.find((item) => item.slug === slug);

  if (!insight) {
    return {
      title: "Insight not found",
    };
  }

  return {
    title: insight.title,
    description: insight.excerpt,
  };
}

export default async function InsightPage({
  params,
}: InsightPageProps) {
  const { slug } = await params;
  const insight = insights.find((item) => item.slug === slug);

  if (!insight) {
    notFound();
  }

  return (
    <main className="bg-white">
      {/* Article header */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-4xl">
            <Link
              href="/insights"
              className="text-sm font-semibold text-geoweb-text/50 transition-colors hover:text-geoweb-red"
            >
              ← Back to insights
            </Link>

            <div className="mt-12 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em]">
              <span className="text-geoweb-red">{insight.category}</span>

              <span className="text-geoweb-text/25">•</span>

              <span className="text-geoweb-text/45">{insight.date}</span>

              <span className="text-geoweb-text/25">•</span>

              <span className="text-geoweb-text/45">
                {insight.readTime}
              </span>
            </div>

            <h1 className="font-display mt-6 text-5xl font-normal leading-[1.05] tracking-[-0.03em] text-geoweb-text sm:text-6xl lg:text-7xl">
              {insight.title}
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-8 text-geoweb-text/60">
              {insight.excerpt}
            </p>
          </div>
        </Container>
      </section>

      {/* Article */}
      <section className="border-t border-geoweb-indigo/10 py-20 sm:py-28">
        <Container>
          <article className="mx-auto max-w-3xl">
            {insight.content.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-8 text-lg leading-9 text-geoweb-text/75 first:mt-0"
              >
                {paragraph}
              </p>
            ))}
          </article>
        </Container>
      </section>

      {/* Article CTA */}
      <section className="bg-geoweb-indigo py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              Build something useful
            </p>

            <h2 className="font-display mt-5 text-4xl font-normal leading-tight text-white sm:text-5xl">
              Have a business problem that technology could solve?
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
              You don&apos;t need to know exactly what to build. Start by telling
              us what you&apos;re trying to achieve.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-full bg-geoweb-red px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-geoweb-indigo"
            >
              Start a project →
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}