const usuario = protegerPagina("entidade");
const tabela = document.getElementById("tabela-recebimentos");
const formPresencial = document.getElementById("form-presencial");

function confirmarRecebimento(id) {
  const doacoes = pegarDoacoes();
  buscarPorId(doacoes, id).status = "recebida";
  salvar("doacoes", doacoes);
  location.reload();
}

const doacoes = pegarDoacoes();
for (let i = doacoes.length - 1; i >= 0; i--) {
  const doacao = doacoes[i];
  if (doacao.entidadeId !== usuario.entidadeId) {
    continue;
  }
  let acao = "-";
  if (doacao.status === "aguardando") {
    acao = `<button class="botao botao-pequeno" onclick="confirmarRecebimento(${doacao.id})">Confirmar recebimento</button>`;
  }
  tabela.innerHTML += `
    <tr>
      <td>${formatarData(doacao.data)}</td>
      <td>${doacao.doador}</td>
      <td>${doacao.item}</td>
      <td>${doacao.quantidade} ${doacao.unidade || ""}</td>
      <td>${doacao.forma}</td>
      <td>${seloStatus(doacao.status)}</td>
      <td>${acao}</td>
    </tr>
  `;
}
if (tabela.innerHTML === "") {
  tabela.innerHTML = '<tr><td colspan="7" class="vazio">Nenhuma doação registrada para sua entidade.</td></tr>';
}

formPresencial.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const lista = pegarDoacoes();
  lista.push({
    id: novoId(lista),
    usuario: "",
    doador: document.getElementById("doador").value.trim(),
    entidadeId: usuario.entidadeId,
    item: document.getElementById("item").value.trim(),
    quantidade: document.getElementById("quantidade").value.trim(),
    unidade: document.getElementById("unidade").value,
    forma: "Entregue no local",
    data: dataDeHoje(),
    status: "recebida"
  });
  salvar("doacoes", lista);
  location.reload();
});
