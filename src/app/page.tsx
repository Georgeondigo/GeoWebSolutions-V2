import Hero from "@/components/home/Hero";
import WhatWeDo from "@/components/home/WhatWeDo";
import WhyGeoWeb from "@/components/home/WhyGeoWeb";
import SelectedWork from "@/components/home/SelectedWork";
import Process from "@/components/home/Process";
import Technology from "@/components/home/Technology";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <WhyGeoWeb />
      <SelectedWork />
      <Process />
      <Technology />
      <FinalCTA />
    </>
  );
}