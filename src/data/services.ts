export interface Service {
  number: string;
  title: string;
  description: string;
  intro: string;
  items: string[];
  idealFor: string[];
}

export const services: Service[] = [
  {
    number: "01",
    title: "Digital Experiences",
    description:
      "Professional digital experiences that help businesses establish credibility, communicate clearly and connect with customers online.",
    intro:
      "Your website is often the first interaction someone has with your business. We design and develop digital experiences that make that interaction clear, credible and useful.",
    items: [
      "Business websites",
      "Landing pages",
      "UI/UX design",
      "E-commerce websites",
      "Website redesigns",
      "Responsive web design",
    ],
    idealFor: [
      "Professional service businesses",
      "Startups and growing businesses",
      "Personal brands",
      "Organizations and institutions",
    ],
  },
  {
    number: "02",
    title: "Digital Products",
    description:
      "Custom web applications and business systems that help organizations manage operations, serve customers and solve complex problems.",
    intro:
      "When a website isn't enough, we build the systems behind the business. From dashboards and portals to custom business applications, we develop around your actual workflows and requirements.",
    items: [
      "Web applications",
      "Business management systems",
      "Admin dashboards",
      "Client portals",
      "APIs",
      "Database systems",
    ],
    idealFor: [
      "Businesses with manual processes",
      "Organizations managing operational data",
      "Startups building digital products",
      "Businesses that need custom internal systems",
    ],
  },
  {
    number: "03",
    title: "Digital Growth",
    description:
      "Ongoing improvements that help businesses increase visibility, performance, conversions and the effectiveness of their digital presence.",
    intro:
      "Launching a digital product is only the beginning. We help businesses understand what's working, identify opportunities and continuously improve their digital presence.",
    items: [
      "Search engine optimization",
      "Analytics",
      "Performance optimization",
      "Conversion optimization",
      "Content strategy",
      "Maintenance and support",
    ],
    idealFor: [
      "Existing websites",
      "Growing businesses",
      "Businesses looking to improve conversions",
      "Organizations that need ongoing technical support",
    ],
  },
];