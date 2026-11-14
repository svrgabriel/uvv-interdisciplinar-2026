const usuario = protegerPagina("defesacivil");
const formEmergencia = document.getElementById("form-emergencia");
const campoId = document.getElementById("id-campanha");
const camposCampanha = ["titulo", "tipo", "nivel", "cidade", "itens", "descricao"];

function limparFormulario() {
  formEmergencia.reset();
  campoId.value = "";
  document.getElementById("titulo-form").textContent = "Nova campanha emergencial";
  document.getElementById("botao-salvar").textContent = "Abrir campanha";
  document.getElementById("botao-cancelar").hidden = true;
}

function listarEmergencias() {
  const campanhas = pegarCampanhas();
  const area = document.getElementById("lista-emergencias");
  area.innerHTML = "";

  for (let i = campanhas.length - 1; i >= 0; i--) {
    const campanha = campanhas[i];
    if (campanha.entidadeId !== 0) {
      continue;
    }
    let botaoStatus = `<button class="botao botao-contorno botao-pequeno" onclick="trocarStatus(${campanha.id})">Encerrar</button>`;
    if (campanha.status !== "ativa") {
      botaoStatus = `<button class="botao botao-contorno botao-pequeno" onclick="trocarStatus(${campanha.id})">Reabrir</button>`;
    }
    area.innerHTML += `
      <article class="cartao">
        <div class="cartao-topo">
          <h3 class="cartao-titulo">${campanha.titulo}</h3>
          ${seloStatus(campanha.status)}
        </div>
        <p class="texto-suave">${campanha.tipo} · ${campanha.cidade} · ${seloNivel(campanha.nivel)}</p>
        <p>${campanha.descricao}</p>
        <p class="texto-suave"><strong>Precisa de:</strong> ${campanha.itens}</p>
        <div class="cartao-botoes">
          <button class="botao botao-pequeno" onclick="editarCampanha(${campanha.id})">Editar</button>
          ${botaoStatus}
          <button class="botao botao-perigo botao-pequeno" onclick="excluirCampanha(${campanha.id})">Excluir</button>
        </div>
      </article>
    `;
  }

  if (area.innerHTML === "") {
    area.innerHTML = '<p class="vazio">Nenhuma campanha emergencial aberta.</p>';
  }
}

function editarCampanha(id) {
  const campanha = buscarPorId(pegarCampanhas(), id);
  campoId.value = campanha.id;
  for (let i = 0; i < camposCampanha.length; i++) {
    document.getElementById(camposCampanha[i]).value = campanha[camposCampanha[i]];
  }
  document.getElementById("titulo-form").textContent = "Editar campanha";
  document.getElementById("botao-salvar").textContent = "Salvar alterações";
  document.getElementById("botao-cancelar").hidden = false;
  document.getElementById("mensagem-emergencia").textContent = "";
  window.scrollTo(0, 0);
}

function trocarStatus(id) {
  const campanhas = pegarCampanhas();
  const campanha = buscarPorId(campanhas, id);
  if (campanha.status === "ativa") {
    campanha.status = "encerrada";
  } else {
    campanha.status = "ativa";
  }
  salvar("campanhas", campanhas);
  listarEmergencias();
}

function excluirCampanha(id) {
  if (!confirm("Deseja excluir esta campanha?")) {
    return;
  }
  const campanhas = pegarCampanhas();
  const novaLista = [];
  for (let i = 0; i < campanhas.length; i++) {
    if (campanhas[i].id !== id) {
      novaLista.push(campanhas[i]);
    }
  }
  salvar("campanhas", novaLista);
  limparFormulario();
  listarEmergencias();
}

formEmergencia.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const campanhas = pegarCampanhas();
  let campanha;

  if (campoId.value === "") {
    campanha = { id: novoId(campanhas), entidadeId: 0, status: "ativa" };
    campanhas.push(campanha);
    document.getElementById("mensagem-emergencia").textContent = "Campanha aberta e visível para os doadores!";
  } else {
    campanha = buscarPorId(campanhas, Number(campoId.value));
    document.getElementById("mensagem-emergencia").textContent = "Campanha atualizada!";
  }

  for (let i = 0; i < camposCampanha.length; i++) {
    campanha[camposCampanha[i]] = document.getElementById(camposCampanha[i]).value.trim();
  }

  salvar("campanhas", campanhas);
  formEmergencia.reset();
  campoId.value = "";
  document.getElementById("titulo-form").textContent = "Nova campanha emergencial";
  document.getElementById("botao-salvar").textContent = "Abrir campanha";
  document.getElementById("botao-cancelar").hidden = true;
  listarEmergencias();
});

listarEmergencias();
