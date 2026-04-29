# User Stories — O Sobrevivente

## 1. Administração da competição

### Criar competição
**Como administrador**
quero criar uma competição informando nome, quantidade de vidas, número de rodadas, times participantes e limite de jogadores
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
- times já utilizados
- times eliminados

### Repetição excepcional
**Como jogador**
quero reutilizar times quando acabar minhas opções
para continuar jogando nas rodadas finais.

---

## 4. Regras automáticas

### Perder vida por empate
**Como sistema**
quero remover uma vida quando o time empatar
para aplicar as regras.

### Perder vida por derrota
**Como sistema**
quero remover uma vida quando o time perder
para aplicar as regras.

### Aplicar danilada
**Como sistema**
quero remover uma vida automaticamente quando o jogador não escolher
para aplicar a penalidade.

### Aplicar penalidade por repetição
**Como sistema**
quero remover uma vida em repetições forçadas
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
1. vidas
2. empate
3. derrota
4. repetição
5. danilada
6. saldo de gols
7. gols pró

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

