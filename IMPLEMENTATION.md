# Registro de Implementação — O Sobrevivente

## Data de Início
29 de abril de 2026

## Branch
`implementacao` — Criada para desenvolvimento sem afetar main.

## Passos Realizados

### 1. Configuração do Projeto (29/04/2026)
- **Movidos arquivos de documentação**: `plan.md` e `requisitos.md` para `docs/` para evitar conflitos com `create-next-app`.
- **Criado projeto Next.js 14**: Usando `npx create-next-app` com opções:
  - TypeScript
  - TailwindCSS
  - ESLint
  - App Router
  - src/ directory
  - Alias de import: `@/*`
- **Instalado Prisma**: `npm install prisma @prisma/client`.
- **Inicializado Prisma**: `npx prisma init`, criando `prisma/schema.prisma`, `prisma.config.ts` e `.env`.

### 2. Definição do Schema do Banco (29/04/2026)
- **Modelo de dados**: Definido em `prisma/schema.prisma` com tabelas principais:
  - `User`: Usuários (email, senha, nome).
  - `Competition`: Competições (nome, vidas iniciais, rodadas).
  - `CompetitionMember`: Relação usuário-competição (role, vidas restantes).
  - `CompetitionInvite`: Códigos de convite.
  - `Round`: Rodadas (número, deadline, status).
  - `Team`: Times (nome, eliminação).
  - `PlayerChoice`: Escolhas dos jogadores.
  - `MatchResult`: Resultados inseridos pelo admin.
  - `Penalty`: Penalidades aplicadas.
- **Configuração .env**: Adicionados placeholders para `DATABASE_URL` (Supabase), `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **Criado registro de implementação**: `IMPLEMENTATION.md` para acompanhar progresso.

## Próximos Passos Planejados
1. **Configurar Supabase**: Criar projeto no Supabase, obter connection string e keys, atualizar `.env`.
2. **Executar migração inicial**: `npx prisma migrate dev` para criar tabelas no banco.
3. **Configurar cliente Prisma**: Criar `lib/db.ts` para singleton do Prisma Client.
4. **Implementar autenticação**: Usar Supabase Auth para login/registro.
5. **Criar páginas e APIs**: Começar com rotas para criação de competição, convites, etc.
6. **Testes**: Validar criação de competição e participação.

## Notas Técnicas
- **Stack**: Next.js 14 + Supabase + Prisma + TailwindCSS.
- **Banco**: PostgreSQL via Supabase (free tier).
- **Autenticação**: Supabase Auth.
- **Desafios**: Integração das regras oficiais (repetição cumulativa, omissão com ônus, desempate complexo).

## Pendências
- Configurar Supabase project (usuário precisa criar conta e projeto).
- Resolver warnings de engine no Prisma (Node 20 vs 22, mas funcional).