const usuario = protegerPagina("doador");
const tabela = document.getElementById("tabela-doacoes");

function cancelarDoacao(id) {
  if (!confirm("Deseja cancelar esta doação?")) {
    return;
  }
  const doacoes = pegarDoacoes();
  buscarPorId(doacoes, id).status = "cancelada";
  salvar("doacoes", doacoes);
  location.reload();
}

const doacoes = pegarDoacoes();
const entidades = pegarEntidades();
for (let i = doacoes.length - 1; i >= 0; i--) {
  const doacao = doacoes[i];
  if (doacao.usuario !== usuario.usuario) {
    continue;
  }
  const entidade = buscarPorId(entidades, doacao.entidadeId);
  let acao = "-";
  if (doacao.status === "aguardando") {
    acao = `<button class="botao botao-perigo botao-pequeno" onclick="cancelarDoacao(${doacao.id})">Cancelar</button>`;
  }
  tabela.innerHTML += `
    <tr>
      <td>${formatarData(doacao.data)}</td>
      <td>${entidade === null ? "Entidade removida" : entidade.nome}</td>
      <td>${doacao.item}</td>
      <td>${doacao.quantidade}</td>
      <td>${doacao.forma}</td>
      <td>${seloStatus(doacao.status)}</td>
      <td>${acao}</td>
    </tr>
  `;
}

if (tabela.innerHTML === "") {
  tabela.innerHTML = '<tr><td colspan="7" class="vazio">Você ainda não registrou nenhuma doação.</td></tr>';
}
