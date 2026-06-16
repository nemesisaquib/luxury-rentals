import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET || "default_super_secret_key_for_dev_only";
const key = new TextEncoder().encode(secretKey);

export async function signToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function verifyToken(input: string) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export interface SessionPayload {
  userId: string;
  role: string;
  [key: string]: any;
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  const payload = await verifyToken(session);
  return payload as SessionPayload | null;
}

export async function setSession(userId: string, role: string) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  const session = await signToken({ userId, role });

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
}
