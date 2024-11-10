import { NextRequest, NextResponse } from "next/server";
const allowedOrigins = [] as any;

export function corsMiddleware(request: NextRequest) {
  const response = NextResponse.next();
  request.headers.get("origin");
  response.headers.append("Access-Control-Allow-Origin", "*");
  response.headers.append("Access-Control-Allow-Credentials", "true");
  response.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT"
  );
  response.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204 });
  }
  return response;
}

export const config = {
  matcher: "/api/:path*",
};
