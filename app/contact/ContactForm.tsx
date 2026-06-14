"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  if (status === "success") {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-12">
        <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-ink mb-2">Message Sent</h3>
        <p className="text-ink-soft font-light">
          Thank you for reaching out. One of our concierges will get back to you shortly.
        </p>
        <button 
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-bold uppercase tracking-[0.14em] text-clay hover:text-gold transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Name</label>
        <input required type="text" className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink placeholder:text-ink/30 focus:border-clay focus:outline-none transition-colors" placeholder="Jane Doe" />
      </div>
      <div>
        <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Email Address</label>
        <input required type="email" className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink placeholder:text-ink/30 focus:border-clay focus:outline-none transition-colors" placeholder="jane@example.com" />
      </div>
      <div>
        <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Subject</label>
        <select className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink focus:border-clay focus:outline-none transition-colors">
          <option>General Inquiry</option>
          <option>Hosting with Us</option>
          <option>Concierge Services</option>
          <option>Press & Media</option>
        </select>
      </div>
      <div>
        <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Message</label>
        <textarea required rows={4} className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink placeholder:text-ink/30 focus:border-clay focus:outline-none transition-colors resize-none" placeholder="How can we help you?"></textarea>
      </div>
      <button 
        type="submit" 
        disabled={status === "submitting"}
        className="w-full rounded-full bg-ink px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
