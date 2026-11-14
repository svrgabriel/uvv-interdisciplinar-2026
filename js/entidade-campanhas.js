const usuario = protegerPagina("entidade");
const formCampanha = document.getElementById("form-campanha");
const minhaEntidade = buscarPorId(pegarEntidades(), usuario.entidadeId);

document.getElementById("cidade").value = minhaEntidade.cidade;

function listarCampanhas() {
  const campanhas = pegarCampanhas();
  const area = document.getElementById("lista-campanhas");
  area.innerHTML = "";

  for (let i = campanhas.length - 1; i >= 0; i--) {
    const campanha = campanhas[i];
    if (campanha.entidadeId !== usuario.entidadeId) {
      continue;
    }
    let botaoEncerrar = "";
    if (campanha.status === "ativa") {
      botaoEncerrar = `<button class="botao botao-contorno botao-pequeno" onclick="encerrarCampanha(${campanha.id})">Encerrar</button>`;
    }
    area.innerHTML += `
      <article class="cartao">
        <div class="cartao-topo">
          <h3 class="cartao-titulo">${campanha.titulo}</h3>
          ${seloStatus(campanha.status)}
        </div>
        <p class="texto-suave">${campanha.tipo} · ${campanha.cidade}</p>
        <p>${campanha.descricao}</p>
        <p class="texto-suave"><strong>Precisa de:</strong> ${campanha.itens}</p>
        <div class="cartao-botoes">
          ${botaoEncerrar}
          <button class="botao botao-perigo botao-pequeno" onclick="excluirCampanha(${campanha.id})">Excluir</button>
        </div>
      </article>
    `;
  }

  if (area.innerHTML === "") {
    area.innerHTML = '<p class="vazio">Nenhuma campanha criada ainda.</p>';
  }
}

function encerrarCampanha(id) {
  const campanhas = pegarCampanhas();
  buscarPorId(campanhas, id).status = "encerrada";
  salvar("campanhas", campanhas);
  listarCampanhas();
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
  listarCampanhas();
}

formCampanha.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const campanhas = pegarCampanhas();
  campanhas.push({
    id: novoId(campanhas),
    titulo: document.getElementById("titulo").value.trim(),
    tipo: document.getElementById("tipo").value,
    cidade: document.getElementById("cidade").value.trim(),
    descricao: document.getElementById("descricao").value.trim(),
    itens: document.getElementById("itens").value.trim(),
    nivel: "",
    entidadeId: usuario.entidadeId,
    status: "pendente"
  });
  salvar("campanhas", campanhas);
  formCampanha.reset();
  document.getElementById("cidade").value = minhaEntidade.cidade;
  document.getElementById("mensagem-campanha").textContent = "Campanha enviada! Ela aparece para os doadores depois da aprovação do administrador.";
  listarCampanhas();
});

listarCampanhas();
