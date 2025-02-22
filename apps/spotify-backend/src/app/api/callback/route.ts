import { getAccessToken } from "@/app/services/spotify-auth";
import { catchHttpErrors, throwHttpErrors } from "@/app/utils";
import tokenStorageWorkflow from "@/app/workflow";
import { IToken } from "@zenith/types";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  console.log("CALLBACK TRIGGERED===>");
  try {
    const url = new URL(request.url);
    const query = url.searchParams;
    const code = query.get("code");
    const state = query.get("state");

    if (!code) {
      throwHttpErrors("BAD_REQUEST");
    }
    const token: IToken = await getAccessToken(code as string);
    if (!token) {
      throwHttpErrors("TOKEN_FETCH_ERROR");
    }
    await tokenStorageWorkflow(token);

    if (state) {
      return NextResponse.redirect(decodeURIComponent(state), { status: 307 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return catchHttpErrors(error);
  }
}
