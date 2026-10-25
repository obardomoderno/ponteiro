# Instruções para o Claude

Este repositório hospeda dois apps pessoais do dono (GitHub Pages):

- **Ponteiro**: registro de tempo por atividade. https://obardomoderno.github.io/ponteiro/
- **Diário**: registros escritos com grupos de hábitos. https://obardomoderno.github.io/ponteiro/diario/
- **Semana**: planejamento semanal com duração e horários fixos, hábitos por dia da semana e diário. https://obardomoderno.github.io/ponteiro/semana/

## Onde estão os dados

Os apps não guardam dados aqui. Quando a "Cópia no GitHub" está ativada, cada app envia o próprio estado para o repositório **privado** `obardomoderno/meus-dados`:

- `ponteiro.json`
- `diario.json`
- `semana.json`

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

### semana.json → `data`

- `days`: um objeto por data local `"AAAA-MM-DD": { items, mt }`. `mt` é a última alteração do dia (usado para mesclar aparelhos).
- `items`: atividades em ordem `{ id, name, dur, at, done, note }`. `dur` é a duração planejada em minutos (`null` = livre). `at` é o horário fixo `"HH:MM"` (`null` = calculado).
- Os horários das atividades sem `at` são calculados, nunca guardados: entre dois horários fixos, as atividades preenchem o intervalo (as livres dividem a sobra; se não houver livres, as durações são ajustadas proporcionalmente, ou só a última se `settings.fit` for `"last"`). Antes do primeiro horário fixo, conta-se para trás com as durações; depois do último, para frente. Um horário fixo menor que o anterior cai no dia seguinte. Dia sem horário fixo não tem horários.
- `settings`: `{ weekStart (1 = segunda, 0 = domingo), fit ("prop" | "last"), mt }`.
- `hab`: `{ list, mt }`. Cada hábito é `{ id, name, days, created }`: `days` são os dias da semana em que ele roda (0 = domingo … 6 = sábado) e `created` é a data `"AAAA-MM-DD"` a partir da qual ele conta.
- `jr`: diário, um objeto por data `"AAAA-MM-DD": { entries, mt }`. Cada registro é `{ id, at ("HH:MM"), text, habits }`, e `habits` são os ids dos hábitos marcados como feitos nele. Um hábito está feito no dia se aparece em qualquer registro daquela data.

## Como ajudar

- Resuma por dia, respeitando `dayEndHour`: o que fez, quanto tempo foi em cada atividade e o que está rodando agora.
- Relacione o Diário com o Ponteiro: hábitos cumpridos e o que foi escrito nos mesmos dias.
- Os dados são pessoais. Não copie o conteúdo para este repositório, que é público.
