export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We understand your business, users, goals and the problem you're trying to solve.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "We turn the problem into clear requirements, priorities, scope and measurable outcomes.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "We plan the user experience, interface and technical structure before development begins.",
  },
  {
    number: "04",
    title: "Develop",
    description:
      "We build the solution using modern technologies and an engineering process designed for maintainability.",
  },
  {
    number: "05",
    title: "Test",
    description:
      "We validate functionality, responsiveness, performance and reliability before launch.",
  },
  {
    number: "06",
    title: "Launch",
    description:
      "We deploy the solution, configure the necessary infrastructure and make sure everything is ready for use.",
  },
  {
    number: "07",
    title: "Grow",
    description:
      "We use feedback, analytics and ongoing improvements to help the digital solution evolve with the business.",
  },
];