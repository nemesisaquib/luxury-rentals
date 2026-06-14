"use client";

import { useState, useEffect } from "react";

export default function AdminSettings() {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const [settings, setSettings] = useState<any>({ name: "", tagline: "", description: "", logo: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 300;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          setSettings({ ...settings, logo: canvas.toDataURL("image/png") });
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    
    await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings)
    });

    setStatus("saved");
    setTimeout(() => setStatus("idle"), 3000);
  };

  if (loading) return <div className="animate-pulse">Loading settings...</div>;

  return (
    <div className="pb-24 max-w-4xl">
      <div className="flex items-end justify-between mb-12">
        <h1 className="font-serif text-[clamp(2rem,3.6vw,3.1rem)] font-normal leading-[1.05] tracking-[-0.015em]">
          Platform <em className="text-clay">Settings</em>
        </h1>
        {status === "saved" && (
          <div className="bg-moss/10 text-moss px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.14em]">
            Settings Saved
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* General Settings */}
        <section className="bg-white/80 backdrop-blur rounded-3xl shadow-glass border hairline p-8">
          <h2 className="font-serif text-2xl text-ink mb-6">General Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Site Name</label>
              <input type="text" value={settings.name || ""} onChange={e => setSettings({...settings, name: e.target.value})} className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink focus:border-clay focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Site Tagline</label>
              <input type="text" value={settings.tagline || ""} onChange={e => setSettings({...settings, tagline: e.target.value})} className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink focus:border-clay focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Upload Site Logo</label>
              <div className="flex items-center gap-6 mt-2">
                {settings.logo && (
                  <div className="relative group">
                    <img src={settings.logo} alt="Logo Preview" className="h-12 w-auto object-contain rounded-md border hairline bg-white p-1" />
                    <button 
                      type="button" 
                      onClick={() => setSettings({...settings, logo: ""})} 
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      title="Remove Logo"
                    >
                      ✕
                    </button>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="text-sm file:mr-4 file:rounded-full file:border-0 file:bg-cream-2 file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-wider file:text-ink hover:file:bg-cream transition-colors" />
              </div>
            </div>
          </div>
          <div className="space-y-6 mt-8 border-t hairline pt-8">
            <h3 className="font-serif text-lg text-ink">Contact Details</h3>
            <div>
              <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Support Email</label>
              <input type="email" value={settings.email || ""} onChange={e => setSettings({...settings, email: e.target.value})} className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink focus:border-clay focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Phone Number</label>
              <input type="text" value={settings.phone || ""} onChange={e => setSettings({...settings, phone: e.target.value})} className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink focus:border-clay focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Office Address</label>
              <input type="text" value={settings.address || ""} onChange={e => setSettings({...settings, address: e.target.value})} className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink focus:border-clay focus:outline-none transition-colors" />
            </div>
          </div>

          <div className="space-y-6 mt-8 border-t hairline pt-8">
            <h3 className="font-serif text-lg text-ink">Social Links</h3>
            <div>
              <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Twitter / X URL</label>
              <input type="url" value={settings.socials?.twitter || ""} onChange={e => setSettings({...settings, socials: {...settings.socials, twitter: e.target.value}})} className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink focus:border-clay focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Instagram URL</label>
              <input type="url" value={settings.socials?.instagram || ""} onChange={e => setSettings({...settings, socials: {...settings.socials, instagram: e.target.value}})} className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink focus:border-clay focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Facebook URL</label>
              <input type="url" value={settings.socials?.facebook || ""} onChange={e => setSettings({...settings, socials: {...settings.socials, facebook: e.target.value}})} className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink focus:border-clay focus:outline-none transition-colors" />
            </div>
          </div>
        </section>

        {/* SEO Settings */}
        <section className="bg-white/80 backdrop-blur rounded-3xl shadow-glass border hairline p-8">
          <h2 className="font-serif text-2xl text-ink mb-6">SEO & Metadata</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-moss mb-2">Default Meta Description</label>
              <textarea rows={3} value={settings.description || ""} onChange={e => setSettings({...settings, description: e.target.value})} className="w-full border-b hairline border-ink/20 bg-transparent py-3 text-ink focus:border-clay focus:outline-none transition-colors resize-none" />
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={status === "saving"}
            className="rounded-full bg-ink px-10 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 shadow-xl"
          >
            {status === "saving" ? "Saving..." : "Save All Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
