import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { projects } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="bg-white">
      <section className="bg-geoweb-indigo py-24 text-white sm:py-32">
        <Container>
          <Link
            href="/work"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            ← Back to work
          </Link>

          <div className="mt-16 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              {project.category}
            </p>

            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              {project.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
                Project overview
              </p>

              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="text-sm text-geoweb-text/50">Client</dt>
                  <dd className="mt-1 font-medium text-geoweb-text">
                    {project.client}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm text-geoweb-text/50">Category</dt>
                  <dd className="mt-1 font-medium text-geoweb-text">
                    {project.category}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm text-geoweb-text/50">
                    Technologies
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-geoweb-indigo/10 px-3 py-1 text-xs text-geoweb-text/60"
                      >
                        {technology}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-geoweb-text sm:text-4xl">
  The project
</h2>

{project.caseStudy?.problem && (
  <div className="mt-8">
    <h3 className="text-lg font-semibold text-geoweb-text">
      The problem
    </h3>

    <p className="mt-3 leading-7 text-geoweb-text/65">
      {project.caseStudy.problem}
    </p>
  </div>
)}

{project.caseStudy?.solution && (
  <div className="mt-8">
    <h3 className="text-lg font-semibold text-geoweb-text">
      The solution
    </h3>

    <p className="mt-3 leading-7 text-geoweb-text/65">
      {project.caseStudy.solution}
    </p>
  </div>
)}

<div className="mt-10 rounded-2xl bg-geoweb-gray p-8">
  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-geoweb-red">
    Case study in progress
  </p>

  <p className="mt-4 leading-7 text-geoweb-text/65">
    Detailed project documentation will be added as the project is reviewed
    and verified.
  </p>
</div>

            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}