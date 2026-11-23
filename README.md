# DoeUVV - Plataforma Web de Doações e Solidariedade

Projeto do Desafio Interdisciplinar 2026 (Desenvolvimento de Software para Web - UVV).

O DoeUVV conecta pessoas que querem doar a entidades e campanhas emergenciais que precisam de doações. Feito apenas com HTML, CSS e JavaScript puros. O HTML cuida da estrutura, das tabelas, dos formulários (com validação própria do HTML) e das buscas e filtros (formulários `method="get"`). O CSS cuida do layout com flexbox, do menu mobile e do tema escuro automático. O JavaScript só é usado para o login e para ler e salvar os dados no `localStorage` do navegador.

## Como abrir

Abra o arquivo `index.html` no navegador ou acesse a versão publicada no GitHub Pages.

## Usuários para teste

| Perfil | Usuário | Senha |
| --- | --- | --- |
| Doador | doador | doa#2026 |
| Entidade | entidade | ent!2026 |
| Defesa Civil | defesacivil | dc$-2026 |
| Administrador | admin | adm@2026 |

## Telas

Públicas
- `index.html` - apresentação da plataforma, como funciona, campanhas e entidades em destaque
- `login.html` - login
- `cadastro.html` - cadastro de doador, Defesa Civil ou entidade (o tipo é escolhido no próprio formulário)
- `instituicao.html` - página pública da entidade com mapa

Doador
- `doador-buscar.html` - busca de necessidades e campanhas
- `doador-mapa.html` - mapa de pontos de coleta
- `doador-doar.html` - registro de intenção de doação
- `doador-doacoes.html` - acompanhamento das doações

Entidade
- `entidade-necessidades.html` - CRUD de necessidades (criar, listar, editar e excluir)
- `entidade-campanhas.html` - divulgação de campanhas
- `entidade-recebimentos.html` - confirmação de recebimento e doação presencial
- `entidade-perfil.html` - edição do perfil

Defesa Civil
- `dc-painel.html` - painel de situação por região
- `dc-campanhas.html` - abertura de campanhas emergenciais
- `dc-pontos.html` - pontos de coleta por região

Administrador
- `admin-aprovacoes.html` - aprovação de entidades e de cadastros da Defesa Civil
- `admin-moderacao.html` - moderação de campanhas
- `admin-relatorios.html` - relatórios

## Estrutura

- `css/estilo.css` - todo o estilo do site
- `js/dados.js` - dados iniciais, login e funções usadas em todas as páginas
- `js/*.js` - um arquivo de JavaScript para cada página
- `img/` - imagens (fotos do Unsplash)

Para voltar aos dados iniciais, limpe o `localStorage` do navegador.
