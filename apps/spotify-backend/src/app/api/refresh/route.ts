import refreshAccessToken from "@/app/services/spotify-auth/refreshAccessToken";
import { retriveAccessToken } from "@/app/services/token-storage";
import { catchHttpErrors, throwHttpErrors } from "@/app/utils";
import tokenStorageWorkflow from "@/app/workflow";
import { IToken } from "@zenith/types";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    const token = (await retriveAccessToken()) as IToken;
    if (!token) {
      throwHttpErrors("NO_TOKEN");
    }
    const newToken = await refreshAccessToken(token);

    await tokenStorageWorkflow(newToken);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return catchHttpErrors(error);
  }
}
