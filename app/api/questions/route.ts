import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limit by IP for abuse control only — the IP itself is never stored.
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "تعداد درخواست‌ها بیش از حد مجاز است. کمی بعد دوباره امتحان کنید." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "بدنه درخواست نامعتبر است." }, { status: 400 });
  }

  const { question, topic, website } = body as {
    question?: string;
    topic?: string;
    website?: string; // honeypot — should always be empty
  };

  // Honeypot: bots tend to fill every field. Silently "succeed" instead of
  // telling the bot what tripped it.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (typeof question !== "string" || question.trim().length < 10 || question.length > 100) {
    return NextResponse.json(
      { error: "لطفاً متن خود را فقط به‌صورت پیام متنی، بین ۱۰ تا ۱۰۰ نویسه، ارسال کنید." },
      { status: 400 }
    );
  }
  if (typeof topic !== "string" || topic.trim().length === 0) {
    return NextResponse.json({ error: "دسته‌بندی را انتخاب کنید." }, { status: 400 });
  }

  const supabase = supabaseAdmin();
  const { error } = await supabase.from("questions").insert({
    question: question.trim(),
    topic: topic.trim(),
  });
  // No IP, name, or user-agent is ever written to the row — only the
  // columns defined in the schema: id, question, topic, create_at.

  if (error) {
    return NextResponse.json({ error: "ثبت با خطا مواجه شد." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
