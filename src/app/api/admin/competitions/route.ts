import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const competitions = await prisma.competition.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        teams: true,
      },
    });

    return NextResponse.json({ competitions });
  } catch (error) {
    console.error("Error fetching competitions", error);
    return NextResponse.json(
      { error: "Não foi possível listar as competições." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, initialLives, maxRounds, maxPlayers, teams } = body;

    if (!name || !Array.isArray(teams) || teams.length < 2) {
      return NextResponse.json(
        { error: "Nome e pelo menos dois times são obrigatórios." },
        { status: 400 }
      );
    }

    const competition = await prisma.competition.create({
      data: {
        name,
        initialLives: Number(initialLives) || 7,
        maxRounds: Number(maxRounds) || 8,
        teams: {
          create: teams.map((teamName: string) => ({ name: teamName })),
        },
      },
      include: {
        teams: true,
      },
    });

    return NextResponse.json({ competition }, { status: 201 });
  } catch (error) {
    console.error("Error creating competition", error);
    return NextResponse.json(
      { error: "Não foi possível criar a competição." },
      { status: 500 }
    );
  }
}
