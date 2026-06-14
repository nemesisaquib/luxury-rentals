"use client";

import Reveal from "@/components/Reveal";
import { useState } from "react";
import { z } from "zod";

const hostSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  propertyUrl: z.string().url("Please enter a valid URL (e.g. https://...)").optional().or(z.literal("")),
  location: z.string().min(2, "Location is required"),
});

type FormErrors = Partial<Record<keyof z.infer<typeof hostSchema>, string>>;

export default function HostPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    propertyUrl: "",
    location: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = hostSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof FormErrors;
        if (path && !fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    alert("Application submitted! Our curation team will review it shortly.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <>
      <section className="px-5 pt-32 pb-16 md:px-12 bg-ink text-cream">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.05] tracking-[-0.015em]">
              Own a place worth <em className="text-gold">remembering?</em>
            </h1>
            <p className="mx-auto mt-6 max-w-[60ch] font-light opacity-80 text-lg">
              Hosts on Hearth & Key earn 18% more on average than on big platforms — and keep full control of their calendar.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-24 md:px-12">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-start">
          <Reveal>
            <h2 className="font-serif text-3xl font-medium mb-8 text-ink">Why host with us?</h2>
            <div className="space-y-8">
              <div className="border-l-2 border-clay pl-6">
                <h3 className="font-bold uppercase tracking-[0.1em] text-xs text-moss mb-2">0% Host Fees</h3>
                <p className="font-light text-sm text-ink-soft leading-relaxed">
                  We don't charge you to list your property. Our transparent pricing means you keep 100% of your nightly rate.
                </p>
              </div>
              <div className="border-l-2 border-clay pl-6">
                <h3 className="font-bold uppercase tracking-[0.1em] text-xs text-moss mb-2">Vetted Guests</h3>
                <p className="font-light text-sm text-ink-soft leading-relaxed">
                  Our community of travelers respects design, architecture, and local culture. You're hosting people who appreciate your space.
                </p>
              </div>
              <div className="border-l-2 border-clay pl-6">
                <h3 className="font-bold uppercase tracking-[0.1em] text-xs text-moss mb-2">Curated Exclusivity</h3>
                <p className="font-light text-sm text-ink-soft leading-relaxed">
                  We only accept 2% of applicants. Being listed on Hearth & Key is a mark of exceptional quality and taste.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <form onSubmit={handleSubmit} noValidate className="rounded-3xl border hairline bg-white p-8 md:p-10 shadow-[0_24px_50px_-30px_rgba(29,42,35,0.4)] space-y-5 relative -mt-32">
              <div className="mb-8 text-center border-b hairline pb-8">
                <h3 className="font-serif text-2xl font-medium">Apply for a key</h3>
                <p className="text-sm font-light text-ink-soft mt-2">Submit your property for curation.</p>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-moss">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className={`w-full rounded-xl border hairline bg-cream-2/40 px-4 py-3 text-sm outline-none focus:border-clay placeholder:text-ink-soft/50 ${errors.name ? 'border-clay-dark' : ''}`}
                />
                {errors.name && <p className="mt-1 px-1 text-xs text-clay-dark">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-moss">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full rounded-xl border hairline bg-cream-2/40 px-4 py-3 text-sm outline-none focus:border-clay placeholder:text-ink-soft/50 ${errors.email ? 'border-clay-dark' : ''}`}
                />
                {errors.email && <p className="mt-1 px-1 text-xs text-clay-dark">{errors.email}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-moss">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Cornwall, UK"
                  className={`w-full rounded-xl border hairline bg-cream-2/40 px-4 py-3 text-sm outline-none focus:border-clay placeholder:text-ink-soft/50 ${errors.location ? 'border-clay-dark' : ''}`}
                />
                {errors.location && <p className="mt-1 px-1 text-xs text-clay-dark">{errors.location}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-moss">Property Link (Optional)</label>
                <input
                  type="url"
                  name="propertyUrl"
                  value={formData.propertyUrl}
                  onChange={handleChange}
                  placeholder="Link to photos or existing listing"
                  className={`w-full rounded-xl border hairline bg-cream-2/40 px-4 py-3 text-sm outline-none focus:border-clay placeholder:text-ink-soft/50 ${errors.propertyUrl ? 'border-clay-dark' : ''}`}
                />
                {errors.propertyUrl && <p className="mt-1 px-1 text-xs text-clay-dark">{errors.propertyUrl}</p>}
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-clay py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-clay-dark"
              >
                Submit Application
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
