const usuario = protegerPagina("doador");

function cancelarDoacao(id) {
  if (!confirm("Deseja cancelar esta doação?")) {
    return;
  }
  const doacoes = pegarDoacoes();
  const doacao = buscarPorId(doacoes, id);
  doacao.status = "cancelada";
  salvar("doacoes", doacoes);
  mostrarDoacoes();
}

function mostrarDoacoes() {
  const doacoes = pegarDoacoes();
  const entidades = pegarEntidades();
  const tabela = document.getElementById("tabela-doacoes");
  let total = 0;
  let aguardando = 0;
  let recebidas = 0;
  let canceladas = 0;
  tabela.innerHTML = "";

  for (let i = doacoes.length - 1; i >= 0; i--) {
    const doacao = doacoes[i];
    if (doacao.usuario !== usuario.usuario) {
      continue;
    }
    total++;
    if (doacao.status === "aguardando") {
      aguardando++;
    } else if (doacao.status === "recebida") {
      recebidas++;
    } else {
      canceladas++;
    }

    const entidade = buscarPorId(entidades, doacao.entidadeId);
    let acao = "-";
    if (doacao.status === "aguardando") {
      acao = `<button class="botao botao-perigo botao-pequeno" onclick="cancelarDoacao(${doacao.id})">Cancelar</button>`;
    }

    tabela.innerHTML += `
      <tr>
        <td>${formatarData(doacao.data)}</td>
        <td><a href="instituicao.html?id=${doacao.entidadeId}">${entidade ? entidade.nome : "-"}</a></td>
        <td>${doacao.item}</td>
        <td>${doacao.quantidade}</td>
        <td>${doacao.forma}</td>
        <td>${seloStatus(doacao.status)}</td>
        <td>${acao}</td>
      </tr>
    `;
  }

  if (total === 0) {
    tabela.innerHTML = '<tr><td colspan="7" class="vazio">Nenhuma doação registrada ainda.</td></tr>';
  }

  document.getElementById("total").textContent = total;
  document.getElementById("total-aguardando").textContent = aguardando;
  document.getElementById("total-recebidas").textContent = recebidas;
  document.getElementById("total-canceladas").textContent = canceladas;
}

mostrarDoacoes();
