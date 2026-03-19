const attempts = new Map<string, number[]>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 3;

  const timestamps = (attempts.get(ip) || [])
    .filter(t => now - t < windowMs);

  if (timestamps.length >= maxRequests) {
    return false; // rate limited
  }

  attempts.set(ip, [...timestamps, now]);
  return true; // allowed
}
