import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    competition: {
      id: "comp-1",
      name: "Sobrevivente Demo",
      initialLives: 7,
      maxRounds: 8,
      teams: [
        { id: "1", name: "Flamengo" },
        { id: "2", name: "Palmeiras" },
        { id: "3", name: "Fluminense" },
        { id: "4", name: "Corinthians" },
      ],
    },
    currentRound: {
      number: 3,
      deadline: "2026-05-01T18:00:00Z",
    },
  });
}
