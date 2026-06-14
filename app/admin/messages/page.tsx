"use client";

import { useEffect, useState } from "react";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      });
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "UNREAD" ? "READ" : "UNREAD";
    const res = await fetch("/api/admin/messages", {
      method: "PATCH",
      body: JSON.stringify({ id, status: newStatus }),
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
      setMessages(messages.map(m => m.id === id ? { ...m, status: newStatus } : m));
    }
  };

  if (loading) return <div className="text-ink-soft animate-pulse">Loading messages...</div>;

  return (
    <div className="pb-24">
      <div className="flex items-end justify-between mb-12">
        <h1 className="font-serif text-[clamp(2rem,3.6vw,3.1rem)] font-normal leading-[1.05] tracking-[-0.015em]">
          Contact <em className="text-clay">Forms</em>
        </h1>
      </div>

      <div className="bg-white/80 backdrop-blur rounded-3xl shadow-glass border hairline overflow-hidden relative">
        <table className="w-full text-left">
          <thead className="bg-cream-2/50 text-[0.65rem] uppercase tracking-[0.2em] text-moss">
            <tr>
              <th className="p-4 font-bold border-b hairline">Name</th>
              <th className="p-4 font-bold border-b hairline">Subject</th>
              <th className="p-4 font-bold border-b hairline">Received</th>
              <th className="p-4 font-bold border-b hairline text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(msg => (
              <tr key={msg.id} className="border-b hairline last:border-0 hover:bg-cream-2/20">
                <td className="p-4 font-medium text-ink">
                  <div>{msg.name}</div>
                  <div className="text-ink-soft text-xs font-normal">{msg.email}</div>
                </td>
                <td className="p-4 text-sm max-w-xs">
                  <div className="font-medium text-ink">{msg.subject}</div>
                  <div className="text-ink-soft truncate mt-1">{msg.message}</div>
                </td>
                <td className="p-4 text-ink-soft text-sm">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => setSelectedMessage(msg)}
                    className="text-[0.65rem] font-bold uppercase tracking-[0.14em] px-3 py-1.5 rounded-full border hairline bg-white text-ink hover:bg-cream-2 transition-colors"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => toggleStatus(msg.id, msg.status)}
                    className={`text-[0.65rem] font-bold uppercase tracking-[0.14em] px-3 py-1.5 rounded-full transition-colors ${
                      msg.status === "UNREAD" 
                        ? "bg-clay text-white hover:bg-clay/90" 
                        : "bg-cream-2 text-ink-soft hover:bg-cream"
                    }`}
                  >
                    {msg.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {messages.length === 0 && (
          <div className="p-12 text-center text-ink-soft font-light">
            No contact form submissions yet.
          </div>
        )}
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm" onClick={() => setSelectedMessage(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedMessage(null)} className="absolute top-6 right-6 text-ink-soft hover:text-ink">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-[0.65rem] uppercase tracking-[0.2em] text-clay font-bold mb-2">Message Details</div>
            <h2 className="font-serif text-2xl text-ink mb-6">{selectedMessage.subject}</h2>
            
            <div className="space-y-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-ink-soft mb-1">From</div>
                <div className="font-medium">{selectedMessage.name}</div>
                <div className="text-sm text-ink-soft">{selectedMessage.email}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-ink-soft mb-1">Date</div>
                <div className="text-sm text-ink-soft">{new Date(selectedMessage.createdAt).toLocaleString()}</div>
              </div>
              <div className="pt-6 border-t hairline">
                <p className="text-ink font-light leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t hairline flex justify-end">
               <button 
                  onClick={() => setSelectedMessage(null)}
                  className="rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5"
                >
                  Close
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
