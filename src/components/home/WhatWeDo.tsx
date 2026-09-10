import Container from "@/components/ui/Container";
import { services } from "@/data/services";

export default function WhatWeDo() {
  return (
    <section className="bg-geoweb-gray py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              What we do
            </p>

            <h2 className="mt-5 max-w-md text-4xl font-semibold leading-tight tracking-[-0.02em] text-geoweb-text sm:text-5xl">
              Digital solutions built around your business.
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-geoweb-text/65">
              From establishing your presence online to building the systems
              behind your operations, we create digital solutions around what
              your business actually needs.
            </p>
          </div>

          <div className="divide-y divide-geoweb-indigo/10 border-y border-geoweb-indigo/10">
            {services.map((service) => (
              <article
                key={service.number}
                className="grid gap-6 py-8 sm:grid-cols-[80px_1fr] sm:py-10"
              >
                <span className="text-sm font-semibold text-geoweb-red">
                  {service.number}
                </span>

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-geoweb-text sm:text-3xl">
                    {service.title}
                  </h3>

                  <p className="mt-4 max-w-xl text-base leading-7 text-geoweb-text/65">
                    {service.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-geoweb-text/55 before:mr-2 before:text-geoweb-red before:content-['•']"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}