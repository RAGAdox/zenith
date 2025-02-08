import { getAuthorizationTokenURI } from "@/app/services/spotify-auth";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export function GET(request: NextRequest) {
  const url = new URL(request.url);
  const query = url.searchParams;
  const referer = query.get("referer");
  const redirect_uri = getAuthorizationTokenURI(referer as string);
  return NextResponse.json({ redirect_uri, success: true });
}
