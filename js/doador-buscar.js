const usuario = protegerPagina("doador");
const todasEntidades = entidadesAprovadas();
const campoItem = document.getElementById("busca-item");
const campoCidade = document.getElementById("busca-cidade");
const campoCausa = document.getElementById("busca-causa");

preencherCidades("busca-cidade", todasEntidades);

const causas = [];
for (let i = 0; i < todasEntidades.length; i++) {
  if (causas.indexOf(todasEntidades[i].causa) === -1) {
    causas.push(todasEntidades[i].causa);
  }
}
causas.sort();
for (let i = 0; i < causas.length; i++) {
  campoCausa.innerHTML += `<option value="${causas[i]}">${causas[i]}</option>`;
}

const cidadeDaUrl = pegarParametro("cidade");
if (cidadeDaUrl !== null) {
  campoCidade.value = cidadeDaUrl;
}

function contem(texto, termo) {
  return texto.toLowerCase().indexOf(termo.toLowerCase()) !== -1;
}

function mostrarCampanhas() {
  const termo = campoItem.value.trim();
  const cidade = campoCidade.value;
  const campanhas = campanhasAtivas();
  const area = document.getElementById("resultado-campanhas");
  area.innerHTML = "";

  for (let i = 0; i < campanhas.length; i++) {
    const campanha = campanhas[i];
    if (cidade !== "" && campanha.cidade !== cidade) {
      continue;
    }
    if (termo !== "" && !contem(campanha.itens + " " + campanha.titulo + " " + campanha.tipo, termo)) {
      continue;
    }

    let selo = "";
    let botao = `<a href="doador-mapa.html?cidade=${campanha.cidade}" class="botao botao-contorno botao-pequeno">Ver pontos de coleta</a>`;
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
  const termo = campoItem.value.trim();
  const cidade = campoCidade.value;
  const causa = campoCausa.value;
  const area = document.getElementById("resultado-entidades");
  area.innerHTML = "";

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
      itens = '<li class="vazio">Nenhuma necessidade publicada ainda.</li>';
    }

    area.innerHTML += `
      <article class="cartao">
        <div class="cartao-topo">
          <div>
            <a href="instituicao.html?id=${entidade.id}" class="cartao-titulo">${entidade.nome}</a>
            <p class="texto-suave">${entidade.causa} · ${entidade.cidade}</p>
          </div>
        </div>
        <ul class="lista-necessidades">${itens}</ul>
        <div class="cartao-botoes">
          <a href="doador-doar.html?id=${entidade.id}" class="botao botao-pequeno">Quero doar</a>
          <a href="instituicao.html?id=${entidade.id}" class="botao botao-contorno botao-pequeno">Levar ao local</a>
        </div>
      </article>
    `;
  }

  if (area.innerHTML === "") {
    area.innerHTML = '<p class="vazio">Nenhuma entidade precisa disso no momento.</p>';
  }
}

function buscar() {
  mostrarCampanhas();
  mostrarEntidades();
}

document.getElementById("form-busca").addEventListener("submit", function (evento) {
  evento.preventDefault();
});
campoItem.addEventListener("input", buscar);
campoCidade.addEventListener("change", buscar);
campoCausa.addEventListener("change", buscar);

buscar();
