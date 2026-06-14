"use client";

import { useEffect, useState } from "react";

export default function AdminCareers() {
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("applications");
  
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Job Form State
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [newJob, setNewJob] = useState({ title: "", location: "", type: "Full-time", department: "", description: "" });

  // View Application Modal State
  const [selectedApp, setSelectedApp] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/careers").then(res => res.json()),
      fetch("/api/admin/applications").then(res => res.json())
    ]).then(([jobsData, appsData]) => {
      setJobs(jobsData);
      setApplications(appsData);
      setLoading(false);
    });
  }, []);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/careers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob)
    });
    const created = await res.json();
    setJobs([created, ...jobs]);
    setShowNewJobModal(false);
    setNewJob({ title: "", location: "", type: "Full-time", department: "", description: "" });
  };

  const toggleJobStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "CLOSED" : "ACTIVE";
    await fetch("/api/admin/careers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus })
    });
    setJobs(currentJobs => currentJobs.map(j => j.id === id ? { ...j, status: newStatus } : j));
  };

  const toggleAppStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "UNREAD" ? "READ" : "UNREAD";
    await fetch("/api/admin/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus })
    });
    setApplications(apps => apps.map(a => a.id === id ? { ...a, status: newStatus } : a));
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
  };

  if (loading) return <div className="animate-pulse">Loading careers data...</div>;

  return (
    <div className="pb-24 max-w-6xl">
      <div className="flex items-end justify-between mb-12">
        <h1 className="font-serif text-[clamp(2rem,3.6vw,3.1rem)] font-normal leading-[1.05] tracking-[-0.015em]">
          Careers <em className="text-clay">Management</em>
        </h1>
        <button 
          onClick={() => setShowNewJobModal(true)}
          className="rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5 shadow-xl"
        >
          + Post New Job
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTab("applications")}
          className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === "applications" ? "bg-ink text-cream" : "bg-cream-2 text-ink-soft hover:text-ink"}`}
        >
          Applications ({applications.length})
        </button>
        <button 
          onClick={() => setActiveTab("jobs")}
          className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === "jobs" ? "bg-ink text-cream" : "bg-cream-2 text-ink-soft hover:text-ink"}`}
        >
          Active Listings ({jobs.length})
        </button>
      </div>

      {activeTab === "applications" ? (
        <div className="bg-white/80 backdrop-blur rounded-3xl shadow-glass border hairline overflow-hidden">
          <table className="w-full text-left">
            <thead className="border-b hairline bg-cream/30">
              <tr>
                <th className="p-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss">Status</th>
                <th className="p-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss">Candidate</th>
                <th className="p-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss">Applied For</th>
                <th className="p-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss">Date</th>
                <th className="p-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y hairline">
              {applications.map(app => (
                <tr key={app.id} className={`transition-colors hover:bg-cream-2/50 ${app.status === "UNREAD" ? "bg-clay/5" : ""}`}>
                  <td className="p-4">
                    <button 
                      onClick={() => toggleAppStatus(app.id, app.status)}
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md transition-colors ${
                        app.status === "UNREAD" ? "bg-clay text-cream" : "bg-ink/5 text-ink-soft hover:bg-ink/10"
                      }`}
                    >
                      {app.status}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-sm text-ink">{app.name}</div>
                    <div className="text-xs text-ink-soft mt-0.5">{app.email}</div>
                  </td>
                  <td className="p-4 text-ink-soft text-sm font-medium">{app.jobTitle}</td>
                  <td className="p-4 text-ink-soft text-sm">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => setSelectedApp(app)}
                      className="text-xs font-semibold uppercase tracking-wider text-clay hover:text-clay-dark"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-ink-soft text-sm">No applications received yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur rounded-3xl shadow-glass border hairline overflow-hidden">
          <table className="w-full text-left">
            <thead className="border-b hairline bg-cream/30">
              <tr>
                <th className="p-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss">Role</th>
                <th className="p-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss">Location</th>
                <th className="p-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss">Type</th>
                <th className="p-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss">Status</th>
                <th className="p-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y hairline">
              {jobs.map(job => (
                <tr key={job.id} className={`transition-colors hover:bg-cream-2/50 ${job.status !== "ACTIVE" ? "opacity-60" : ""}`}>
                  <td className="p-4">
                    <div className="font-medium text-sm text-ink">{job.title}</div>
                    <div className="text-xs text-ink-soft mt-0.5">{job.department}</div>
                  </td>
                  <td className="p-4 text-ink-soft text-sm">{job.location}</td>
                  <td className="p-4 text-ink-soft text-sm">{job.type}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${job.status === "ACTIVE" ? "bg-moss/10 text-moss" : "bg-ink/10 text-ink-soft"}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => toggleJobStatus(job.id, job.status)}
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md transition-colors border hairline ${job.status === "ACTIVE" ? "bg-cream text-clay hover:bg-clay/5 border-clay/20" : "bg-white text-moss hover:bg-moss/5 border-moss/20"}`}
                    >
                      {job.status === "ACTIVE" ? "Close Job" : "Re-open Job"}
                    </button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-ink-soft text-sm">No active job listings.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* View Application Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setSelectedApp(null)} />
          <div className="relative w-full max-w-2xl bg-cream rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 border-b hairline flex justify-between items-center bg-white">
              <div>
                <h3 className="font-serif text-2xl text-ink">Application for <em className="text-clay">{selectedApp.jobTitle}</em></h3>
                <p className="text-xs text-ink-soft font-medium uppercase tracking-widest mt-1">From: {selectedApp.name}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="h-8 w-8 rounded-full border hairline flex items-center justify-center hover:bg-cream-2">✕</button>
            </div>
            <div className="p-8 overflow-y-auto">
              <div className="grid grid-cols-2 gap-6 mb-8 border-b hairline pb-8">
                <div>
                  <div className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-1">Email</div>
                  <a href={`mailto:${selectedApp.email}`} className="text-sm font-medium hover:text-clay transition-colors">{selectedApp.email}</a>
                </div>
                <div>
                  <div className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-1">Portfolio / LinkedIn</div>
                  <a href={selectedApp.portfolio} target="_blank" rel="noreferrer" className="text-sm font-medium hover:text-clay transition-colors">{selectedApp.portfolio}</a>
                </div>
                <div>
                  <div className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-1">Date Applied</div>
                  <div className="text-sm">{new Date(selectedApp.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
              <div>
                <div className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-3">Cover Letter</div>
                <div className="text-sm leading-relaxed text-ink-soft whitespace-pre-wrap bg-white p-6 rounded-2xl border hairline">
                  {selectedApp.message}
                </div>
              </div>
            </div>
            <div className="p-6 border-t hairline bg-white flex justify-end gap-3">
              <button 
                onClick={() => toggleAppStatus(selectedApp.id, selectedApp.status)}
                className="rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors bg-cream-2 hover:bg-cream-3 text-ink"
              >
                Mark as {selectedApp.status === "UNREAD" ? "Read" : "Unread"}
              </button>
              <a 
                href={`mailto:${selectedApp.email}`}
                className="rounded-full bg-ink px-6 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5 shadow-xl"
              >
                Reply to Candidate
              </a>
            </div>
          </div>
        </div>
      )}

      {/* New Job Modal */}
      {showNewJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setShowNewJobModal(false)} />
          <form onSubmit={handleCreateJob} className="relative w-full max-w-xl bg-cream rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 border-b hairline flex justify-between items-center bg-white">
              <h3 className="font-serif text-2xl text-ink">Post New Job</h3>
              <button type="button" onClick={() => setShowNewJobModal(false)} className="h-8 w-8 rounded-full border hairline flex items-center justify-center hover:bg-cream-2">✕</button>
            </div>
            <div className="p-8 overflow-y-auto space-y-6">
              <div>
                <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Job Title</label>
                <input required type="text" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} className="w-full border-b hairline border-ink/20 bg-transparent py-2 text-ink focus:border-clay focus:outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Location</label>
                  <input required type="text" placeholder="e.g. Remote" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} className="w-full border-b hairline border-ink/20 bg-transparent py-2 text-ink focus:border-clay focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Department</label>
                  <input required type="text" placeholder="e.g. Support" value={newJob.department} onChange={e => setNewJob({...newJob, department: e.target.value})} className="w-full border-b hairline border-ink/20 bg-transparent py-2 text-ink focus:border-clay focus:outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Description</label>
                <textarea required rows={4} value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} className="w-full border-b hairline border-ink/20 bg-transparent py-2 text-ink focus:border-clay focus:outline-none transition-colors resize-none" />
              </div>
            </div>
            <div className="p-6 border-t hairline bg-white flex justify-end gap-3">
              <button type="button" onClick={() => setShowNewJobModal(false)} className="rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors bg-cream-2 hover:bg-cream-3 text-ink">Cancel</button>
              <button type="submit" className="rounded-full bg-ink px-8 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5 shadow-xl">Post Job</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
