"use client";

import Reveal from "@/components/Reveal";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormErrors = Partial<Record<keyof z.infer<typeof loginSchema>, string>>;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const result = loginSchema.safeParse({ email, password });

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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Failed to log in");
        setIsLoading(false);
        return;
      }

      if (data.user.role === "ADMIN") {
        router.replace("/admin");
      } else {
        router.replace("/");
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
              Welcome <em className="text-clay">back</em>
            </h1>
            <p className="mt-4 font-light text-ink-soft">
              Log in to your Hearth & Key account.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
              {serverError && (
                <div className="rounded-xl bg-clay-dark/10 p-3 text-sm text-clay-dark">
                  {serverError}
                </div>
              )}
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
                {isLoading ? "Logging in..." : "Log in"}
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    const res = await fetch("/api/auth/demo-admin", { method: "POST" });
                    if (res.ok) {
                      router.replace("/admin");
                      router.refresh();
                    } else {
                      const data = await res.json();
                      setServerError(`Demo Admin Error: ${data.error}`);
                      setIsLoading(false);
                    }
                  } catch (err) {
                    setServerError("An unexpected error occurred");
                    setIsLoading(false);
                  }
                }}
                className="mt-4 w-full rounded-full border-2 border-clay py-4 text-xs font-bold uppercase tracking-[0.14em] text-clay transition-all hover:bg-clay hover:text-white disabled:opacity-50 hover:-translate-y-px"
              >
                Demo Admin Login
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    const res = await fetch("/api/auth/demo-user", { method: "POST" });
                    if (res.ok) {
                      router.replace("/dashboard");
                      router.refresh();
                    } else {
                      const data = await res.json();
                      setServerError(`Demo User Error: ${data.error}`);
                      setIsLoading(false);
                    }
                  } catch (err) {
                    setServerError("An unexpected error occurred");
                    setIsLoading(false);
                  }
                }}
                className="mt-4 w-full rounded-full border-2 border-moss py-4 text-xs font-bold uppercase tracking-[0.14em] text-moss transition-all hover:bg-moss hover:text-white disabled:opacity-50 hover:-translate-y-px"
              >
                Demo User Login
              </button>
            </form>

            <p className="mt-8 text-center text-sm font-light text-ink-soft">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-clay transition-colors hover:text-gold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
