# Documentação de Tecnologias — O Sobrevivente

## Resumo Executivo

**Stack**: Next.js 14 + Supabase + TailwindCSS + Vercel  
**Custo**: R$ 0 (free tiers)  
**Arquitetura**: Full-stack monolítico (frontend + backend na mesma aplicação)  
**Público-alvo**: Poucas pessoas (amigos), sem preocupação com escalabilidade

---

## 1. Frontend & Backend: Next.js 14+

### O que é?
Framework React full-stack que permite criar frontend e API backend na mesma aplicação. Usa App Router (roteamento moderno) para organizar páginas e endpoints.

### Por que foi escolhido?
- ✅ **Full-stack monolítico**: frontend + backend em um único projeto (menos complexidade)
- ✅ **Vercel native**: deploy em um clique, sem configuração
- ✅ **Custo zero**: free tier do Vercel é generoso (100GB bandwidth/mês)
- ✅ **Rápido**: otimizações automáticas, server components
- ✅ **API simples**: rotas `/api` integradas, sem servidor separado
- ✅ **TypeScript**: suporte nativo, melhor qualidade de código

### Documentação Oficial
- [Next.js Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### Como será usada no Projeto
```
app/
├── (auth)/           # Rotas de autenticação (login, register, join invite)
├── admin/            # Dashboard do administrador
│   └── competitions/[id]/
├── player/           # Dashboard do jogador
│   └── competitions/[id]/
├── api/              # Endpoints REST
│   ├── auth/         # register, login, logout
│   ├── admin/        # gerenciar competições, times, rodadas
│   └── player/       # escolher times
└── layout.tsx        # Layout global
```

### Considerações
- **SSR vs Client**: As páginas usarão principalmente Client Components (interatividade)
- **Middleware**: Proteger rotas admin vs player com middleware de autenticação
- **API Error Handling**: Criar wrapper para tratamento consistente de erros

---

## 2. Banco de Dados: Supabase + Prisma ORM

### O que é?
**Supabase**: PostgreSQL gerenciado na nuvem com free tier generoso (500MB de dados, infinitas conexões).  
**Prisma**: ORM (Object-Relational Mapping) que facilita queries e migrations do banco.

### Por que foi escolhido?
- ✅ **Supabase free**: 500MB é mais que suficiente para poucas pessoas
- ✅ **PostgreSQL robusto**: banco SQL profissional, não NoSQL frágil
- ✅ **Prisma simple**: migrations automáticas, type-safety, queries legíveis
- ✅ **Connection pooling**: Supabase gerencia automaticamente
- ✅ **Backups**: Supabase faz automaticamente (segurança gratuita)

### Documentação Oficial
- [Supabase Docs](https://supabase.com/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Prisma + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

### Como será usado no Projeto
```
prisma/
└── schema.prisma        # Definição de tabelas, relacionamentos, migrations

lib/
└── db.ts               # Singleton do Prisma Client

// Exemplo de query no código:
const user = await prisma.user.findUnique({
  where: { email: "jogador@email.com" },
  include: { competitions: true }
});
```

### Tabelas Principais
| Tabela | Propósito |
|--------|-----------|
| `User` | Usuários (email, password_hash, name) |
| `Competition` | Competições (nome, rodadas, vidas iniciais) |
| `CompetitionMember` | Relação N:M (user ↔ competition, role, lives) |
| `CompetitionInvite` | Códigos de convite únicos |
| `Round` | Rodadas (número, deadline, status) |
| `Team` | Times (nome, eliminado em qual rodada?) |
| `PlayerChoice` | Escolhas do jogador (qdo escolheu qual time) |
| `MatchResult` | Resultados inseridos pelo admin |
| `Penalty` | Penalidades (por quê jogador perdeu vida) |

### Considerações
- **Migrations**: `prisma migrate dev` para criar/alterar tabelas
- **Seed**: `prisma db seed` para popular dados de teste
- **Connection**: Usar connection pooling do Supabase (já automático)

---

## 3. Autenticação: Simples (Email + Senha + Session)

### O que é?
Sistema de auth **minimalista**: sem librarias complexas (NextAuth), sem OAuth, apenas email + senha + cookie de session.

### Por que foi escolhido?
- ✅ **Simplicidade**: poucas pessoas, ambiente de confiança (amigos)
- ✅ **Sem dependências pesadas**: menos código, menos bugs
- ✅ **Controle total**: você entende toda a lógica de auth
- ✅ **Custo zero**: sem serviços de autenticação terceirizados
- ✅ **Rápido de implementar**: ~3 endpoints de auth

### Como será implementada

#### Endpoints
```
POST /api/auth/register
  Body: { email, password, name, inviteCode }
  → Validar invite_code
  → Hash password com bcrypt
  → Criar usuário
  → Criar session
  → Return: { userId, sessionId }

POST /api/auth/login
  Body: { email, password }
  → Buscar usuário
  → Validar password (bcrypt compare)
  → Criar session
  → Return: { userId, sessionId }

POST /api/auth/logout
  → Deletar session
  → Return: { ok: true }
```

#### Session
- **Storage**: Cookie HTTP-only no navegador (seguro, não acessível via JS)
- **Server**: Armazena sessions em tabela `Session` no Prisma
- **TTL**: Expiração em 30 dias (configurável)

#### Password Hashing
- **Biblioteca**: `bcryptjs` (npm package)
- **Salt rounds**: 10 (padrão seguro)
- **Nunca**: guardar senha em plaintext

### Documentação Oficial
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Session Management Pattern](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/sessions)

### Middleware de Proteção
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const session = request.cookies.get('sessionId')?.value;
  
  if (!session && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

### Considerações de Segurança
- ⚠️ HTTPS obrigatório (Vercel já força)
- ⚠️ Cookie com flags: `HttpOnly`, `Secure`, `SameSite=Strict`
- ⚠️ Rate limiting em `/login` (evitar brute force)
- ⚠️ CSRF token em forms (Next.js Server Actions automático)

---

## 4. UI: TailwindCSS + Shadcn/ui

### O que é?
**TailwindCSS**: Framework CSS utility-first (classes pré-prontas: `bg-blue-500`, `p-4`, etc).  
**Shadcn/ui**: Componentes React prontos (botões, inputs, modais) sem dependências pesadas.

### Por que foi escolhido?
- ✅ **Rápido**: não precisa escrever CSS, apenas combinar classes
- ✅ **Mobile-first**: responsivo por padrão
- ✅ **Consistente**: design system automático (cores, spacing)
- ✅ **Leve**: TailwindCSS não é uma dependência de runtime
- ✅ **Shadcn/ui**: componentes acessíveis e customizáveis

### Documentação Oficial
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Shadcn/ui Docs](https://ui.shadcn.com)
- [Shadcn/ui Components](https://ui.shadcn.com/docs/components)

### Como será usado no Projeto
```
components/
├── ui/                    # Componentes Shadcn (Button, Input, Card, etc)
│   ├── button.tsx
│   ├── input.tsx
│   └── card.tsx
├── Layout.tsx             # Layout global
├── Navbar.tsx             # Barra superior
└── CompetitionCard.tsx    # Componentes específicos do app
```

### Exemplos de Uso
```tsx
// Componente de login
<div className="flex flex-col gap-4 max-w-md mx-auto mt-10">
  <Input 
    type="email" 
    placeholder="email@example.com"
    className="px-4 py-2 border rounded"
  />
  <Button 
    onClick={handleLogin}
    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Entrar
  </Button>
</div>
```

### Considerações
- **Dark mode**: TailwindCSS suporta nativo (ativar no `tailwind.config.ts`)
- **Customização**: estender cores/spacing no `tailwind.config.ts`
- **Performance**: Tailwind remove CSS não-usado em build (tree-shaking)

---

## 5. Deploy: Vercel

### O que é?
Plataforma de deploy para Next.js (e outras aplicações). Free tier permite hospedar infinitas aplicações pequenas.

### Por que foi escolhido?
- ✅ **Next.js native**: feito pela mesma empresa, zero configuração
- ✅ **Custo zero**: free tier é generoso (100GB bandwidth/mês, 6000 build minutes)
- ✅ **Automático**: conectar GitHub, cada push = deploy automático
- ✅ **Rápido**: CDN global, edge functions, serverless functions
- ✅ **Fácil**: interface intuitiva, logs legíveis
- ✅ **Domínio grátis**: `seu-app.vercel.app` incluído

### Documentação Oficial
- [Vercel Docs](https://vercel.com/docs)
- [Deploying Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)

### Como será feito o Deploy
1. Criar repositório no GitHub
2. Conectar GitHub ao Vercel
3. Cada push para `main` = deploy automático
4. Variáveis de ambiente (DATABASE_URL, etc) configuradas no dashboard Vercel

### Configuração
```
// vercel.json
{
  "env": {
    "DATABASE_URL": "@supabase-database-url"
  }
}

// ou via dashboard: Settings → Environment Variables
```

### Considerações
- **Cold starts**: Funções serverless podem ter delay na primeira requisição (< 1s)
- **Bandwidth**: 100GB/mês é suficiente para poucas pessoas
- **Logs**: `vercel logs` para debug em produção

---

## 6. Ferramentas de Desenvolvimento

### TypeScript
- **Por quê**: Type safety, menos bugs, melhor autocomplete no editor
- **Setup**: Next.js já traz TypeScript pré-configurado
- **Uso**: Tipificar props, respostas de API, dados do banco

### ESLint + Prettier
- **ESLint**: Valida código (encontra bugs, padrões)
- **Prettier**: Formata código automaticamente (sem discussões sobre estilo)
- **Setup**: Next.js inclui setup recomendado

### Git + GitHub
- **Controle de versão**: guardar código no GitHub
- **CI/CD**: Vercel dispara deploy automaticamente no push

### Variáveis de Ambiente
```env
# .env.local (git-ignored, local apenas)
DATABASE_URL=postgresql://user:pass@supabase.co/db
NEXT_PUBLIC_API_URL=http://localhost:3000  # Públicas no cliente

# .env.production (definidas no Vercel dashboard)
DATABASE_URL=postgresql://...produção...
```

### Package Manager: npm (ou pnpm)
Instalar dependências:
```bash
npm install next prisma bcryptjs tailwindcss shadcn-ui
npm install -D typescript eslint prettier
```

---

## 7. Checklist de Setup Inicial

- [ ] Criar projeto Next.js: `npx create-next-app@latest o-sobrevivente --typescript`
- [ ] Instalar dependências: `npm install prisma bcryptjs`
- [ ] Instalar Shadcn/ui: `npx shadcn-ui@latest init`
- [ ] Criar conta Supabase e banco PostgreSQL
- [ ] Conectar Prisma ao Supabase: `DATABASE_URL` no `.env.local`
- [ ] Criar repositório GitHub e conectar ao Vercel
- [ ] Configurar variáveis de ambiente no Vercel dashboard
- [ ] Setup schema Prisma (9 tabelas)
- [ ] Criar migrations: `prisma migrate dev --name init`

---

## 8. Referência Rápida de Comandos

```bash
# Desenvolvimento
npm run dev                    # Iniciar servidor local (localhost:3000)
npm run build                  # Build para produção
npm run start                  # Iniciar em produção

# Prisma
prisma migrate dev             # Criar e aplicar migrations
prisma db seed                 # Popular dados de teste
prisma studio                  # GUI para vizualizar banco

# Linting
npm run lint                   # Validar código com ESLint
npx prettier --write "."       # Formatar código

# Deploy
git push origin main           # Push → Vercel dispara deploy
vercel logs                    # Ver logs em produção
vercel env pull                # Puxar variáveis do Vercel
```

---

## 9. Troubleshooting Comum

| Problema | Solução |
|----------|---------|
| "Connection refused" ao Supabase | Verificar `DATABASE_URL` em `.env.local` |
| Prisma não acha banco | Rodar `prisma migrate dev` |
| Session não persiste | Verificar cookie flags (`HttpOnly`, `Secure`) |
| Vercel deployment falha | Checar logs no dashboard, variáveis de env |
| TailwindCSS não funciona | Certificar `tailwind.config.ts` aponta correto `content` |

---

## 10. Recursos Adicionais

- **Supabase Dashboard**: https://app.supabase.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub**: https://github.com
- **VS Code**: Editor recomendado (suporte TypeScript, Prettier)
- **Postman/Insomnia**: Testar endpoints de API
