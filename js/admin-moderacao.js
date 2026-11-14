const usuario = protegerPagina("admin");
const filtroStatus = document.getElementById("filtro-status");
const tabela = document.getElementById("tabela-campanhas");

filtroStatus.value = pegarParametro("status") || "";

function mudarStatusCampanha(id, status) {
  const campanhas = pegarCampanhas();
  buscarPorId(campanhas, id).status = status;
  salvar("campanhas", campanhas);
  location.reload();
}

function excluirCampanha(id) {
  if (!confirm("Deseja excluir esta campanha?")) {
    return;
  }
  const campanhas = pegarCampanhas();
  const restantes = [];
  for (let i = 0; i < campanhas.length; i++) {
    if (campanhas[i].id !== id) {
      restantes.push(campanhas[i]);
    }
  }
  salvar("campanhas", restantes);
  location.reload();
}

const campanhas = pegarCampanhas();
for (let i = 0; i < campanhas.length; i++) {
  const campanha = campanhas[i];
  if (filtroStatus.value !== "" && campanha.status !== filtroStatus.value) {
    continue;
  }
  let botoes = "";
  if (campanha.status === "pendente") {
    botoes += `<button class="botao botao-pequeno" onclick="mudarStatusCampanha(${campanha.id}, 'ativa')">Aprovar</button>`;
    botoes += `<button class="botao botao-contorno botao-pequeno" onclick="mudarStatusCampanha(${campanha.id}, 'recusada')">Recusar</button>`;
  }
  if (campanha.status === "ativa") {
    botoes += `<button class="botao botao-contorno botao-pequeno" onclick="mudarStatusCampanha(${campanha.id}, 'encerrada')">Encerrar</button>`;
  }
  botoes += `<button class="botao botao-perigo botao-pequeno" onclick="excluirCampanha(${campanha.id})">Excluir</button>`;
  tabela.innerHTML += `
    <tr>
      <td><strong>${campanha.titulo}</strong><br><span class="texto-suave">${campanha.tipo} · ${campanha.cidade}</span></td>
      <td>${nomeOrigem(campanha)}</td>
      <td>${seloStatus(campanha.status)}</td>
      <td><div class="acoes">${botoes}</div></td>
    </tr>
  `;
}

if (tabela.innerHTML === "") {
  tabela.innerHTML = '<tr><td colspan="4" class="vazio">Nenhuma campanha encontrada.</td></tr>';
}
