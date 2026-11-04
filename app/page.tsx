import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Ticker from "@/components/market-ticker";
import { Stats, About, Fund, Tools, Platform, Education, VisionMission, Roadmap, WhyValues } from "@/components/sections";
import { FinalCTA, Footer } from "@/components/more";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Stats />
        <About />
        <Fund />
        <Tools />
        <Platform />
        <Education />
        <VisionMission />
        <Roadmap />
        <WhyValues />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
