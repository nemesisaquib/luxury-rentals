import { MOCK_JOBS } from "@/lib/mock-data";
import ApplyForm from "./ApplyForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Hearth & Key",
  description: "Join our team of scouts, concierges, and travel enthusiasts.",
};

export default function CareersPage() {
  const activeJobs = MOCK_JOBS.filter(job => job.status === "ACTIVE");

  return (
    <main className="min-h-screen bg-cream px-5 pb-24 pt-32 md:px-12 md:pt-40">
      <div className="mx-auto max-w-5xl">
        <div className="mb-24 md:w-2/3">
          <h1 className="mb-6 font-serif text-[clamp(3rem,6vw,5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink">
            Join the <em className="text-clay">Team</em>
          </h1>
          <p className="text-xl font-light leading-relaxed text-ink-soft">
            We're a small, passionate team dedicated to making travel feel personal again. We're always looking for scouts, concierges, and engineers who share our obsessive attention to detail.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-16">
          <div className="md:col-span-2">
            <h2 className="font-serif text-2xl text-ink mb-8">Open Positions</h2>
            <div className="space-y-6">
              {activeJobs.map(job => (
                <div key={job.id} className="border-b hairline pb-6 group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl text-ink group-hover:text-clay transition-colors">{job.title}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-ink/5 rounded text-ink-soft">{job.department}</span>
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-3">
                    {job.location} · {job.type}
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed mb-4">
                    {job.description}
                  </p>
                </div>
              ))}
              {activeJobs.length === 0 && (
                <p className="text-ink-soft italic">No open positions at the moment. Feel free to submit a general application!</p>
              )}
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="bg-white/80 backdrop-blur rounded-3xl shadow-glass border hairline p-8 md:p-10 sticky top-32">
              <h2 className="font-serif text-2xl text-ink mb-2">Submit an Application</h2>
              <p className="text-sm text-ink-soft mb-8">Select a role and tell us why you'd be a great fit for Hearth & Key.</p>
              <ApplyForm jobs={activeJobs} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
