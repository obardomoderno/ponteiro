# Instruções para o Claude

Este repositório hospeda dois apps pessoais do dono (GitHub Pages):

- **Ponteiro**: registro de tempo por atividade. https://obardomoderno.github.io/ponteiro/
- **Diário**: registros escritos com grupos de hábitos. https://obardomoderno.github.io/ponteiro/diario/

## Onde estão os dados

Os apps não guardam dados aqui. Quando a "Cópia no GitHub" está ativada, cada app envia o próprio estado para o repositório **privado** `obardomoderno/meus-dados`:

- `ponteiro.json`
- `diario.json`

Quando o dono mandar os links dos apps e perguntar o que fez, o que está fazendo ou como está a vida dele:

1. Anexe `obardomoderno/meus-dados` (add_repo, leitura) e clone.
2. Leia os dois arquivos. Use `updatedAt` para dizer até quando os dados vão.
3. Responda em português, com horários no fuso America/Manaus (UTC-4).

Se o repositório não existir ou não estiver acessível, a cópia ainda não foi ativada. Nesse caso, peça o backup exportado pelo app (Ajustes → Backup).

## Formato

Os dois arquivos seguem `{ "app": "...", "updatedAt": "<ISO>", "data": { ... } }`. Horários são milissegundos Unix.

### ponteiro.json → `data`

- `types`: atividades `{ id, name, icon, color, order, archived, system }`. Ignore as que têm `system: true` (tipo interno "Diário").
- `running`: atividades em andamento `{ id, typeId, state: "running" | "paused", since, started, comment }`. O trecho atual vai de `since` até agora.
- `L`: histórico agrupado por mês (`"log-AAAA-MM": [ ... ]`). Os itens **sem** `kind` são intervalos de tempo `{ id, typeId, start, end, comment, run? }`. Ignore os que têm `kind` (registros antigos de recursos que foram removidos).
- `del`: ids apagados (lápides). Ignore.
- `settings.dayEndHour`: hora em que o "dia" do dono termina (ex.: 5 = o dia vai de 05:00 a 05:00).

### diario.json → `data`

- `entries`: registros `{ id, at, text, checks: [ { name, icon, items: [ { text, done } ] } ] }`. A porcentagem de cada grupo é a fração de `items` com `done: true`.
- `groups`: modelos de grupos de hábitos `{ id, name, icon, items: [ { id, text } ] }`.
- `settings.dayEndHour`: igual ao Ponteiro.

## Como ajudar

- Resuma por dia, respeitando `dayEndHour`: o que fez, quanto tempo foi em cada atividade e o que está rodando agora.
- Relacione o Diário com o Ponteiro: hábitos cumpridos e o que foi escrito nos mesmos dias.
- Os dados são pessoais. Não copie o conteúdo para este repositório, que é público.
