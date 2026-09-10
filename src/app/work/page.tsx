import Link from "next/link";
import Container from "@/components/ui/Container";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Work",
  description:
    "Explore selected websites, web applications and digital solutions built by GeoWeb Solutions.",
};

export default function WorkPage() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
            Our work
          </p>

          <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-[-0.03em] text-geoweb-text sm:text-6xl">
            Digital solutions built around real needs.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-geoweb-text/65">
            Explore websites, digital products and solutions we&apos;ve designed and
            developed for businesses and organizations.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group"
            >
              <article>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-geoweb-indigo">
                  <div className="absolute inset-0 flex items-end p-8">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-geoweb-red">
                        {project.category}
                      </p>

                      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                        {project.title}
                      </h2>
                    </div>
                  </div>

                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-110" />

                  <div className="absolute -bottom-16 -right-8 h-40 w-40 rounded-full bg-geoweb-red transition-transform duration-500 group-hover:scale-110" />
                </div>

                <div className="mt-5">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-sm text-geoweb-text/50">
                        {project.client}
                      </p>

                      <h2 className="mt-1 text-xl font-semibold text-geoweb-text">
                        {project.title}
                      </h2>
                    </div>

                    <span className="text-xl text-geoweb-red transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-geoweb-text/60">
                    {project.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}