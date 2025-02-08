import { NextResponse } from "next/server";
import getCORSHeaders from "./getCORSHeaders";

export default function OPTIONS() {
  return NextResponse.json({}, { headers: getCORSHeaders() });
}
