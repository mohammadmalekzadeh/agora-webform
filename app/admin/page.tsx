"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "ورود ناموفق بود.");
        setLoading(false);
        return;
      }
      router.push("/admin/dashboard");
    } catch {
      setError("خطایی رخ داد. دوباره تلاش کنید.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-card border border-stone/20 bg-surface p-8 shadow-subtle"
      >
        <h1 className="text-h3 text-center">ورود مدیریت آگورا</h1>
        <p className="mt-2 text-center text-caption text-text-secondary">
          این بخش فقط برای سفیران و ادمین‌های آگورا است.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-caption text-text-secondary">نام کاربری</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-input border border-stone/30 bg-bg p-3 text-body-md focus:border-accent"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="mb-1 block text-caption text-text-secondary">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-input border border-stone/30 bg-bg p-3 text-body-md focus:border-accent"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="rounded-input border border-highlight/40 bg-highlight/10 p-3 text-body-md text-highlight">
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-pill bg-accent py-3 text-body-lg font-semibold text-bg transition-shadow duration-300 hover:shadow-glow disabled:opacity-60"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </div>
      </form>
    </main>
  );
}
