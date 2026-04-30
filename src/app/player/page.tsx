import Link from "next/link";

export default function PlayerPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/30">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-sky-300/90">Jogador</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Área do jogador</h1>
          </div>
          <Link
            href="/"
            className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
          >
            Voltar para início
          </Link>
        </div>

        <div className="space-y-6 text-slate-300">
          <p>
            Nesta área o jogador poderá escolher times por rodada, ver o prazo de cada rodada e acompanhar seu
            ranking na competição.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-3xl bg-slate-950/80 p-6 ring-1 ring-white/10">
              <h2 className="text-xl font-semibold text-white">Escolha de time</h2>
              <p className="mt-3 text-sm leading-6">Selecionar um time válido para a rodada atual.</p>
            </article>
            <article className="rounded-3xl bg-slate-950/80 p-6 ring-1 ring-white/10">
              <h2 className="text-xl font-semibold text-white">Prazos</h2>
              <p className="mt-3 text-sm leading-6">Exibir deadline e status da rodada.</p>
            </article>
            <article className="rounded-3xl bg-slate-950/80 p-6 ring-1 ring-white/10">
              <h2 className="text-xl font-semibold text-white">Times válidos</h2>
              <p className="mt-3 text-sm leading-6">Mostrar apenas opções não eliminadas e não usadas até esgotar.</p>
            </article>
            <article className="rounded-3xl bg-slate-950/80 p-6 ring-1 ring-white/10">
              <h2 className="text-xl font-semibold text-white">Ranking</h2>
              <p className="mt-3 text-sm leading-6">Acompanhar vidas, penalidades e posição na tabela.</p>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
