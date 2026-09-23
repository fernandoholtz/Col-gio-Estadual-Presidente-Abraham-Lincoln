# Pesquisa e dúvidas do site

A interface da pesquisa já está instalada no site.

## Planilha de dados

Foi criada a planilha:

**Pesquisa do Site - Colégio Estadual Presidente Abraham Lincoln - 2026**

Ela contém:
- **Eventos** — visitas, abertura da pesquisa e dados técnicos mínimos.
- **Respostas** — respostas da pesquisa e dúvidas.
- **Resumo** — total de visitas, visitantes únicos aproximados, respostas, taxa de participação e nota média.

## Ativação do envio

1. Acesse https://script.google.com/ com a mesma conta Google da planilha.
2. Crie um **Novo projeto**.
3. Apague o código padrão e copie todo o conteúdo de `backend/pesquisa-site.gs`.
4. Clique em **Implantar > Nova implantação**.
5. Tipo: **Aplicativo da Web**.
6. Executar como: **Eu**.
7. Quem pode acessar: **Qualquer pessoa**.
8. Autorize o acesso solicitado pelo Google.
9. Copie a URL terminada em `/exec`.
10. No arquivo `site-abraham-lincoln-v4/assets/js/main.js`, substitua:

```js
const SURVEY_ENDPOINT = "";
```

por:

```js
const SURVEY_ENDPOINT = "SUA_URL_DO_APPS_SCRIPT";
```

Depois do commit, o site passa a registrar visitas e respostas automaticamente.

## Privacidade

A pesquisa não solicita nome, CPF ou telefone. O site gera um identificador aleatório no navegador para estimar visitantes únicos. Esse identificador não identifica diretamente a pessoa.
