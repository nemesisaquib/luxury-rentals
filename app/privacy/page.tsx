import type { Metadata } from "next";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy | Hearth & Key",
  description: "Learn how Hearth & Key protects your privacy and handles your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream px-5 pb-24 pt-32 md:px-12 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink">
          Privacy <em className="text-clay">Policy</em>
        </h1>
        <div className="prose prose-ink max-w-none font-light leading-relaxed">
          <p className="mb-6 text-lg text-ink-soft">
            Last updated: June 14, 2026
          </p>

          <h2 className="mb-4 mt-12 font-serif text-2xl font-medium text-ink">1. Information We Collect</h2>
          <p className="mb-6 text-ink-soft">
            At Hearth & Key, we believe in radical transparency. When you book a stay or sign up to host, we collect only the essential information needed to secure your reservation and ensure a seamless experience. This includes your name, email address, payment details, and travel preferences.
          </p>

          <h2 className="mb-4 mt-10 font-serif text-2xl font-medium text-ink">2. How We Use Your Data</h2>
          <p className="mb-6 text-ink-soft">
            Your data is used exclusively to facilitate your stays, communicate important updates, and personalize your experience on our platform. We do not sell your personal information to third-party advertisers. Ever.
          </p>

          <h2 className="mb-4 mt-10 font-serif text-2xl font-medium text-ink">3. Data Security</h2>
          <p className="mb-6 text-ink-soft">
            We employ industry-standard encryption protocols to protect your payment and personal details. Our servers are regularly audited to ensure compliance with the highest security standards. 
          </p>

          <h2 className="mb-4 mt-10 font-serif text-2xl font-medium text-ink">4. Your Rights</h2>
          <p className="mb-6 text-ink-soft">
            You have the right to access, modify, or permanently delete your personal data from our systems at any time. Simply navigate to your account settings or contact our concierge team for assistance.
          </p>

          <div className="mt-16 rounded-2xl border hairline bg-cream-2 p-8">
            <h3 className="mb-2 font-serif text-xl font-medium text-ink">Questions about your privacy?</h3>
            <p className="text-ink-soft">
              Reach out to our dedicated privacy team at <a href={`mailto:${SITE.email}`} className="font-medium text-clay hover:underline">{SITE.email}</a>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
