"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type Question = {
  id: string | number;
  question: string;
  topic: string;
  create_at: string;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [topicFilter, setTopicFilter] = useState("");
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const params = new URLSearchParams();
    if (topicFilter) params.set("topic", topicFilter);
    params.set("order", order);

    const res = await fetch(`/api/admin/questions?${params.toString()}`);
    if (res.status === 401) {
      router.push("/admin");
      return;
    }
    if (!res.ok) {
      setError("دریافت اطلاعات با خطا مواجه شد.");
      return;
    }
    const data = await res.json();
    setQuestions(data.questions);
  }, [topicFilter, order, router]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  function handleExport() {
    const params = new URLSearchParams();
    if (topicFilter) params.set("topic", topicFilter);
    window.location.href = `/api/admin/export?${params.toString()}`;
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-grid">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-h2">پنل مدیریت آگورا</h1>
          <button
            onClick={handleLogout}
            className="rounded-pill border border-stone/40 px-5 py-2 text-body-md hover:border-accent hover:text-accent"
          >
            خروج
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <input
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            placeholder="جست‌وجو بر اساس دسته‌بندی..."
            className="min-w-[220px] flex-1 rounded-input border border-stone/30 bg-surface p-3 text-body-md focus:border-accent"
          />
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as "desc" | "asc")}
            className="rounded-input border border-stone/30 bg-surface p-3 text-body-md focus:border-accent"
          >
            <option value="desc">جدیدترین</option>
            <option value="asc">قدیمی‌ترین</option>
          </select>
          <button
            onClick={handleExport}
            className="rounded-pill bg-accent px-5 py-3 text-body-md font-semibold text-bg hover:shadow-glow"
          >
            خروجی اکسل
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-input border border-highlight/40 bg-highlight/10 p-3 text-body-md text-highlight">
            ⚠️ {error}
          </p>
        )}

        <div className="mt-8 overflow-x-auto rounded-card border border-stone/20">
          <table className="w-full text-right text-body-md">
            <thead className="bg-surface text-text-secondary">
              <tr>
                <th className="p-4 font-normal">شناسه</th>
                <th className="p-4 font-normal">سوال</th>
                <th className="p-4 font-normal">دسته‌بندی</th>
                <th className="p-4 font-normal">تاریخ ثبت</th>
              </tr>
            </thead>
            <tbody>
              {questions === null && (
                <tr>
                  <td className="p-6 text-center text-text-secondary" colSpan={4}>
                    در حال بارگذاری...
                  </td>
                </tr>
              )}
              {questions?.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-text-secondary" colSpan={4}>
                    سوالی یافت نشد.
                  </td>
                </tr>
              )}
              {questions?.map((q) => (
                <tr key={q.id} className="border-t border-stone/10">
                  <td className="p-4 align-top text-caption text-text-secondary">{q.id}</td>
                  <td className="p-4 align-top">{q.question}</td>
                  <td className="p-4 align-top">
                    <span className="rounded-badge bg-surface px-3 py-1 text-caption text-highlight">
                      {q.topic}
                    </span>
                  </td>
                  <td className="p-4 align-top text-caption text-text-secondary">
                    {new Date(q.create_at).toLocaleString("fa-IR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
