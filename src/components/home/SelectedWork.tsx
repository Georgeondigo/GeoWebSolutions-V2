import Link from "next/link";
import Container from "@/components/ui/Container";
import { projects } from "@/data/projects";

export default function SelectedWork() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section className="bg-geoweb-gray py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              Selected work
            </p>

            <h2 className="font-display mt-5 text-4xl font-semibold leading-tight tracking-[-0.02em] text-geoweb-text sm:text-5xl">
              Work built around real needs.
            </h2>

            <p className="mt-6 text-lg leading-8 text-geoweb-text/65">
              A selection of digital experiences and products we&apos;ve worked on
              for businesses and organizations.
            </p>
          </div>

          <Link
            href="/work"
            className="shrink-0 text-sm font-semibold text-geoweb-indigo underline underline-offset-4 transition-colors hover:text-geoweb-red"
          >
            View all work →
          </Link>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block"
            >
              <article>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-geoweb-indigo">
                  <div className="absolute inset-0 flex items-end p-8">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-geoweb-red">
                        {project.category}
                      </span>

                      <h3 className="font-display text-3xl font-semibold tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-110" />

                  <div className="absolute -bottom-12 -right-8 h-32 w-32 rounded-full bg-geoweb-red transition-transform duration-500 group-hover:scale-110" />
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold text-geoweb-text">
                      {project.title}
                    </h3>

                    <span className="text-geoweb-red transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-geoweb-text/60">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-geoweb-indigo/10 px-3 py-1 text-xs text-geoweb-text/60"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}