import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10 sm:px-10">
      <section className="mx-auto flex max-w-5xl flex-col gap-10 rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-12">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-emerald-500/20 px-4 py-1 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-200 ring-1 ring-emerald-200/10">
            Bolão Sobrevivente</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Gerencie competições com vidas, rodadas e regras do jogo.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            Comece com uma plataforma simples para administrar competições, convidar jogadores e acompanhar o ranking
            do Bolão “Sobrevivente com Vidas”.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin"
            className="rounded-2xl border border-emerald-400/20 bg-white/5 p-6 text-left transition hover:border-emerald-400/40 hover:bg-white/10"
          >
            <h2 className="text-xl font-semibold text-white">Painel do Administrador</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Crie competições, convites, configure rodadas e atualize resultados.
            </p>
          </Link>

          <Link
            href="/player"
            className="rounded-2xl border border-sky-400/20 bg-white/5 p-6 text-left transition hover:border-sky-400/40 hover:bg-white/10"
          >
            <h2 className="text-xl font-semibold text-white">Área do Jogador</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Escolha times, veja prazos e acompanhe seu ranking na competição.
            </p>
          </Link>
        </div>

        <div className="grid gap-4 text-slate-300 md:grid-cols-3">
          <div className="rounded-3xl bg-slate-950/80 p-6 ring-1 ring-white/10">
            <h3 className="font-semibold text-white">Repetição</h3>
            <p className="mt-3 text-sm leading-6">Não é permitido repetir times até esgotar todas as opções válidas.</p>
          </div>
          <div className="rounded-3xl bg-slate-950/80 p-6 ring-1 ring-white/10">
            <h3 className="font-semibold text-white">Eliminação</h3>
            <p className="mt-3 text-sm leading-6">Perde vida em empate, derrota, ausência e repetição forçada.</p>
          </div>
          <div className="rounded-3xl bg-slate-950/80 p-6 ring-1 ring-white/10">
            <h3 className="font-semibold text-white">Ranking</h3>
            <p className="mt-3 text-sm leading-6">Ordenação por vidas, desempate oficial e desempenho de cada rodada.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
