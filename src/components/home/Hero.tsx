import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <Container>
        <div className="relative flex min-h-[calc(100vh-5rem)] items-center py-20 lg:py-28">
          <div className="relative z-10 max-w-4xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              GeoWeb Solutions
            </p>
            <h1 className="font-display max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-geoweb-text sm:text-6xl lg:text-7xl xl:text-8xl">
              Build a stronger digital presence.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-geoweb-text/70 sm:text-xl">
              We design and develop websites, web applications and digital
              solutions that help businesses operate, connect and grow online.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact">Start a project</Button>

              <Button href="/work" variant="secondary">
                View our work
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-4 text-sm text-geoweb-text/50">
              <span className="h-px w-10 bg-geoweb-red" />
              <span>Websites · Applications · Digital Growth</span>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-full bg-geoweb-indigo lg:block"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-24 top-1/2 hidden h-32 w-32 -translate-y-1/2 rounded-full bg-geoweb-red lg:block"
          />
        </div>
      </Container>
    </section>
  );
}
