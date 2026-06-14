"use client";

import { useState } from "react";

export default function ApplyForm({ jobs }: { jobs: any[] }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    jobId: "",
    name: "",
    email: "",
    portfolio: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.jobId) return alert("Please select a role.");
    
    setStatus("submitting");
    const jobTitle = jobs.find(j => j.id === formData.jobId)?.title;

    await fetch("/api/careers/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, jobTitle })
    });

    setStatus("success");
    setFormData({ jobId: "", name: "", email: "", portfolio: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  if (status === "success") {
    return (
      <div className="bg-moss/10 border hairline border-moss/20 rounded-2xl p-8 text-center text-moss">
        <h3 className="font-serif text-xl mb-2">Application Received</h3>
        <p className="text-sm opacity-80">Thank you for your interest! We'll review your application and get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Select Role *</label>
        <select 
          required 
          value={formData.jobId} 
          onChange={e => setFormData({...formData, jobId: e.target.value})}
          className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink focus:border-clay focus:outline-none transition-colors appearance-none"
        >
          <option value="" disabled>Choose a position...</option>
          {jobs.map(job => (
            <option key={job.id} value={job.id}>{job.title} ({job.location})</option>
          ))}
          <option value="general">General Application</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Full Name *</label>
          <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink focus:border-clay focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Email Address *</label>
          <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink focus:border-clay focus:outline-none transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Portfolio / LinkedIn URL</label>
        <input type="url" value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})} className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink focus:border-clay focus:outline-none transition-colors" />
      </div>
      <div>
        <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Cover Letter *</label>
        <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Tell us why you're a great fit..." className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink focus:border-clay focus:outline-none transition-colors resize-none" />
      </div>
      <button 
        type="submit" 
        disabled={status === "submitting"}
        className="w-full rounded-full bg-ink px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 shadow-xl"
      >
        {status === "submitting" ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
