# Ponteiro no GitHub Pages

Registrador de tempo instalável no iPhone e no Mac. É hospedado de graça pelo GitHub Pages, abre sem internet e sincroniza entre aparelhos usando um gist secreto e criptografado na sua conta do GitHub.

## Arquivos

```
index.html             o app
sw.js                  guarda o app no aparelho para abrir offline
manifest.webmanifest   instalação como app (nome, ícone, tela cheia)
*.png                  ícones 180, 192 e 512 px
```

## 1. Publicar (5 minutos)

1. No GitHub, crie um repositório **público** chamado `ponteiro`. No plano gratuito, o GitHub Pages só funciona com repositório público. Seus dados **não** ficam no repositório: eles vão para um gist secreto e criptografado.
2. No repositório: **Add file → Upload files**. Arraste **o conteúdo** desta pasta (`index.html`, `sw.js`, `manifest.webmanifest` e os três `.png`) e confirme em **Commit changes**.
3. Vá em **Settings → Pages**. Em *Build and deployment*, escolha **Deploy from a branch**, branch **main**, pasta **/ (root)** e clique em **Save**.
4. Em 1 ou 2 minutos o app estará em `https://SEU-USUARIO.github.io/ponteiro/`.

## 2. Instalar

- **iPhone:** abra o endereço no **Safari** e toque em **Compartilhar → Adicionar à Tela de Início**. Pelo ícone, ele abre em tela cheia, mesmo sem internet depois da primeira visita.
- **Mac:** no Safari, use **Arquivo → Adicionar ao Dock**. No Chrome, use o ícone de instalar na barra de endereço.

## 3. Sincronizar iPhone e Mac

### Criar o token (uma vez)

1. Abra <https://github.com/settings/personal-access-tokens/new> (fine-grained token).
2. Dê um nome, como `Ponteiro`, e escolha a validade mais longa que aparecer.
3. Em **Repository access**, deixe **Public repositories**. O app não mexe em repositórios.
4. Em **Permissions → Account permissions → Gists**, escolha **Read and write**.
5. Clique em **Generate token** e copie o token, que começa com `github_pat_`.

### Ativar

1. No **primeiro aparelho**, vá em **Mais → Sincronização → Ativar**. Cole o token e crie uma **senha dos dados** com 8 caracteres ou mais. O app cria o gist secreto e envia os dados desse aparelho, criptografados.
2. No **segundo aparelho**, há dois jeitos:
   - Mais fácil: no primeiro aparelho, vá em **Mais → Código de conexão → Copiar** e, no segundo, cole esse código em **Ativar**. Do Mac para o iPhone, o "copiar e colar" passa sozinho se os dois usam o mesmo Apple ID.
   - Ou cole o mesmo token e digite a mesma senha.

O segundo aparelho passa a usar os dados sincronizados, e o que havia nele antes é substituído.

A etiqueta no topo mostra o estado: **Sincronizado**, **Salvando…**, **Offline · N pendentes** ou **Só neste aparelho**.

- **Offline:** use normalmente. As mudanças sobem quando a conexão volta, e o histórico dos aparelhos é mesclado.
- **Tipos, grupos e ajustes:** vale a última alteração enviada.
- **Atualização:** com o app aberto, ele busca novidades a cada 30 segundos, além de quando volta para a tela ou reconecta.

### Segurança

- **Criptografia:** cada arquivo do gist é criptografado no aparelho, com AES-256 e uma chave derivada da sua senha. Nem o GitHub nem quem achar o gist consegue ler o conteúdo.
- **Token:** fica salvo só nos seus aparelhos. Com a permissão acima, ele só mexe nos seus gists.
- **Código de conexão:** contém o token e a chave. Trate-o como uma senha.
- **Se esquecer a senha:** os dados no gist ficam ilegíveis. A cópia em cada aparelho continua lá: exporte um backup em **Mais → Backup completo**.
- **Se o token expirar:** gere outro e ative de novo em cada aparelho, com a mesma senha.

## 4. Trazer seus dados atuais

Na versão anterior (artifact do Claude ou Netlify): **Mais → Backup completo → Exportar**. No app novo: **Mais → Importar → Escolher arquivo**.

## Atualizar o app depois

Envie os arquivos novos para o repositório. Quem já instalou recebe a versão nova na próxima abertura com internet. Ao mudar o `sw.js`, aumente o número em `VERSION` (`ponteiro-v2`, …).
