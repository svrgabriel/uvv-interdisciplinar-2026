const usuario = protegerPagina("admin");
const filtroStatus = document.getElementById("filtro-status");

function mudarStatusCampanha(id, status) {
  const campanhas = pegarCampanhas();
  buscarPorId(campanhas, id).status = status;
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

function listarCampanhas() {
  const campanhas = pegarCampanhas();
  const tabela = document.getElementById("tabela-campanhas");
  const status = filtroStatus.value;
  tabela.innerHTML = "";

  for (let i = 0; i < campanhas.length; i++) {
    const campanha = campanhas[i];
    if (status !== "" && campanha.status !== status) {
      continue;
    }

    let botoes = "";
    if (campanha.status === "pendente") {
      botoes += `<button class="botao botao-pequeno" onclick="mudarStatusCampanha(${campanha.id}, 'ativa')">Aprovar</button>`;
      botoes += `<button class="botao botao-contorno botao-pequeno" onclick="mudarStatusCampanha(${campanha.id}, 'recusada')">Recusar</button>`;
    } else if (campanha.status === "ativa") {
      botoes += `<button class="botao botao-contorno botao-pequeno" onclick="mudarStatusCampanha(${campanha.id}, 'encerrada')">Encerrar</button>`;
    } else {
      botoes += `<button class="botao botao-contorno botao-pequeno" onclick="mudarStatusCampanha(${campanha.id}, 'ativa')">Reativar</button>`;
    }
    botoes += `<button class="botao botao-perigo botao-pequeno" onclick="excluirCampanha(${campanha.id})">Excluir</button>`;

    tabela.innerHTML += `
      <tr>
        <td><strong>${campanha.titulo}</strong><br><span class="texto-suave">${campanha.itens}</span></td>
        <td>${nomeOrigem(campanha)}</td>
        <td>${campanha.cidade}</td>
        <td>${campanha.tipo}</td>
        <td>${seloStatus(campanha.status)}</td>
        <td><div class="cartao-botoes">${botoes}</div></td>
      </tr>
    `;
  }

  if (tabela.innerHTML === "") {
    tabela.innerHTML = '<tr><td colspan="6" class="vazio">Nenhuma campanha encontrada.</td></tr>';
  }
}

filtroStatus.addEventListener("change", listarCampanhas);
listarCampanhas();
