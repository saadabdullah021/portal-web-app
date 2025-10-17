import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  // Mock mapping for testing
  const mockMap = {
    PRbZXQBO: "ce4b0d15-f0f8-401c-911d-980aae2c8b98",
  };

  const slug = mockMap[code];

  if (!slug) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ slug });
}
