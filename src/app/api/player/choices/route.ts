import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, roundId, teamId } = body;

  if (!userId || !roundId || !teamId) {
    return NextResponse.json(
      { error: "userId, roundId e teamId são obrigatórios." },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { choice: { id: "choice-demo", userId, roundId, teamId, createdAt: new Date().toISOString() } },
    { status: 201 }
  );
}
