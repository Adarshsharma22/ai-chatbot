import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const COOKIE_NAME = "chat_uid";
const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Returns a stable anonymous ID for the current visitor, stored in an
 * httpOnly cookie. Creates one on first visit. This is what makes each
 * browser/device see only ITS OWN chats instead of a global shared list.
 */
export async function getOrCreateUserId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(COOKIE_NAME)?.value;

  if (existing) {
    return existing;
  }

  const userId = randomUUID();

  cookieStore.set(COOKIE_NAME, userId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_YEAR,
    path: "/",
  });

  return userId;
}