import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Problem from "@/components/home/Problem";
import Services from "@/components/home/Services";
import Audiences from "@/components/home/Audiences";
import Process from "@/components/home/Process";
import Membership from "@/components/home/Membership";
import Investing from "@/components/home/Investing";
import Stats from "@/components/home/Stats";
import Faq from "@/components/home/Faq";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Problem />
      <Services />
      <Audiences />
      <Process />
      <Membership />
      <Investing />
      <Stats />
      <Faq />
      <FinalCta />
    </>
  );
}
