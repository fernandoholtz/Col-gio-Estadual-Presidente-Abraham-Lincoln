# Site Institucional — Colégio Estadual Presidente Abraham Lincoln

Projeto estático pronto para Visual Studio Code e GitHub Pages.

## Tecnologias
- HTML5
- CSS3
- JavaScript puro
- Sem frameworks e sem dependências externas

## Estrutura
```text
site-abraham-lincoln/
├─ index.html
├─ escola.html
├─ projetos.html
├─ alunos.html
├─ galeria.html
├─ assets/
│  ├─ css/
│  │  └─ style.css
│  ├─ js/
│  │  └─ main.js
│  └─ images/
└─ README.md
```

## Abrir no Visual Studio Code
1. Extraia o arquivo ZIP.
2. Abra a pasta `site-abraham-lincoln` no VS Code.
3. Abra `index.html`.
4. Para visualizar, você pode usar a extensão **Live Server** ou simplesmente abrir `index.html` no navegador.

## Publicar no GitHub Pages
1. Crie um repositório no GitHub.
2. Envie **todo o conteúdo da pasta** para a raiz do repositório.
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/ (root)`.
6. Salve. O GitHub exibirá o endereço público do site após a publicação.

## Onde editar
- Textos e estrutura: arquivos `.html`
- Aparência: `assets/css/style.css`
- Menu mobile, filtros e galeria: `assets/js/main.js`
- Fotos: `assets/images/`

## Observações
- A lista de alunos foi deixada em uma página própria para facilitar futuras atualizações.
- As informações de contato institucional não foram inventadas; podem ser adicionadas quando a escola fornecer telefone, e-mail e redes oficiais.
- As fotos dos orientadores foram recortadas e padronizadas para uso no layout, mantendo as imagens originais.

## Atualizações da versão 2
- A foto principal foi substituída por um enquadramento frontal da escola e reposicionada para manter fachada, portão e nome visíveis.
- Emojis visuais foram substituídos por ícones SVG institucionais armazenados em `assets/icons/`.
- Os cards dos professores agora detalham suas áreas de atuação.
- Foram criados campos de contato profissional:
  - Henrique: WhatsApp (aguardando número).
  - Fernando: LinkedIn (aguardando URL).
- A página de alunos foi preparada para receber novas turmas em blocos separados.

### Como inserir os contatos quando forem enviados
No `index.html`, procure por `WhatsApp — número será adicionado` e `LinkedIn — link será adicionado`.

Para WhatsApp, o formato recomendado será:
```html
<a class="contact-link" href="https://wa.me/55DDDNUMERO" target="_blank" rel="noopener noreferrer">WhatsApp</a>
```

Para LinkedIn:
```html
<a class="contact-link" href="https://www.linkedin.com/in/USUARIO/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
```


## Atualizações da versão 3
- Foto de Fernando Holtz Ventura substituída pela nova foto profissional enviada.
- Contatos profissionais ativados:
  - Henrique Pereira Costa: WhatsApp +55 41 9983-8592.
  - Fernando Holtz Ventura: celular +55 41 98790-2852 e LinkedIn profissional.
- Página de alunos separada em 3ª série e 2ª série.
- Página de projetos ampliada a partir do conteúdo do banner acadêmico e do arquivo de alterações.
- Metodologia diferencia explicitamente o experimento escolar da pesquisa científica de referência.
- ODS corrigidos segundo a nomenclatura da ONU: ODS 1 e ODS 4 são objetivos diferentes.
- Seção de práticas empresariais usa fontes oficiais e evita tratar “TI Verde” como um selo único ou lista oficial.
- Nota acadêmica esclarece que os resultados do protótipo são experimentais e dependem das condições da montagem.


## Atualizações da versão 4
- Fotos dos professores ajustadas com enquadramento mais profissional e uniforme.
- Cards dos orientadores redesenhados para melhorar leitura e aparência no desktop e no celular.
- Contatos do Fernando reforçados com três ações: ligar, WhatsApp e LinkedIn.
- Contatos do Henrique reforçados com WhatsApp e ligação direta.
- A seção-resumo da página de alunos foi atualizada com informações mais relevantes.
- Removida a frase “Lista atualmente cadastrada no site”.
- Melhorias adicionais de responsividade para uso a partir de QR Code em celulares.
