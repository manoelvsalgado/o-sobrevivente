import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/30">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-300/90">Administrador</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Painel de gerenciamento</h1>
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
            Esta área será usada para criar competições, definir vidas iniciais e limites, gerenciar rodadas,
            inserir resultados e convidar participantes.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-3xl bg-slate-950/80 p-6 ring-1 ring-white/10">
              <h2 className="text-xl font-semibold text-white">Competição</h2>
              <p className="mt-3 text-sm leading-6">Nome, número de rodadas, vidas iniciais e limite de jogadores.</p>
            </article>
            <article className="rounded-3xl bg-slate-950/80 p-6 ring-1 ring-white/10">
              <h2 className="text-xl font-semibold text-white">Rodadas</h2>
              <p className="mt-3 text-sm leading-6">Configurar deadlines, marcar eliminados e lançar resultados.</p>
            </article>
            <article className="rounded-3xl bg-slate-950/80 p-6 ring-1 ring-white/10">
              <h2 className="text-xl font-semibold text-white">Time</h2>
              <p className="mt-3 text-sm leading-6">Gerenciar lista de times e status de eliminação por rodada.</p>
            </article>
            <article className="rounded-3xl bg-slate-950/80 p-6 ring-1 ring-white/10">
              <h2 className="text-xl font-semibold text-white">Convites</h2>
              <p className="mt-3 text-sm leading-6">Gerar códigos ou links para entrada de jogadores.</p>
            </article>
          </div>
          <div className="mt-8">
            <Link
              href="/admin/competitions"
              className="inline-flex rounded-3xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Criar nova competição
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
