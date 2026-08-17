// Simple in-memory rate limiter. Good enough for a single-instance deploy;
// on serverless platforms with multiple instances, swap this for a
// Redis/Upstash-backed limiter for real protection.

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // per IP, per window

const hits = new Map<string, number[]>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}
