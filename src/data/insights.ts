export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
  content: string[];
}

export const insights: Insight[] = [
  {
    slug: "why-businesses-need-more-than-a-website",
    title: "Why businesses need more than a website",
    excerpt:
      "A website can establish your digital presence, but the right digital solution goes further by helping the business operate, communicate and grow.",
    category: "Digital Strategy",
    date: "September 2026",
    readTime: "5 min read",
    featured: true,
    content: [
      "A website is often the first step when a business decides to improve its digital presence. It gives customers somewhere to find information, understand the brand and get in touch.",
      "But not every business problem is a website problem.",
      "A business might need a better way to manage customers, organize operational data, process requests, communicate with clients or automate repetitive work. In those situations, simply building another website doesn't solve the underlying problem.",
      "The better approach is to start with the business itself. Understand what the organization is trying to achieve, identify where the current process is failing and then determine whether technology can make that process better.",
      "Sometimes the answer is a website. Sometimes it is a dashboard, customer portal, internal system, API or a combination of several digital products.",
      "That is the approach we take at GeoWeb: start with the problem, define the requirements and build the solution around what the business actually needs.",
    ],
  },
  {
    slug: "what-makes-a-good-business-website",
    title: "What makes a good business website?",
    excerpt:
      "A professional website is more than attractive visuals. It needs to communicate clearly, perform well and help visitors take the next step.",
    category: "Web Development",
    date: "September 2026",
    readTime: "4 min read",
    content: [
      "A good business website should answer a few basic questions quickly: Who is this business? What does it offer? Why should someone trust it? And what should the visitor do next?",
      "Design plays an important role, but design alone isn't enough.",
      "The website needs clear information architecture, readable content, responsive layouts and useful calls to action. It should also perform well across different devices and connection speeds.",
      "Technical decisions matter too. The application should be maintainable, accessible and structured in a way that allows the business to evolve the website over time.",
      "The best business websites bring these pieces together. They look professional, communicate clearly and serve a measurable business purpose.",
    ],
  },
  {
    slug: "from-business-problem-to-digital-product",
    title: "From business problem to digital product",
    excerpt:
      "Building useful software starts before development. The process begins by understanding the problem, the users and the outcome.",
    category: "Engineering",
    date: "September 2026",
    readTime: "6 min read",
    content: [
      "Software development can easily become focused on technology before the actual problem has been understood.",
      "A better process starts with discovery. What is happening today? Who is affected? What makes the current process inefficient? What outcome does the business actually want?",
      "From there, the problem can be translated into requirements. Those requirements become the foundation for user experience decisions, technical architecture and development priorities.",
      "Testing is part of the process too. A product isn't successful simply because the application runs. It needs to solve the intended problem reliably and provide a useful experience for its users.",
      "The final step is learning from real usage. Once a product is live, feedback and data can reveal opportunities that weren't visible during the initial development process.",
      "That creates a cycle: understand, define, design, build, test, launch and improve.",
    ],
  },
];