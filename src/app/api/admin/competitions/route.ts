import { NextResponse } from "next/server";

let competitions = [
  {
    id: "comp-1",
    name: "Sobrevivente Demo",
    initialLives: 7,
    maxRounds: 8,
    createdAt: new Date().toISOString(),
    teams: [
      { id: "1", name: "Flamengo" },
      { id: "2", name: "Palmeiras" },
    ],
  },
];

export async function GET() {
  return NextResponse.json({ competitions });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, initialLives, maxRounds, teams } = body;

  if (!name || !Array.isArray(teams) || teams.length < 2) {
    return NextResponse.json(
      { error: "Nome e pelo menos dois times são obrigatórios." },
      { status: 400 }
    );
  }

  const competition = {
    id: `comp-${competitions.length + 1}`,
    name,
    initialLives,
    maxRounds,
    createdAt: new Date().toISOString(),
    teams: teams.map((team: string, index: number) => ({ id: `${index + 1}`, name: team })),
  };

  competitions = [competition, ...competitions];
  return NextResponse.json({ competition }, { status: 201 });
}
