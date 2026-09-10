import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how GeoWeb Solutions approaches digital experiences, software and business problems.",
};

const principles = [
  {
    number: "01",
    title: "Start with the problem",
    description:
      "Technology should serve a purpose. We begin by understanding the business problem, the people involved and what success should look like before deciding what to build.",
  },
  {
    number: "02",
    title: "Build with intention",
    description:
      "We choose technologies and architectures based on the requirements of the solution—not simply because a technology is popular.",
  },
  {
    number: "03",
    title: "Make it useful",
    description:
      "A digital product should make something better. We focus on usability, performance, reliability and the actual experience of the people using it.",
  },
  {
    number: "04",
    title: "Keep improving",
    description:
      "Launching a solution is not the end. We use feedback, data and real-world usage to identify opportunities and continuously improve what we build.",
  },
];

const approach = [
  "Understand the business",
  "Define the requirements",
  "Design the experience",
  "Build the solution",
  "Test what we build",
  "Launch and measure",
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              About GeoWeb
            </p>

            <h1 className="font-display mt-5 max-w-4xl text-5xl font-normal leading-[1.05] tracking-[-0.03em] text-geoweb-text sm:text-6xl lg:text-7xl">
              We build digital solutions around real business problems.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-geoweb-text/65 sm:text-xl">
              GeoWeb Solutions is a digital solutions company helping
              businesses build stronger online operations through websites,
              web applications and digital products.
            </p>
          </div>
        </Container>
      </section>

      {/* Who we are */}
      <section className="bg-geoweb-gray py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
                Who we are
              </p>

              <h2 className="font-display mt-5 text-4xl font-normal tracking-tight text-geoweb-text sm:text-5xl">
                More than a website studio.
              </h2>
            </div>

            <div className="max-w-3xl space-y-6 text-lg leading-8 text-geoweb-text/70">
              <p>
                Businesses don&apos;t always need another website. Sometimes they
                need a better way to communicate with customers. Sometimes
                they need to replace a manual process, organize their data,
                automate a workflow or build a system that supports growth.
              </p>

              <p>
                That&apos;s where GeoWeb comes in. We combine design, software
                development and technology to create practical digital
                solutions around the needs of the business.
              </p>

              <p>
                Whether we&apos;re building a professional website, a customer
                portal or a custom business application, the goal remains the
                same: build something useful, reliable and capable of growing
                with the organization.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              What we believe
            </p>

            <h2 className="font-display mt-5 text-4xl font-normal tracking-tight text-geoweb-text sm:text-5xl">
              Good technology starts with good thinking.
            </h2>
          </div>

          <div className="mt-16 border-t border-geoweb-indigo/10">
            {principles.map((principle) => (
              <article
                key={principle.number}
                className="grid gap-6 border-b border-geoweb-indigo/10 py-10 sm:grid-cols-[100px_0.8fr_1.2fr] sm:items-start sm:gap-10"
              >
                <span className="text-sm font-semibold text-geoweb-red">
                  {principle.number}
                </span>

                <h3 className="font-display text-2xl font-normal text-geoweb-text sm:text-3xl">
                  {principle.title}
                </h3>

                <p className="max-w-xl text-base leading-7 text-geoweb-text/65">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Approach */}
      <section className="bg-geoweb-indigo py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
                Our approach
              </p>

              <h2 className="font-display mt-5 text-4xl font-normal tracking-tight text-white sm:text-5xl">
                From idea to working solution.
              </h2>

              <p className="mt-6 max-w-md text-lg leading-8 text-white/60">
                We use a structured process that keeps business goals,
                technical decisions and the user experience connected.
              </p>
            </div>

            <div className="border-t border-white/10">
              {approach.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-6 border-b border-white/10 py-5"
                >
                  <span className="text-sm font-semibold text-geoweb-red">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="font-display text-xl font-normal text-white sm:text-2xl">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Why GeoWeb */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              Why GeoWeb
            </p>

            <h2 className="font-display mt-5 text-4xl font-normal tracking-tight text-geoweb-text sm:text-5xl">
              Practical solutions. Modern engineering. Long-term thinking.
            </h2>

            <p className="mt-6 text-lg leading-8 text-geoweb-text/65">
              We care about what happens after a project goes live. The
              solutions we build should be understandable, maintainable,
              performant and ready to evolve as the business grows.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border-t border-geoweb-indigo/10 pt-6">
              <h3 className="font-display text-2xl text-geoweb-text">
                Business-first
              </h3>

              <p className="mt-3 leading-7 text-geoweb-text/60">
                We understand the objective before choosing the technology.
              </p>
            </div>

            <div className="border-t border-geoweb-indigo/10 pt-6">
              <h3 className="font-display text-2xl text-geoweb-text">
                Custom-built
              </h3>

              <p className="mt-3 leading-7 text-geoweb-text/60">
                Solutions are designed around the organization&apos;s actual needs
                and workflows.
              </p>
            </div>

            <div className="border-t border-geoweb-indigo/10 pt-6">
              <h3 className="font-display text-2xl text-geoweb-text">
                Built to evolve
              </h3>

              <p className="mt-3 leading-7 text-geoweb-text/60">
                We build with maintainability, performance and future growth
                in mind.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-geoweb-gray py-24 sm:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              Let&apos;s work together
            </p>

            <h2 className="font-display mt-5 text-4xl font-normal leading-tight tracking-tight text-geoweb-text sm:text-5xl">
              Have a problem worth solving?
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-geoweb-text/65">
              Tell us what you&apos;re trying to achieve. We&apos;ll help turn the
              problem into a practical digital solution.
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