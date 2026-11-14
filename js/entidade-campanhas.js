const usuario = protegerPagina("entidade");
const formCampanha = document.getElementById("form-campanha");
const tabela = document.getElementById("tabela-campanhas");

function mudarCampanha(id, status) {
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
  if (campanha.entidadeId !== usuario.entidadeId) {
    continue;
  }
  let encerrar = "";
  if (campanha.status === "ativa") {
    encerrar = `<button class="botao botao-contorno botao-pequeno" onclick="mudarCampanha(${campanha.id}, 'encerrada')">Encerrar</button>`;
  }
  tabela.innerHTML += `
    <tr>
      <td><strong>${campanha.titulo}</strong><br><span class="texto-suave">${campanha.cidade} · ${campanha.itens}</span></td>
      <td>${seloStatus(campanha.status)}</td>
      <td>
        <div class="acoes">
          ${encerrar}
          <button class="botao botao-perigo botao-pequeno" onclick="excluirCampanha(${campanha.id})">Excluir</button>
        </div>
      </td>
    </tr>
  `;
}
if (tabela.innerHTML === "") {
  tabela.innerHTML = '<tr><td colspan="3" class="vazio">Nenhuma campanha criada ainda.</td></tr>';
}

formCampanha.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const lista = pegarCampanhas();
  lista.push({
    id: novoId(lista),
    titulo: document.getElementById("titulo").value.trim(),
    tipo: "Campanha social",
    cidade: document.getElementById("cidade").value,
    descricao: document.getElementById("descricao").value.trim(),
    itens: document.getElementById("itens").value.trim(),
    nivel: "",
    entidadeId: usuario.entidadeId,
    status: "pendente"
  });
  salvar("campanhas", lista);
  alert("Campanha enviada para aprovação!");
  location.reload();
});
