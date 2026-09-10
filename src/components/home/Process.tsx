import Container from "@/components/ui/Container";
import { processSteps } from "@/data/process";

export default function Process() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              Our process
            </p>

            <h2 className="mt-5 max-w-md text-4xl font-semibold leading-tight tracking-[-0.02em] text-geoweb-text sm:text-5xl">
              From business problem to digital solution.
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-geoweb-text/65">
              Every project starts with understanding the problem before we
              decide what to build.
            </p>
          </div>

          <div>
            <div className="border-t border-geoweb-indigo/10">
              {processSteps.map((step) => (
                <article
                  key={step.number}
                  className="grid gap-5 border-b border-geoweb-indigo/10 py-8 sm:grid-cols-[80px_1fr]"
                >
                  <span className="text-sm font-semibold text-geoweb-red">
                    {step.number}
                  </span>

                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-geoweb-text">
                      {step.title}
                    </h3>

                    <p className="mt-3 max-w-xl leading-7 text-geoweb-text/60">
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}