export interface Service {
  number: string;
  title: string;
  description: string;
  items: string[];
}

export const services: Service[] = [
  {
    number: "01",
    title: "Digital Experiences",
    description:
      "We create professional digital experiences that give businesses a clear, credible and effective presence online.",
    items: [
      "Business websites",
      "Landing pages",
      "UI/UX design",
      "E-commerce",
      "Website redesigns",
    ],
  },
  {
    number: "02",
    title: "Digital Products",
    description:
      "We build custom digital products that help businesses manage operations, serve customers and solve real problems.",
    items: [
      "Web applications",
      "Dashboards",
      "Client portals",
      "Business systems",
      "APIs & databases",
    ],
  },
  {
    number: "03",
    title: "Digital Growth",
    description:
      "We help businesses improve the performance, visibility and effectiveness of the digital products they already have.",
    items: [
      "SEO",
      "Analytics",
      "Performance optimization",
      "Conversion optimization",
      "Maintenance & support",
    ],
  },
];