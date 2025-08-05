"use client";
import { Card, CardContent } from "@/components/ui/Card";

export default function InfoBanner() {
  return (
    <section className="relative my-0 bg-white">
      <Card className="relative bg-gradient-to-r from-blue-600 to-blue-500 overflow-visible shadow-2xl border--2">
        <CardContent className="py-12 px-6 md:py-3 md:px-12 flex justify-center items-center">
          <p className="max-w-4xl mx-auto text-center text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wide leading-relaxed drop-shadow-lg">
            Our company is oriented to bring results to our customers and partners and the best way to do this is analyzing data and applying advanced Artificial Intelligence (AI) and Machine Learning (ML) tools to manage your projects.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
