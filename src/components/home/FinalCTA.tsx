import Link from "next/link";
import Container from "@/components/ui/Container";

export default function FinalCTA() {
  return (
    <section className="bg-geoweb-gray py-24 sm:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-geoweb-indigo px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              Let&apos;s build
            </p>

            <h2 className="font-display mt-5 text-4xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              Have a problem that needs a digital solution?
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
              Tell us what you&apos;re trying to achieve. We&apos;ll help you figure out
              what to build and how to build it.
            </p>

            <Link
              href="/contact"
              className="mt-10 inline-flex items-center rounded-full bg-geoweb-red px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-geoweb-indigo"
            >
              Let&apos;s build it →
            </Link>
          </div>

          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/5"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-24 right-16 h-56 w-56 rounded-full bg-geoweb-red/80"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-10 right-40 h-24 w-24 rounded-full bg-white/10"
          />
        </div>
      </Container>
    </section>
  );
}