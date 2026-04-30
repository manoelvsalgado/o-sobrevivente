import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, roundId, teamId, isOmission } = body;

    if (!userId || !roundId || !teamId) {
      return NextResponse.json(
        { error: "userId, roundId e teamId são obrigatórios." },
        { status: 400 }
      );
    }

    const choice = await prisma.playerChoice.create({
      data: {
        userId,
        roundId,
        teamId,
        isOmission: Boolean(isOmission),
      },
    });

    return NextResponse.json({ choice }, { status: 201 });
  } catch (error) {
    console.error("Error creating player choice", error);
    return NextResponse.json(
      { error: "Não foi possível registrar a escolha." },
      { status: 500 }
    );
  }
}
