const usuario = protegerPagina("doador");
const todasEntidades = entidadesAprovadas();
const campoItem = document.getElementById("busca-item");
const campoCidade = document.getElementById("busca-cidade");
const campoCausa = document.getElementById("busca-causa");

campoItem.value = pegarParametro("item") || "";
campoCidade.value = pegarParametro("cidade") || "";
campoCausa.value = pegarParametro("causa") || "";

const termo = campoItem.value.trim();
const cidade = campoCidade.value;
const causa = campoCausa.value;

function contem(texto, procurado) {
  return texto.toLowerCase().indexOf(procurado.toLowerCase()) !== -1;
}

function mostrarCampanhas() {
  const campanhas = campanhasAtivas();
  const area = document.getElementById("resultado-campanhas");

  for (let i = 0; i < campanhas.length; i++) {
    const campanha = campanhas[i];
    if (cidade !== "" && campanha.cidade !== cidade) {
      continue;
    }
    if (causa !== "" && campanha.entidadeId !== 0 && buscarPorId(todasEntidades, campanha.entidadeId).causa !== causa) {
      continue;
    }
    if (termo !== "" && !contem(campanha.itens + " " + campanha.titulo + " " + campanha.tipo, termo)) {
      continue;
    }

    let selo = "";
    let botao = `<a href="doador-mapa.html?cidade=${encodeURIComponent(campanha.cidade)}" class="botao botao-contorno botao-pequeno">Ver pontos de coleta</a>`;
    if (campanha.nivel !== "") {
      selo = seloNivel(campanha.nivel);
    }
    if (campanha.entidadeId !== 0) {
      botao = `<a href="doador-doar.html?id=${campanha.entidadeId}" class="botao botao-pequeno">Doar para esta campanha</a>`;
    }

    area.innerHTML += `
      <article class="cartao">
        <div class="cartao-topo">
          <h3 class="cartao-titulo">${campanha.titulo}</h3>
          ${selo}
        </div>
        <p class="texto-suave">${campanha.tipo} · ${campanha.cidade} · por ${nomeOrigem(campanha)}</p>
        <p>${campanha.descricao}</p>
        <p class="texto-suave"><strong>Precisa de:</strong> ${campanha.itens}</p>
        <div class="cartao-botoes">${botao}</div>
      </article>
    `;
  }

  if (area.innerHTML === "") {
    area.innerHTML = '<p class="vazio">Nenhuma campanha encontrada.</p>';
  }
}

function mostrarEntidades() {
  const tabela = document.getElementById("resultado-entidades");

  for (let i = 0; i < todasEntidades.length; i++) {
    const entidade = todasEntidades[i];
    if (cidade !== "" && entidade.cidade !== cidade) {
      continue;
    }
    if (causa !== "" && entidade.causa !== causa) {
      continue;
    }

    const necessidades = necessidadesDaEntidade(entidade.id);
    let itens = "";
    for (let j = 0; j < necessidades.length; j++) {
      if (termo === "" || contem(necessidades[j].item, termo)) {
        itens += `<li><span>${necessidades[j].item}</span>${seloPrioridade(necessidades[j].prioridade)}</li>`;
      }
    }
    if (termo !== "" && itens === "") {
      continue;
    }
    if (itens === "") {
      itens = '<li class="vazio">Nenhuma necessidade publicada.</li>';
    }

    tabela.innerHTML += `
      <tr>
        <td><a href="instituicao.html?id=${entidade.id}" class="cartao-titulo">${entidade.nome}</a><br><span class="texto-suave">${entidade.causa}</span></td>
        <td>${entidade.cidade}</td>
        <td><ul class="lista-necessidades">${itens}</ul></td>
        <td>
          <div class="acoes">
            <a href="doador-doar.html?id=${entidade.id}" class="botao botao-pequeno">Quero doar</a>
            <a href="instituicao.html?id=${entidade.id}" class="botao botao-contorno botao-pequeno">Levar ao local</a>
          </div>
        </td>
      </tr>
    `;
  }

  if (tabela.innerHTML === "") {
    tabela.innerHTML = '<tr><td colspan="4" class="vazio">Nenhuma entidade encontrada.</td></tr>';
  }
}

mostrarCampanhas();
mostrarEntidades();
