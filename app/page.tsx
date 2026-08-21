"use client";

import { useState } from "react";

const CATEGORIES = [
  "سلامت و تندرستی",
  "اقتصاد و سواد مالی",
  "زندگی روزمره و محیط",
  "خانواده",
  "ازدواج و همسر",
  "روابط اجتماعی",
  "شغل و حرفه",
  "خودشناسی و هویت",
  "هوش هیجانی و احساسات",
  "ذهنیت و الگوهای فکری",
  "تصمیم‌گیری و حل مسئله",
  "عادت‌ها و خودانضباطی",
  "اخلاق و ارزش‌ها",
  "سیاست و جامعه",
  "فرهنگ و هنر",
  "تکنولوژی و آینده",
  "مهاجرت",
  "تعادل بین زندگی",
  "اعتماد به نفس",
  "مرزها",
  "صمیمیت",
  "شناخت انسان‌ها",
];

const NAV_LINKS = [
  { href: "#values", label: "ارزش‌ها" },
  { href: "#workflow", label: "مسیر رشد" },
  { href: "#ai", label: "تحلیل‌های AI" },
  { href: "#about", label: "درباره ما" },
];

const VALUES = [
  {
    title: "عدم ذخیره‌سازی هویت",
    text: "هیچ داده‌ای از آی‌پی، شماره یا نام شما در سرورها باقی نمی‌ماند.",
    tone: "accent",
  },
  {
    title: "تحلیل بی‌طرفانه هوش مصنوعی",
    text: "پاسخ‌ها و زوایای دید جدید توسط دستیار هوشمند جمع‌آوری و استخراج می‌شوند.",
    tone: "sage",
  },
  {
    title: "رشد جمعی بدون قضاوت",
    text: "تمرکز بر پختگی فکری و پذیرش کثرت آراء در محیطی دانشگاهی.",
    tone: "sand",
  },
];

const STEPS = [
  { step: "۰۱", title: "ارسال ناشناس", desc: "ثبت سوال یا دغدغه از طریق وب‌سایت، کاملاً بدون نام" },
  { step: "۰۲", title: "ایجاد تاپیک", desc: "استخراج و باز شدن فضای گفتگوی اختصاصی برای هر سوال" },
  { step: "۰۳", title: "مهلت تفکر", desc: "۱ تا ۳ روز زمان برای ثبت پاسخ‌های عمیق و ناشناس" },
  { step: "۰۴", title: "تحلیل AI و انتشار", desc: "انتشار یکجای دیدگاه‌ها همراه با تحلیل تکمیلی هوش مصنوعی" },
];

function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CpuIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function UsersIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15.5 14.2c2.6.4 4.5 2.6 4.5 5.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const ICONS = { accent: ShieldIcon, sage: CpuIcon, sand: UsersIcon };
const ICON_COLOR: Record<string, string> = {
  accent: "text-accent border-accent/40",
  sage: "text-text-secondary border-text-secondary/40",
  sand: "text-stone border-stone/40",
};

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="glow-particles min-h-screen">
      <Header onOpenModal={() => setModalOpen(true)} />
      <Hero onOpenModal={() => setModalOpen(true)} />
      <AnonymityGuarantee />
      <Workflow />
      <SubmissionSection />
      <Footer />
      {modalOpen && <SubmitModal onClose={() => setModalOpen(false)} />}
    </main>
  );
}

function Header({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-grid px-6">
        <div className="mt-4 flex items-center justify-between rounded-card border border-white/5 bg-bg/70 px-5 py-3 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-accent shadow-glow" aria-hidden />
            <span className="font-en text-h3 tracking-wide text-text-primary">
              آگورا <span className="text-text-secondary">| AGORA</span>
            </span>
          </div>
          <nav className="hidden gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-body-md text-text-secondary transition-colors duration-300 ease-eased-out hover:text-accent"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <button
            onClick={onOpenModal}
            className="rounded-pill bg-accent px-5 py-2 text-body-md font-semibold text-bg transition-shadow duration-300 ease-eased-out hover:shadow-glow"
          >
            ورود به صندوق ناشناس
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 md:pt-28">
      <div className="mx-auto max-w-grid text-center">
        <h1 className="text-h1 md:text-[56px]">
          دیدگاه‌های ناشناس، <span className="text-accent">اندیشه‌های شفاف</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-body-lg text-text-primary/90">
          بستری امن و بدون قضاوت برای دانشجویان؛ جایی که هویت شما محفوظ است و فقط اندیشه‌تان شنیده می‌شود.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenModal}
            className="flex items-center gap-2 rounded-pill bg-accent px-7 py-3 text-body-lg font-semibold text-bg transition-shadow duration-300 ease-eased-out hover:shadow-glow"
          >
            <LockIcon className="h-5 w-5" />
            ارسال دغدغه ناشناس
          </button>
          <a
            href="#workflow"
            className="rounded-pill border border-stone/40 px-7 py-3 text-body-lg text-text-primary transition-colors duration-300 ease-eased-out hover:border-accent hover:text-accent"
          >
            آشنایی با مسیر آگورا
          </a>
        </div>

        <LiveStreamPreview />
      </div>
    </section>
  );
}

function LiveStreamPreview() {
  const sample = [
    "چطور می‌شه بین علاقه و بازار کار توی انتخاب رشته تعادل ایجاد کرد؟",
    "تحلیل AI: این دغدغه در میان دانشجویان سال دوم بسیار تکرار شده...",
    "تنهایی توی خوابگاه رو چطور مدیریت کنم بدون این‌که از درس عقب بیفتم؟",
  ];
  return (
    <div className="mx-auto mt-16 grid max-w-3xl gap-4 text-right md:grid-cols-3">
      {sample.map((s, i) => (
        <div
          key={i}
          className="card-hover rounded-card border border-stone/20 bg-surface p-5 text-body-md text-text-primary/90"
        >
          <span className="mb-2 inline-block rounded-badge bg-bg px-3 py-1 text-caption text-text-secondary">
            ناشناس
          </span>
          <p>{s}</p>
        </div>
      ))}
    </div>
  );
}

function AnonymityGuarantee() {
  return (
    <section id="values" className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-grid">
        <h2 className="text-center text-h2">سپر حریم خصوصی و امنیت</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => {
            const Icon = ICONS[v.tone as keyof typeof ICONS];
            return (
              <div
                key={v.title}
                className="card-hover rounded-card border border-stone/20 bg-bg p-7"
              >
                <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full border ${ICON_COLOR[v.tone]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-h3">{v.title}</h3>
                <p className="mt-2 text-body-md text-text-secondary">{v.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Workflow() {
  return (
    <section id="workflow" className="px-6 py-20">
      <div className="mx-auto max-w-grid">
        <h2 className="text-center text-h2">مسیر یک اندیشه</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-body-md text-text-secondary">
          هر دغدغه از ثبت ناشناس تا انتشار تحلیل‌شده، این چهار مرحله را طی می‌کند.
        </p>
        <div className="relative mt-14 grid gap-8 md:grid-cols-4">
          <div
            className="absolute top-6 hidden h-px w-full bg-gradient-to-l from-accent/60 via-accent/20 to-transparent md:block"
            aria-hidden
          />
          {STEPS.map((s) => (
            <div key={s.step} className="relative">
              <span className="font-en text-h2 text-accent/90">{s.step}</span>
              <h3 className="mt-3 text-h3">{s.title}</h3>
              <p className="mt-2 text-body-md text-text-secondary">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SubmissionSection() {
  return (
    <section id="ai" className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <SubmitForm variant="inline" />
      </div>
    </section>
  );
}

function SubmitModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg animate-[fadeScale_300ms_ease-eased-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <SubmitForm variant="modal" onSubmitted={onClose} />
        <button
          onClick={onClose}
          className="mx-auto mt-4 block text-body-md text-text-secondary hover:text-accent"
        >
          بستن
        </button>
      </div>
      <style jsx global>{`
        @keyframes fadeScale {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

function SubmitForm({
  variant,
  onSubmitted,
}: {
  variant: "inline" | "modal";
  onSubmitted?: () => void;
}) {
  const [question, setQuestion] = useState("");
  const [topic, setTopic] = useState(CATEGORIES[0]);
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const remaining = 1000 - question.length;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (question.trim().length < 10) {
      setErrorMsg("لطفاً متن خود را فقط به‌صورت پیام متنی و حداقل ۱۰ نویسه ارسال کنید.");
      return;
    }
    if (question.length > 1000) {
      setErrorMsg("متن سوال نباید بیشتر از ۱۰۰۰ نویسه باشد.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, topic, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "ارسال با خطا مواجه شد. لطفاً دوباره تلاش کنید.");
      }
      setStatus("sent");
      setQuestion("");
      onSubmitted?.();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "ارسال با خطا مواجه شد. لطفاً دوباره تلاش کنید.");
    }
  }

  return (
    <div
      className={`rounded-card border border-accent/40 bg-bg p-8 ${
        variant === "inline" ? "shadow-subtle" : "shadow-glow"
      }`}
    >
      <p className="text-body-md text-text-primary/90">
        به بستر امن «آگورا» خوش آمدید. 🌿
        <br />
        تمامی متن‌های ارسالی شما بدون نام و مشخصات ذخیره می‌شوند.
      </p>

      {status === "sent" ? (
        <div className="mt-6 rounded-input border border-accent/40 bg-surface p-5 text-body-md">
          ✅ پیام شما به‌صورت ناشناس ثبت شد.
          <br />
          سپاس از اشتراک‌گذاری اندیشه‌تان. پاسخ‌ها پس از اتمام مهلت منتشر خواهند شد.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* honeypot field — hidden from real users, bots tend to fill it */}
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            name="website"
          />

          <div>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              maxLength={1000}
              rows={6}
              placeholder="دغدغه، سوال یا اندیشه خود را بنویسید... (کاملاً ناشناس)"
              className="w-full rounded-input border border-stone/30 bg-surface p-4 text-body-md text-text-primary placeholder:text-text-secondary focus:border-accent"
            />
            <div className="mt-1 flex items-center justify-between text-caption text-text-secondary">
              <span className="inline-flex items-center gap-1 rounded-badge bg-surface px-3 py-1">
                🔒 Encrypted & Anonymous
              </span>
              <span>{remaining} نویسه باقی‌مانده</span>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-caption text-text-secondary">دسته‌بندی</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-input border border-stone/30 bg-surface p-3 text-body-md text-text-primary focus:border-accent"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {errorMsg && (
            <p className="rounded-input border border-highlight/40 bg-highlight/10 p-3 text-body-md text-highlight">
              ⚠️ {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-pill bg-accent py-3 text-body-lg font-semibold text-bg transition-shadow duration-300 ease-eased-out hover:shadow-glow disabled:opacity-60"
          >
            {status === "sending" ? "در حال ارسال..." : "سپردن به صندوق آگورا"}
          </button>
        </form>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer id="about" className="border-t border-text-secondary/30 bg-bg px-6 py-14">
      <div className="mx-auto max-w-grid flex flex-col items-center gap-6 text-center">
        <p className="text-body-md text-text-primary/90">
          آگورا؛ بستری برای رشد جمعی و تفکر عمیق دانشجویی.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-body-md text-text-secondary">
          <span>راهنمای حریم خصوصی</span>
          <span>بیانیه ارزش‌ها</span>
          <span>جلسات حضوری</span>
        </div>
        <p className="text-caption text-text-secondary">
          © Agora Community — تمامی حقوق محفوظ است.
        </p>
        <div>
          <a
            href="https://mallek.ir"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-caption text-text-secondary transition-colors duration-300 ease-eased-out hover:text-accent"
          >
            توسعه داده شده توسط
            <span className="font-semibold text-stone transition-colors duration-300 ease-eased-out group-hover:text-accent">
              ملک
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
