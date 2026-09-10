import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Home() {
  return (
    <main>
      <section className="min-h-screen bg-white">
        <Container className="flex min-h-screen items-center py-20">
          <div className="max-w-3xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              GeoWeb Solutions
            </p>

            <h1 className="text-5xl font-semibold tracking-tight text-geoweb-text sm:text-6xl lg:text-7xl">
              Build a stronger digital presence.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-geoweb-text/70">
              We design and develop websites, web applications and digital
              solutions that help businesses operate, connect and grow online.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact">Start a project</Button>

              <Button href="/work" variant="secondary">
                View our work
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}