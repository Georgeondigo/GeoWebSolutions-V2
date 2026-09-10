import Container from "@/components/ui/Container";
import { technologyGroups } from "@/data/technology";

export default function Technology() {
  return (
    <section className="bg-geoweb-indigo py-24 text-white sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              Technology
            </p>

            <h2 className="font-display mt-5 max-w-md text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl">
              Modern technology. Practical engineering.
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-white/65">
              We choose technologies based on the problem we&apos;ve solving—not
              simply because they&apos;re popular.
            </p>
          </div>

          <div className="border-t border-white/10">
            {technologyGroups.map((group) => (
              <article
                key={group.title}
                className="grid gap-6 border-b border-white/10 py-8 sm:grid-cols-[180px_1fr] sm:py-10"
              >
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {group.title}
                </h3>

                <div>
                  <p className="max-w-xl leading-7 text-white/60">
                    {group.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/75"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}