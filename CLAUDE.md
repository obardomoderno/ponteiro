# Instruções para o Claude

Este repositório hospeda o **Ponteiro**, o app pessoal do dono (GitHub Pages): https://obardomoderno.github.io/ponteiro/

É um app só, com cinco abas, nesta ordem: **Tempo** (cronômetro, histórico, gráficos, atividades), **Diário**, **Semana** (planejamento com duração e horários fixos), **Ações** (cadastro das ações diárias) e **Ajustes**.

Por dentro, a raiz (`index.html`) é só a moldura com as abas. Ela carrega dois módulos em iframes com `?embed=1`, que conversam por `postMessage` e pelo `localStorage` (mesma origem):

- `tempo/`: o cronômetro (antes ficava na raiz). Também abre sozinho em https://obardomoderno.github.io/ponteiro/tempo/
- `semana/`: diário e plano da semana (a aba Hábitos dele só aparece quando aberto sozinho; no app único os hábitos viraram Ações). Também abre sozinho em https://obardomoderno.github.io/ponteiro/semana/
- `diario/`: app antigo, mantido só para quem ainda o usa. Os registros dele são trazidos para o diário da Semana automaticamente (ids `d-<id>`).

Ligações entre os módulos:

- O Tempo grava em `localStorage["hub.tempo"]` o tempo registrado por dia (`AAAA-MM-DD`) e por nome de atividade em minúsculas (pastas somam as de dentro), além das atividades rodando. A Semana mostra isso em cada item do plano e no resumo da semana.
- As **Ações** (o que se pratica todo dia, singulares como "Beber água" ou grupos com itens como "Banho") moram no Tempo. Não são cronometradas sozinhas: são incluídas dentro de uma atividade que está rodando (`running[].acts` = ids das ações), onde os itens são marcados. Também aparecem como chips no Diário de cada dia. `hub.tempo` também leva `acts` (lista) e `ad` (por dia: `[itens marcados, feita 0/1, ids marcados]`); o Diário marca pelo `postMessage` `{hub:"act"|"step"}`.
- O botão ▶ de um item de hoje na Semana inicia no Tempo a atividade com o mesmo nome (cria uma se não existir).
- A Cópia no GitHub ativada nos Ajustes vale para os dois módulos.

## Onde estão os dados

Os apps não guardam dados aqui. Quando a "Cópia no GitHub" está ativada, cada app envia o próprio estado para o repositório **privado** `obardomoderno/meus-dados`:

- `ponteiro.json`
- `diario.json`
- `semana.json`

Quando o dono mandar os links dos apps e perguntar o que fez, o que está fazendo ou como está a vida dele:

1. Anexe `obardomoderno/meus-dados` (add_repo, leitura) e clone.
2. Leia os arquivos. Use `updatedAt` para dizer até quando os dados vão.
3. Responda em português, com horários no fuso America/Manaus (UTC-4).

Se o repositório não existir ou não estiver acessível, a cópia ainda não foi ativada. Nesse caso, peça o backup exportado pelo app (Ajustes → Backup).

## Formato

Os arquivos seguem `{ "app": "...", "updatedAt": "<ISO>", "data": { ... } }`. Horários são milissegundos Unix.

### ponteiro.json → `data`

- `types`: atividades `{ id, name, icon, color, order, archived, system }`. Ignore as que têm `system: true` (tipo interno "Diário").
- Ações diárias são `types` com `act: true` e `steps: [ { id, text } ]` (vazio = ação singular, com itens = grupo). Não aparecem em Começar nem em Atividades e não acumulam tempo próprio.
- `running`: atividades em andamento `{ id, typeId, state: "running" | "paused", since, started, comment }`. O trecho atual vai de `since` até agora.
- `L`: histórico agrupado por mês (`"log-AAAA-MM": [ ... ]`). Os itens **sem** `kind` são intervalos de tempo `{ id, typeId, start, end, comment, run? }`. Os itens com `kind: "done"` dizem o que foi feito de cada ação no dia: `{ id, kind: "done", typeId, start, steps: [ids dos itens marcados], in? }`, um por ação por dia; `in` é a atividade rodando em que foi marcada. Uma ação singular está feita se o registro existe; um grupo, se todos os itens estão em `steps`. Ignore os outros valores de `kind` (recursos antigos removidos).
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
