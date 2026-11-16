const usuario = protegerPagina("defesacivil");
const formEmergencia = document.getElementById("form-emergencia");
const tabela = document.getElementById("tabela-emergencias");

function mudarCampanha(id, status) {
  const campanhas = pegarCampanhas();
  buscarPorId(campanhas, id).status = status;
  salvar("campanhas", campanhas);
  window.location.href = "dc-campanhas.html";
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
  window.location.href = "dc-campanhas.html";
}

const minhas = [];
const campanhas = pegarCampanhas();
for (let i = campanhas.length - 1; i >= 0; i--) {
  const campanha = campanhas[i];
  if (campanha.entidadeId !== 0) {
    continue;
  }
  minhas.push(campanha);
  let botaoStatus = `<button class="botao botao-contorno botao-pequeno" onclick="mudarCampanha(${campanha.id}, 'encerrada')">Encerrar</button>`;
  if (campanha.status !== "ativa") {
    botaoStatus = `<button class="botao botao-contorno botao-pequeno" onclick="mudarCampanha(${campanha.id}, 'ativa')">Reabrir</button>`;
  }
  tabela.innerHTML += `
    <tr>
      <td><strong>${campanha.titulo}</strong><br><span class="texto-suave">${campanha.tipo} · ${campanha.cidade}</span></td>
      <td>${seloNivel(campanha.nivel)}</td>
      <td>${seloStatus(campanha.status)}</td>
      <td>
        <div class="acoes">
          <a href="dc-campanhas.html?editar=${campanha.id}" class="botao botao-contorno botao-pequeno">Editar</a>
          ${botaoStatus}
          <button class="botao botao-perigo botao-pequeno" onclick="excluirCampanha(${campanha.id})">Excluir</button>
        </div>
      </td>
    </tr>
  `;
}
if (minhas.length === 0) {
  tabela.innerHTML = '<tr><td colspan="4" class="vazio">Nenhuma campanha emergencial aberta.</td></tr>';
}

const campos = ["titulo", "tipo", "nivel", "cidade", "itens", "descricao"];
const emEdicao = buscarPorId(minhas, Number(pegarParametro("editar")));
if (emEdicao !== null) {
  document.getElementById("titulo-form").textContent = "Editar campanha";
  document.getElementById("id-campanha").value = emEdicao.id;
  for (let i = 0; i < campos.length; i++) {
    document.getElementById(campos[i]).value = emEdicao[campos[i]];
  }
}

formEmergencia.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const lista = pegarCampanhas();
  const id = Number(document.getElementById("id-campanha").value);
  let campanha = buscarPorId(lista, id);
  if (campanha === null) {
    campanha = { id: novoId(lista), entidadeId: 0, status: "ativa" };
    lista.push(campanha);
  }
  for (let i = 0; i < campos.length; i++) {
    campanha[campos[i]] = document.getElementById(campos[i]).value.trim();
  }
  salvar("campanhas", lista);
  window.location.href = "dc-campanhas.html";
});
