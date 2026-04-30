# User Stories — O Sobrevivente

## 1. Administração da competição

### Criar competição
**Como administrador**
quero criar uma competição informando nome, quantidade de vidas (configurável), número de rodadas, times participantes e limite de jogadores
para iniciar um novo torneio.

### Definir múltiplos administradores
**Como administrador**
quero adicionar outros administradores
para dividir a operação da competição.

### Convidar participantes
**Como administrador**
quero gerar um link ou código de convite
para permitir a entrada dos jogadores.

### Participar como jogador
**Como administrador**
quero também jogar normalmente
para competir com os demais participantes.

---

## 2. Gestão de rodadas

### Configurar deadline
**Como administrador**
quero definir data e hora limite para cada rodada
para bloquear escolhas após o prazo.

### Inserir resultados
**Como administrador**
quero cadastrar manualmente os resultados das partidas
para atualizar o sistema.

### Marcar times eliminados
**Como administrador**
quero informar quais times foram eliminados na rodada
para impedir escolhas inválidas na rodada seguinte.

---

## 3. Escolha dos jogadores

### Escolher um time
**Como jogador**
quero selecionar um time por rodada
para continuar vivo na competição.

### Ver prazo da rodada
**Como jogador**
quero visualizar o prazo limite da rodada
para saber até quando posso escolher.

### Ver apenas times válidos
**Como jogador**
quero visualizar apenas times disponíveis
para evitar escolhas inválidas.

Critérios de bloqueio:
- times já utilizados (não repetir até esgotar todos disponíveis)
- times eliminados

### Repetição obrigatória
**Como jogador**
quero ser obrigado a repetir times após esgotar todas as opções disponíveis
para continuar jogando nas rodadas finais.

---

## 4. Regras automáticas

### Perder vida por empate
**Como sistema**
quero remover uma vida quando o time empatar (considerando apenas tempo regulamentar, exceto na final)
para aplicar as regras.

### Perder vida por derrota
**Como sistema**
quero remover uma vida quando o time perder (considerando apenas tempo regulamentar, exceto na final)
para aplicar as regras.

### Aplicar penalidade por ausência
**Como sistema**
quero remover uma vida quando o jogador não escolher um time válido
para aplicar a penalidade.

### Aplicar omissão com ônus
**Como sistema**
quero permitir que o jogador escolha um time válido para "gastar" sem afetar estatísticas, com prazo até o início da próxima rodada
para evitar eliminação imediata por não escolher.

### Aplicar penalidade por repetição
**Como sistema**
quero remover vidas cumulativas em repetições (1ª volta: -1, 2ª: -2, 3ª: -3)
para aplicar as regras.

### Eliminar jogador
**Como sistema**
quero eliminar jogadores com 0 vidas
para manter a lógica do sobrevivente.

---

## 5. Ranking

### Atualizar ranking
**Como jogador**
quero ver ranking atualizado automaticamente
para acompanhar minha posição.

### Aplicar desempate
**Como sistema**
quero ordenar jogadores pelos critérios oficiais
para definir corretamente o campeão.

Ordem:
1. Menos rodadas sem palpite
2. Menos times repetidos
3. Menos derrotas
4. Vitórias fora
5. Saldo de gols
6. Gols marcados
7. Saldo fora
8. Gols fora

---

## 6. Encerramento

### Definir campeão na final
**Como sistema**
quero declarar campeão ao final do torneio
para encerrar a competição.

### Definir campeão antecipado
**Como sistema**
quero usar critérios de desempate caso todos morram antes da final
para sempre existir um campeão.

### Regra especial da final
**Como jogador**
quero poder alterar meu palpite na final se não tiver chance matemática após ver os palpites dos demais
para participar ativamente.

---

## 7. Experiência do usuário

### Usar no celular
**Como jogador**
quero acessar facilmente pelo celular
para fazer escolhas rapidamente.

### Interface simples
**Como jogador**
quero uma interface minimalista e intuitiva
para usar sem dificuldade.

