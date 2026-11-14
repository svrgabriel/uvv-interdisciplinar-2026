const usuario = protegerPagina("entidade");
const formPresencial = document.getElementById("form-presencial");

function confirmarRecebimento(id) {
  const doacoes = pegarDoacoes();
  buscarPorId(doacoes, id).status = "recebida";
  salvar("doacoes", doacoes);
  listarDoacoes();
}

function listarDoacoes() {
  const doacoes = pegarDoacoes();
  const pendentes = document.getElementById("tabela-pendentes");
  const recebidas = document.getElementById("tabela-recebidas");
  pendentes.innerHTML = "";
  recebidas.innerHTML = "";

  for (let i = doacoes.length - 1; i >= 0; i--) {
    const doacao = doacoes[i];
    if (doacao.entidadeId !== usuario.entidadeId) {
      continue;
    }
    if (doacao.status === "aguardando") {
      pendentes.innerHTML += `
        <tr>
          <td>${formatarData(doacao.data)}</td>
          <td>${doacao.doador}</td>
          <td>${doacao.item}</td>
          <td>${doacao.quantidade}</td>
          <td>${doacao.forma}</td>
          <td><button class="botao botao-pequeno" onclick="confirmarRecebimento(${doacao.id})">Confirmar recebimento</button></td>
        </tr>
      `;
    } else if (doacao.status === "recebida") {
      recebidas.innerHTML += `
        <tr>
          <td>${formatarData(doacao.data)}</td>
          <td>${doacao.doador}</td>
          <td>${doacao.item}</td>
          <td>${doacao.quantidade}</td>
          <td>${doacao.forma}</td>
        </tr>
      `;
    }
  }

  if (pendentes.innerHTML === "") {
    pendentes.innerHTML = '<tr><td colspan="6" class="vazio">Nenhuma doação aguardando entrega.</td></tr>';
  }
  if (recebidas.innerHTML === "") {
    recebidas.innerHTML = '<tr><td colspan="5" class="vazio">Nenhuma doação recebida ainda.</td></tr>';
  }
}

formPresencial.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const doacoes = pegarDoacoes();
  doacoes.push({
    id: novoId(doacoes),
    usuario: "",
    doador: document.getElementById("nome-doador").value.trim(),
    entidadeId: usuario.entidadeId,
    item: document.getElementById("item-presencial").value.trim(),
    quantidade: document.getElementById("quantidade-presencial").value.trim(),
    forma: "Presencial",
    data: dataDeHoje(),
    status: "recebida"
  });
  salvar("doacoes", doacoes);
  formPresencial.reset();
  document.getElementById("mensagem-presencial").textContent = "Doação presencial registrada!";
  listarDoacoes();
});

listarDoacoes();
