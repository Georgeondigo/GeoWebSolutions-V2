import Container from "@/components/ui/Container";

const reasons = [
  {
    number: "01",
    title: "Business-first thinking",
    description:
      "We start with the problem, the people and the business objective—not the technology.",
  },
  {
    number: "02",
    title: "Solutions built for you",
    description:
      "We design and develop around your actual requirements instead of forcing your business into a generic template.",
  },
  {
    number: "03",
    title: "Modern technology",
    description:
      "We use modern tools and engineering practices to build digital products that are reliable, maintainable and ready to grow.",
  },
  {
    number: "04",
    title: "Built beyond launch",
    description:
      "A digital product shouldn't be abandoned after launch. We can help you improve, maintain and grow it over time.",
  },
];

export default function WhyGeoWeb() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
            Why GeoWeb
          </p>

          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.02em] text-geoweb-text sm:text-5xl lg:text-6xl">
            Technology is only useful when it solves the right problem.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-geoweb-text/65">
            We combine design, development and digital strategy to create
            solutions that make sense for the way your business actually
            operates.
          </p>
        </div>

        <div className="mt-16 grid border-t border-geoweb-indigo/10 sm:grid-cols-2">
          {reasons.map((reason) => (
            <article
              key={reason.number}
              className="border-b border-geoweb-indigo/10 py-10 sm:px-8 sm:first:pl-0 sm:nth-[2]:pr-0 sm:nth-[3]:pl-0"
            >
              <span className="text-sm font-semibold text-geoweb-red">
                {reason.number}
              </span>

              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-geoweb-text">
                {reason.title}
              </h3>

              <p className="mt-4 max-w-md text-base leading-7 text-geoweb-text/60">
                {reason.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}