const usuario = protegerPagina("doador");
const opcoesEntidades = entidadesAprovadas();
const selectEntidade = document.getElementById("entidade");
const campoData = document.getElementById("data");
const formDoacao = document.getElementById("form-doacao");

for (let i = 0; i < opcoesEntidades.length; i++) {
  selectEntidade.innerHTML += `<option value="${opcoesEntidades[i].id}">${opcoesEntidades[i].nome}</option>`;
}

const idDaUrl = pegarParametro("id");
if (idDaUrl !== null) {
  selectEntidade.value = idDaUrl;
}

campoData.min = dataDeHoje();
campoData.value = dataDeHoje();

function mostrarInfoEntidade() {
  const entidade = buscarPorId(opcoesEntidades, Number(selectEntidade.value));
  const necessidades = necessidadesDaEntidade(entidade.id);
  const sugestoes = document.getElementById("sugestoes");
  let itens = "";
  sugestoes.innerHTML = "";
  for (let i = 0; i < necessidades.length; i++) {
    itens += `<li><span>${necessidades[i].item}</span>${seloPrioridade(necessidades[i].prioridade)}</li>`;
    sugestoes.innerHTML += `<option value="${necessidades[i].item}"></option>`;
  }
  if (itens === "") {
    itens = '<li class="vazio">Nenhuma necessidade publicada ainda.</li>';
  }

  document.getElementById("info-entidade").innerHTML = `
    <img src="${entidade.foto}" alt="Foto da entidade ${entidade.nome}" class="cartao-foto">
    <h2>${entidade.nome}</h2>
    <p class="texto-suave">${entidade.causa} · ${entidade.cidade}</p>
    <h3>O que estão precisando</h3>
    <ul class="lista-necessidades">${itens}</ul>
    <ul class="info-lista">
      <li><strong>Endereço:</strong> ${entidade.endereco || "Não informado"}</li>
      <li><strong>Horário:</strong> ${entidade.horario || "Não informado"}</li>
      <li><strong>Chave Pix:</strong> ${entidade.pix || "Não aceita Pix"}</li>
    </ul>
  `;
}

function formaEscolhida() {
  const opcoes = document.getElementsByName("forma");
  for (let i = 0; i < opcoes.length; i++) {
    if (opcoes[i].checked) {
      return opcoes[i].value;
    }
  }
  return "Entregar no local";
}

formDoacao.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const doacoes = pegarDoacoes();
  const entidade = buscarPorId(opcoesEntidades, Number(selectEntidade.value));
  if (entidade === null) {
    return;
  }
  if (formaEscolhida() === "Pix" && !entidade.pix) {
    document.getElementById("mensagem-doacao").textContent = "Essa entidade não tem chave Pix. Escolha entregar no local ou solicitar coleta.";
    return;
  }
  const nova = {
    id: novoId(doacoes),
    usuario: usuario.usuario,
    doador: usuario.nome,
    entidadeId: entidade.id,
    item: document.getElementById("item").value.trim(),
    quantidade: document.getElementById("quantidade").value.trim(),
    forma: formaEscolhida(),
    data: campoData.value,
    status: "aguardando"
  };
  doacoes.push(nova);
  salvar("doacoes", doacoes);

  let texto = "Doação registrada! Acompanhe em Minhas doações.";
  if (nova.forma === "Pix") {
    texto = "Doação registrada! Faça o Pix para a chave " + entidade.pix + " e acompanhe em Minhas doações.";
  }
  document.getElementById("mensagem-doacao").textContent = texto;
  document.getElementById("item").value = "";
  document.getElementById("quantidade").value = "";
});

selectEntidade.addEventListener("change", mostrarInfoEntidade);
mostrarInfoEntidade();
