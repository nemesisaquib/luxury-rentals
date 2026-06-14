import { SITE } from "@/lib/utils";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cream px-5 pb-24 pt-32 md:px-12 md:pt-40">
      <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-16">
        <div>
          <h1 className="mb-6 font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink">
            Get in <em className="text-clay">Touch</em>
          </h1>
          <p className="text-ink-soft mb-12 text-lg font-light leading-relaxed">
            Whether you're looking to host an extraordinary home, require dedicated concierge services for an upcoming stay, or have a press inquiry, our team is at your service.
          </p>
          
          <div className="space-y-8">
            {SITE.email && (
              <div>
                <h3 className="font-serif text-lg font-medium text-ink mb-1">General Inquiries</h3>
                <p className="text-ink-soft font-light">{SITE.email}</p>
              </div>
            )}
            {SITE.phone && (
              <div>
                <h3 className="font-serif text-lg font-medium text-ink mb-1">Phone</h3>
                <p className="text-ink-soft font-light">{SITE.phone}</p>
              </div>
            )}
            {SITE.address && (
              <div>
                <h3 className="font-serif text-lg font-medium text-ink mb-1">Headquarters</h3>
                <p className="text-ink-soft font-light whitespace-pre-wrap">{SITE.address}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-soft border hairline">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
