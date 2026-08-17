import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/admin-session";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "احراز هویت نشده‌اید." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const topic = searchParams.get("topic"); // search parameter is "by topic only", per spec
  const order = searchParams.get("order") === "asc" ? true : false; // default: newest first

  const supabase = supabaseAdmin();
  let query = supabase.from("questions").select("id, question, topic, create_at").order("create_at", {
    ascending: order,
  });

  if (topic && topic.trim().length > 0) {
    query = query.ilike("topic", `%${topic.trim()}%`);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: "دریافت اطلاعات با خطا مواجه شد." }, { status: 500 });
  }

  return NextResponse.json({ questions: data });
}
