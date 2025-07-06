import { NextRequest, NextResponse } from "next/server";
import { getCookiesServer } from "./lib/cookieServer";
import { api } from "./services/api";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname === "/") {
    return NextResponse.next();
  }

  const token = await getCookiesServer();

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const isValide = await validateToken(token);
    console.log(isValide)

    if (!isValide) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

async function validateToken(token: string) {
  if (!token) {
    return false;
  }

  try {
    await api.get("/user/detail", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (error) {
    return false;
    
  }
}
