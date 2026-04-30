"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Team = { id: string; name: string };

type PlayerCompetitionResponse = {
  competition: {
    id: string;
    name: string;
    initialLives: number;
    maxRounds: number;
    teams: Team[];
  } | null;
  currentRound: {
    number: number;
    deadline: string;
  } | null;
};

export default function PlayerCompetitionsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [deadline, setDeadline] = useState("Carregando...");
  const [roundNumber, setRoundNumber] = useState<number | null>(null);
  const [competitionName, setCompetitionName] = useState("Competição");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadCompetition() {
      try {
        const response = await fetch("/api/player/competitions");
        const data: PlayerCompetitionResponse = await response.json();
        if (data?.competition) {
          setCompetitionName(data.competition.name);
          setTeams(data.competition.teams);
          setRoundNumber(data.currentRound?.number ?? null);
          setDeadline(
            data.currentRound?.deadline
              ? new Date(data.currentRound.deadline).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Sem deadline"
          );
          setSelectedTeam(data.competition.teams[0]?.id ?? "");
        } else {
          setStatusMessage("Nenhuma competição ativa encontrada.");
        }
      } catch (error) {
        setStatusMessage("Erro ao carregar a competição.");
      }
    }

    loadCompetition();
  }, []);

  const selectedTeamLabel = useMemo(
    () => teams.find((team) => team.id === selectedTeam)?.name ?? "",
    [selectedTeam, teams]
  );

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/30">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-sky-300/90">Jogador</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Competição ativa</h1>
          </div>
          <Link
            href="/player"
            className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
          >
            Voltar à área do jogador
          </Link>
        </div>

        <div className="mb-8 rounded-3xl border border-white/10 bg-slate-950/80 p-6 ring-1 ring-white/5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Rodada atual</p>
              <p className="text-2xl font-semibold text-white">Rodada {roundNumber}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Prazo</p>
              <p className="text-lg font-medium text-emerald-300">{deadline}</p>
            </div>
          </div>
        </div>

        <section className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 ring-1 ring-white/5">
          <h2 className="text-xl font-semibold text-white">Escolha um time</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Só exibe times válidos para a rodada atual; repetição só após esgotar todas as opções.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {sampleTeams.map((team) => (
              <button
                key={team.id}
                type="button"
                onClick={() => setSelectedTeam(team.id)}
                className={`rounded-3xl border p-4 text-left transition ${
                  selectedTeam === team.id
                    ? "border-emerald-400/80 bg-emerald-500/10 text-white"
                    : "border-white/10 bg-slate-900/70 text-slate-200 hover:border-sky-400/50 hover:bg-sky-400/10"
                }`}
              >
                <p className="font-semibold">{team.name}</p>
                <p className="mt-2 text-sm text-slate-400">Time válido para a rodada</p>
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Time selecionado</p>
              <p className="text-lg font-semibold text-white">{selectedTeamLabel}</p>
            </div>
            <button
              type="button"
              onClick={async () => {
                if (!selectedTeam) {
                  setStatusMessage("Escolha um time antes de confirmar.");
                  return;
                }

                try {
                  const response = await fetch("/api/player/choices", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      userId: "user-demo",
                      roundId: "round-demo",
                      teamId: selectedTeam,
                      isOmission: false,
                    }),
                  });
                  const data = await response.json();
                  if (!response.ok) {
                    setStatusMessage(data.error || "Erro ao registrar palpite.");
                  } else {
                    setStatusMessage(`Palpite registrado: ${selectedTeamLabel}`);
                  }
                } catch (error) {
                  setStatusMessage("Falha ao conectar ao servidor.");
                }
              }}
              className="inline-flex items-center justify-center rounded-3xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Confirmar palpite
            </button>
          </div>
          {statusMessage ? (
            <div className="mt-4 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              {statusMessage}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
