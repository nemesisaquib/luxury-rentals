"use client";

import { useEffect, useState } from "react";

export default function AdminFaqs() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = () => {
    fetch("/api/admin/faqs")
      .then(res => res.json())
      .then(data => {
        setFaqs(data);
        setLoading(false);
      });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    await fetch(`/api/admin/faqs?id=${id}`, { method: "DELETE" });
    fetchFaqs();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const question = (form.elements.namedItem("question") as HTMLInputElement).value;
    const answer = (form.elements.namedItem("answer") as HTMLTextAreaElement).value;

    if (editing) {
      await fetch("/api/admin/faqs", {
        method: "PATCH",
        body: JSON.stringify({ id: editing.id, question, answer }),
      });
      setEditing(null);
    } else {
      await fetch("/api/admin/faqs", {
        method: "POST",
        body: JSON.stringify({ question, answer }),
      });
      setAdding(false);
    }
    fetchFaqs();
  };

  if (loading) return <div className="text-ink-soft animate-pulse">Loading FAQs...</div>;

  return (
    <div className="pb-24">
      <div className="flex items-end justify-between mb-12">
        <h1 className="font-serif text-[clamp(2rem,3.6vw,3.1rem)] font-normal leading-[1.05] tracking-[-0.015em]">
          Manage <em className="text-clay">FAQs</em>
        </h1>
        <button 
          onClick={() => setAdding(true)}
          className="rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5"
        >
          + Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map(faq => (
          <div key={faq.id} className="bg-white/80 backdrop-blur p-6 rounded-3xl shadow-glass border hairline hover:bg-white transition-colors relative group">
            <div className="absolute top-6 right-6 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => setEditing(faq)}
                className="text-[0.65rem] font-bold uppercase tracking-[0.14em] px-3 py-1.5 rounded-full border hairline bg-white text-ink hover:bg-cream-2 transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(faq.id)}
                className="text-[0.65rem] font-bold uppercase tracking-[0.14em] px-3 py-1.5 rounded-full border hairline bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
            <h3 className="font-serif text-xl text-ink mb-2 pr-24">{faq.question}</h3>
            <p className="text-ink-soft font-light leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>

      {(adding || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm" onClick={() => { setAdding(false); setEditing(null); }}>
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => { setAdding(false); setEditing(null); }} className="absolute top-6 right-6 text-ink-soft hover:text-ink">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="font-serif text-2xl text-ink mb-6">{editing ? "Edit FAQ" : "Add New FAQ"}</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Question</label>
                <input required name="question" defaultValue={editing?.question} type="text" className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink focus:border-clay focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Answer</label>
                <textarea required name="answer" defaultValue={editing?.answer} rows={5} className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink focus:border-clay focus:outline-none transition-colors resize-none" />
              </div>
              <div className="flex justify-end pt-4">
                <button type="submit" className="rounded-full bg-ink px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5 shadow-xl">
                  {editing ? "Save Changes" : "Create FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
