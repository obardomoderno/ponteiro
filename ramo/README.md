# Ramo

Projetos com tarefas dentro de tarefas, cronômetro com nota por sessão, modelos e relatório em TXT.

Endereço: **https://obardomoderno.github.io/ponteiro/ramo/**

## Arquivos

```
index.html             o app inteiro
sw.js                  guarda o app no aparelho para abrir sem internet
manifest.webmanifest   instalação como app (nome, ícone, tela cheia)
*.png                  ícones 180, 192 e 512 px
```

## Instalar

- **iPhone:** abra o endereço no **Safari** e toque em **Compartilhar → Adicionar à Tela de Início**.
- **Android:** no Chrome, menu **⋮ → Instalar app** (ou "Adicionar à tela inicial").
- **Computador:** no Chrome ou Edge, use o ícone de instalar na barra de endereço. No Safari do Mac, **Arquivo → Adicionar ao Dock**.

Depois da primeira visita com internet, o app abre mesmo sem conexão.

## Sincronizar entre aparelhos

Os dados ficam no aparelho e, com a sincronização ativada, também no arquivo `ramo.json` do repositório **privado** `obardomoderno/meus-dados`. Nada de dados vai para este repositório, que é público.

### 1. Criar a chave do GitHub (uma vez)

Se o Ponteiro já usa uma chave com acesso ao `meus-dados`, o Ramo a encontra sozinho neste mesmo endereço e você pode pular este passo.

1. Abra <https://github.com/settings/personal-access-tokens/new> (fine-grained token).
2. Dê um nome, como `Ramo`, e escolha a validade mais longa disponível.
3. Em **Repository access**, escolha **Only select repositories** e marque `meus-dados`.
4. Em **Permissions → Repository permissions → Contents**, escolha **Read and write**.
5. Clique em **Generate token** e copie a chave, que começa com `github_pat_`.

### 2. Ativar em cada aparelho

1. Abra o app e toque na etiqueta **Só neste aparelho**: na Visão geral ou no rodapé da barra lateral. Ela também está em **Exportar → Sincronização**.
2. Confira o repositório (`obardomoderno/meus-dados`), cole a chave e toque em **Ativar**.
3. No primeiro aparelho, os dados dele são enviados. Nos outros, escolha **Usar os sincronizados**, que troca o que está no aparelho pelos dados da nuvem. **Juntar** mistura os dois.

A etiqueta mostra o estado: **Sincronizado · hora**, **Salvando…**, **Sincronizando…**, **Offline · alterações salvas aqui** ou o erro do GitHub.

### Como funciona

- **Offline:** use normalmente. Tudo fica salvo no aparelho e sobe quando a conexão volta.
- **Atualização:** com o app aberto, ele busca novidades a cada 30 segundos, ao voltar para a tela e ao reconectar.
- **Mesclagem:** cada projeto, tarefa e modelo guarda a hora da última alteração. Se dois aparelhos mexerem em coisas diferentes, as duas mudanças ficam. Se mexerem na mesma tarefa, vale a alteração mais recente.
- **Cronômetro:** ligado em um aparelho, aparece nos outros. Pode pausar de qualquer um.
- **Apagar todos os dados:** com a sincronização ativa, apaga em todos os aparelhos (os modelos ficam).
- **Chave:** fica salva só no aparelho. Se ela expirar, crie outra e ative de novo em cada aparelho.

## Trazer os dados da versão em arquivo

No arquivo `ramo.html` antigo: **Exportar → Backup para restaurar (JSON)**. No app novo: **Exportar → Importar backup…** e escolha o arquivo. Faça isso no primeiro aparelho antes de ativar a sincronização. O "Projeto de exemplo" pode ser excluído pelo menu ⋯ do projeto.

## Atualizar o app

Envie o `index.html` novo para esta pasta. Com internet, os aparelhos já abrem a versão nova. Ao mudar o `sw.js`, aumente o número em `VERSION`.
