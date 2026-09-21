/**
 * Home page of the TechToJob landing.
 * Composes the PRD-defined sections in order: header, the eleven content
 * blocks inside `<main>` and the footer. Visual design is added later.
 */
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Closing,
  Community,
  Companies,
  Hero,
  HowItWorks,
  News,
  Newsletter,
  Talent,
  Testimonials,
  Tournaments,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Talent />
        <Companies />
        <Tournaments />
        <Community />
        <Testimonials />
        <News />
        <Newsletter />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
