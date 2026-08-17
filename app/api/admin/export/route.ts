import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { supabaseAdmin } from "@/lib/supabase";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/admin-session";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "احراز هویت نشده‌اید." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const topic = searchParams.get("topic");

  const supabase = supabaseAdmin();
  let query = supabase.from("questions").select("id, question, topic").order("create_at", { ascending: false });
  if (topic && topic.trim().length > 0) {
    query = query.ilike("topic", `%${topic.trim()}%`);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: "خروجی گرفتن با خطا مواجه شد." }, { status: 500 });
  }

  // excel_columns per spec: id, questions, topic
  const rows = (data ?? []).map((r) => ({
    id: r.id,
    questions: r.question,
    topic: r.topic,
  }));

  const sheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, "Questions");
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="agora-questions.xlsx"`,
    },
  });
}
