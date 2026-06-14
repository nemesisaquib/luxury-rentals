"use client";

import Reveal from "@/components/Reveal";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormErrors = Partial<Record<keyof z.infer<typeof signupSchema>, string>>;

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const result = signupSchema.safeParse({ name, email, password });

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

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Failed to sign up");
        setIsLoading(false);
        return;
      }

      if (data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      router.refresh();
    } catch (err) {
      setServerError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <section className="px-5 py-32 md:px-12 relative min-h-screen">
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,rgba(185,154,91,0.06),transparent_50%)]" />
      <div className="mx-auto max-w-md">
        <Reveal>
          <div className="rounded-3xl border hairline bg-white/70 backdrop-blur-xl p-10 shadow-float">
            <h1 className="font-serif text-[clamp(2rem,3.6vw,3.1rem)] font-normal leading-[1.05] tracking-[-0.015em]">
              Join the <em className="text-clay">club</em>
            </h1>
            <p className="mt-4 font-light text-ink-soft">
              Create an account to save your favorite stays and book trips.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
              {serverError && (
                <div className="rounded-xl bg-clay-dark/10 p-3 text-sm text-clay-dark">
                  {serverError}
                </div>
              )}
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-[0.16em] text-moss">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    setServerError("");
                  }}
                  placeholder="Jane Doe"
                  className={`w-full rounded-xl border hairline bg-cream-2/40 px-4 py-3 text-sm outline-none transition-shadow focus:border-clay focus:ring-2 focus:ring-clay/20 placeholder:text-ink-soft/50 ${
                    errors.name ? "border-clay-dark ring-1 ring-clay-dark" : ""
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 px-1 text-xs text-clay-dark">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-[0.16em] text-moss">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    setServerError("");
                  }}
                  placeholder="you@example.com"
                  className={`w-full rounded-xl border hairline bg-cream-2/40 px-4 py-3 text-sm outline-none transition-shadow focus:border-clay focus:ring-2 focus:ring-clay/20 placeholder:text-ink-soft/50 ${
                    errors.email ? "border-clay-dark ring-1 ring-clay-dark" : ""
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 px-1 text-xs text-clay-dark">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-[0.16em] text-moss">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    setServerError("");
                  }}
                  placeholder="••••••••"
                  className={`w-full rounded-xl border hairline bg-cream-2/40 px-4 py-3 text-sm outline-none transition-shadow focus:border-clay focus:ring-2 focus:ring-clay/20 placeholder:text-ink-soft/50 ${
                    errors.password ? "border-clay-dark ring-1 ring-clay-dark" : ""
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 px-1 text-xs text-clay-dark">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 w-full rounded-full bg-clay py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-transform hover:bg-clay-dark hover:-translate-y-px disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isLoading ? "Signing up..." : "Sign up"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm font-light text-ink-soft">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-clay transition-colors hover:text-gold"
              >
                Log in
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
