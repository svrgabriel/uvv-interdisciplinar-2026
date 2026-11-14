const usuario = protegerPagina("doador");
const opcoesEntidades = entidadesAprovadas();
const selectEntidade = document.getElementById("entidade");
const campoData = document.getElementById("data");
const formDoacao = document.getElementById("form-doacao");

for (let i = 0; i < opcoesEntidades.length; i++) {
  selectEntidade.innerHTML += `<option value="${opcoesEntidades[i].id}">${opcoesEntidades[i].nome}</option>`;
}

const idDaUrl = Number(pegarParametro("id"));
if (buscarPorId(opcoesEntidades, idDaUrl) !== null) {
  selectEntidade.value = idDaUrl;
}

campoData.min = dataDeHoje();
campoData.value = dataDeHoje();

function mostrarInfoEntidade() {
  const entidade = buscarPorId(opcoesEntidades, Number(selectEntidade.value));
  const area = document.getElementById("info-entidade");
  if (entidade === null) {
    area.innerHTML = '<p class="vazio">Nenhuma entidade aprovada disponível para receber doações.</p>';
    return;
  }

  const necessidades = necessidadesDaEntidade(entidade.id);
  let linhas = "";
  for (let i = 0; i < necessidades.length; i++) {
    linhas += `<tr><td>${necessidades[i].item}</td><td>${seloPrioridade(necessidades[i].prioridade)}</td></tr>`;
  }
  if (linhas === "") {
    linhas = '<tr><td colspan="2" class="vazio">Nenhuma necessidade publicada ainda.</td></tr>';
  }

  area.innerHTML = `
    <img src="${entidade.foto}" alt="Foto da entidade ${entidade.nome}" class="cartao-foto">
    <h2>${entidade.nome}</h2>
    <p class="texto-suave">${entidade.causa} · ${entidade.cidade}</p>
    <table>
      <thead><tr><th>O que estão precisando</th><th>Prioridade</th></tr></thead>
      <tbody>${linhas}</tbody>
    </table>
    <ul class="info-lista">
      <li><strong>Endereço:</strong> ${entidade.endereco || "Não informado"}</li>
      <li><strong>Horário:</strong> ${entidade.horario || "Não informado"}</li>
      <li><strong>Chave Pix:</strong> ${entidade.pix || "Não aceita Pix"}</li>
    </ul>
  `;
}

formDoacao.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const entidade = buscarPorId(opcoesEntidades, Number(selectEntidade.value));
  const forma = document.querySelector('input[name="forma"]:checked').value;
  if (forma === "Pix" && !entidade.pix) {
    document.getElementById("mensagem-doacao").textContent = "Essa entidade não tem chave Pix. Escolha entregar no local ou solicitar coleta.";
    return;
  }

  const doacoes = pegarDoacoes();
  doacoes.push({
    id: novoId(doacoes),
    usuario: usuario.usuario,
    doador: usuario.nome,
    entidadeId: entidade.id,
    item: document.getElementById("item").value.trim(),
    quantidade: document.getElementById("quantidade").value.trim(),
    forma: forma,
    data: campoData.value,
    status: "aguardando"
  });
  salvar("doacoes", doacoes);

  if (forma === "Pix") {
    alert("Doação registrada! Faça o Pix para a chave " + entidade.pix);
  } else {
    alert("Doação registrada!");
  }
  window.location.href = "doador-doacoes.html";
});

selectEntidade.addEventListener("change", mostrarInfoEntidade);
mostrarInfoEntidade();
