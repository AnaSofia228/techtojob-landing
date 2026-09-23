/**
 * Home page of the TechToJob landing.
 * Composes the PRD-defined sections in order for the active locale.
 */
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Closing,
  Community,
  Hero,
  HowItWorks,
  News,
  Newsletter,
  TalentCompanies,
  Testimonials,
  Tournaments,
} from "@/components/sections";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <TalentCompanies />
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
