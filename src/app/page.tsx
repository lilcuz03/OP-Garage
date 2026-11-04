import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />

      {/* Placeholder: replaced by the real "How it works" section next */}
      <section
        id="process"
        className="flex min-h-[40vh] items-center justify-center px-4 text-muted"
      >
        How it works section coming next
      </section>
    </main>
  );
}
