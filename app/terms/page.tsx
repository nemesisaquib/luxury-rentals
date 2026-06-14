import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Hearth & Key",
  description: "Read the Terms of Service for using the Hearth & Key platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-cream px-5 pb-24 pt-32 md:px-12 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink">
          Terms of <em className="text-clay">Service</em>
        </h1>
        <div className="prose prose-ink max-w-none font-light leading-relaxed">
          <p className="mb-6 text-lg text-ink-soft">
            Last updated: June 14, 2026
          </p>

          <h2 className="mb-4 mt-12 font-serif text-2xl font-medium text-ink">1. Acceptance of Terms</h2>
          <p className="mb-6 text-ink-soft">
            By accessing or using Hearth & Key, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our curated platform.
          </p>

          <h2 className="mb-4 mt-10 font-serif text-2xl font-medium text-ink">2. Booking and Reservations</h2>
          <p className="mb-6 text-ink-soft">
            When you book a stay through our platform, you are entering into a direct contract with the property host. Hearth & Key acts solely as a facilitator to connect you with vetted luxury properties. All bookings are subject to the specific cancellation policies set by the individual host.
          </p>

          <h2 className="mb-4 mt-10 font-serif text-2xl font-medium text-ink">3. The Zero-Fee Guarantee</h2>
          <p className="mb-6 text-ink-soft">
            We are proud to offer a zero guest service fee model. The price you see on the property listing is the final price. Hosts on our platform pay a flat commission, ensuring absolute pricing transparency for our guests.
          </p>

          <h2 className="mb-4 mt-10 font-serif text-2xl font-medium text-ink">4. User Conduct</h2>
          <p className="mb-6 text-ink-soft">
            Guests are expected to treat all properties with the utmost respect. Any damages incurred during a stay will be the direct financial responsibility of the guest. Hosts reserve the right to refuse service to anyone who violates their house rules.
          </p>

          <div className="mt-16 border-t hairline pt-8">
            <p className="text-sm text-ink-soft">
              For more information on how we handle your data, please read our{" "}
              <Link href="/privacy" className="font-medium text-clay hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
