"use client";

import { useState } from "react";
import Link from "next/link";

const initialTeams = ["Time A", "Time B", "Time C", "Time D"];

export default function CreateCompetitionPage() {
  const [name, setName] = useState("");
  const [lives, setLives] = useState(7);
  const [rounds, setRounds] = useState(8);
  const [maxPlayers, setMaxPlayers] = useState(20);
  const [teams, setTeams] = useState(initialTeams);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/30">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-300/90">Administrador</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Criar competição</h1>
          </div>
          <Link
            href="/admin"
            className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
          >
            Voltar ao painel
          </Link>
        </div>

        <form className="space-y-8">
          <section className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 ring-1 ring-white/5">
            <h2 className="text-xl font-semibold text-white">Dados da competição</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-300">
                Nome da competição
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ex: Sobrevivente 2026"
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                Vidas iniciais
                <input
                  type="number"
                  min={1}
                  value={lives}
                  onChange={(event) => setLives(Number(event.target.value))}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                Número de rodadas
                <input
                  type="number"
                  min={1}
                  value={rounds}
                  onChange={(event) => setRounds(Number(event.target.value))}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                Limite de jogadores
                <input
                  type="number"
                  min={1}
                  value={maxPlayers}
                  onChange={(event) => setMaxPlayers(Number(event.target.value))}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
                />
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 ring-1 ring-white/5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-white">Times participantes</h2>
              <button
                type="button"
                onClick={() => setTeams([...teams, `Time ${teams.length + 1}`])}
                className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm text-emerald-200 transition hover:bg-emerald-500/25"
              >
                Adicionar time
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {teams.map((team, index) => (
                <label key={team} className="grid gap-2 text-sm text-slate-300 sm:grid-cols-[1fr_auto] sm:items-center">
                  <input
                    value={team}
                    onChange={(event) => {
                      const next = [...teams];
                      next[index] = event.target.value;
                      setTeams(next);
                    }}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
                  />
                  <button
                    type="button"
                    onClick={() => setTeams(teams.filter((_, i) => i !== index))}
                    className="rounded-2xl bg-rose-500/20 px-4 py-3 text-sm text-rose-200 transition hover:bg-rose-500/30"
                  >
                    Remover
                  </button>
                </label>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-slate-400">
              Os campos acima definem a configuração inicial da competição. A integração com o backend será adicionada em seguida.
            </p>
            <button
              type="button"
              onClick={() => alert(`Competição ${name || "sem nome"} criada com ${lives} vidas e ${rounds} rodadas.`)}
              className="inline-flex items-center justify-center rounded-3xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Criar competição
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
