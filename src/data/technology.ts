export interface TechnologyGroup {
  title: string;
  description: string;
  technologies: string[];
}

export const technologyGroups: TechnologyGroup[] = [
  {
    title: "Frontend",
    description:
      "Modern interfaces built for usability, responsiveness and performance.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    description:
      "Reliable application logic, APIs and business systems built around your requirements.",
    technologies: ["Node.js", ".NET", "REST APIs"],
  },
  {
    title: "Data",
    description:
      "Structured data systems designed for reliability, scalability and real business needs.",
    technologies: ["PostgreSQL", "SQL", "MongoDB", "Cosmos DB"],
  },
  {
    title: "Cloud & Infrastructure",
    description:
      "Modern infrastructure and deployment platforms that keep digital products available and ready to grow.",
    technologies: ["AWS", "Azure", "Vercel", "Cloudflare"],
  },
  {
    title: "Engineering",
    description:
      "Development practices that make projects easier to maintain, test and improve over time.",
    technologies: ["Git", "GitHub", "Docker", "Linux", "GitHub Actions"],
  },
];