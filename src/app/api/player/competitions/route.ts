import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const competition = await prisma.competition.findFirst({
      orderBy: { createdAt: "desc" },
      include: {
        rounds: {
          orderBy: { number: "asc" },
          take: 1,
        },
        teams: true,
      },
    });

    if (!competition) {
      return NextResponse.json({ competition: null });
    }

    const currentRound = competition.rounds[0] || null;

    return NextResponse.json({ competition, currentRound });
  } catch (error) {
    console.error("Error fetching player competition", error);
    return NextResponse.json(
      { error: "Não foi possível obter dados da competição." },
      { status: 500 }
    );
  }
}
