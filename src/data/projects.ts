export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;

  technologies: string[];

  featured: boolean;

  liveUrl?: string;
  githubUrl?: string;
  image?: string;

  caseStudy?: {
    problem?: string;
    requirements?: string[];
    solution?: string;
    architecture?: string;
    development?: string;
    testing?: string;
    deployment?: string;
    results?: string[];
    lessonsLearned?: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "evolve-payroll-platform",
    title: "Evolve Payroll Platform",
    client: "Evolve",
    category: "Digital Product",
    description:
      "A payroll-focused digital platform designed to support business operations and payroll workflows.",
    technologies: ["Web Application", "Dashboard"],
    featured: true,

    caseStudy: {
      problem:
        "A digital payroll solution was needed to support business payroll workflows.",
      solution:
        "A web-based payroll platform designed around the operational needs of the business.",
    },
  },

  {
    slug: "soodingo-advocates",
    title: "Soodingo Advocates",
    client: "Soodingo Advocates",
    category: "Digital Experience",
    description:
      "A professional digital presence designed to communicate legal services clearly and build credibility online.",
    technologies: ["Website", "Responsive Design"],
    featured: true,

    caseStudy: {
      problem:
        "The business needed a professional online presence that clearly communicated its legal services.",
      solution:
        "A responsive business website focused on clarity, credibility and accessibility.",
    },
  },

  {
    slug: "watamala-law-advocates",
    title: "Watamala Law Advocates",
    client: "Watamala Law Advocates",
    category: "Digital Experience",
    description:
      "A professional website focused on presenting legal services and making information easier for prospective clients to access.",
    technologies: ["Website", "Responsive Design"],
    featured: true,

    caseStudy: {
      problem:
        "The firm needed a professional website to present its services and information online.",
      solution:
        "A responsive website structured around the firm's services and prospective clients.",
    },
  },
];