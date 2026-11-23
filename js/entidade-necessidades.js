const usuario = protegerPagina("entidade");
const formNecessidade = document.getElementById("form-necessidade");
const tabela = document.getElementById("tabela-necessidades");
const minhas = necessidadesDaEntidade(usuario.entidadeId);

document.getElementById("contador").textContent = minhas.length;

for (let i = 0; i < minhas.length; i++) {
  tabela.innerHTML += `
    <tr>
      <td>${minhas[i].item}</td>
      <td>${seloPrioridade(minhas[i].prioridade)}</td>
      <td>
        <div class="acoes">
          <a href="entidade-necessidades.html?editar=${minhas[i].id}" class="botao botao-contorno botao-pequeno">Editar</a>
          <button class="botao botao-perigo botao-pequeno" onclick="excluirNecessidade(${minhas[i].id})">Excluir</button>
        </div>
      </td>
    </tr>
  `;
}
if (minhas.length === 0) {
  tabela.innerHTML = '<tr><td colspan="3" class="vazio">Nenhuma necessidade cadastrada.</td></tr>';
}

const emEdicao = buscarPorId(minhas, Number(pegarParametro("editar")));
if (emEdicao !== null) {
  document.getElementById("titulo-form").textContent = "Editar necessidade";
  document.getElementById("id-necessidade").value = emEdicao.id;
  document.getElementById("item").value = emEdicao.item;
  document.getElementById("prioridade").value = emEdicao.prioridade;
}

function excluirNecessidade(id) {
  if (!confirm("Deseja excluir esta necessidade?")) {
    return;
  }
  const necessidades = pegarNecessidades();
  const restantes = [];
  for (let i = 0; i < necessidades.length; i++) {
    if (necessidades[i].id !== id) {
      restantes.push(necessidades[i]);
    }
  }
  salvar("necessidades", restantes);
  window.location.href = "entidade-necessidades.html";
}

formNecessidade.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const necessidades = pegarNecessidades();
  const id = Number(document.getElementById("id-necessidade").value);
  const item = document.getElementById("item").value.trim();
  const prioridade = document.getElementById("prioridade").value;

  if (id === 0) {
    if (necessidadesDaEntidade(usuario.entidadeId).length >= 50) {
      document.getElementById("mensagem-necessidade").textContent = "Limite de 50 necessidades atingido.";
      return;
    }
    necessidades.push({ id: novoId(necessidades), entidadeId: usuario.entidadeId, item: item, prioridade: prioridade });
  } else {
    const necessidade = buscarPorId(necessidades, id);
    necessidade.item = item;
    necessidade.prioridade = prioridade;
  }

  salvar("necessidades", necessidades);
  window.location.href = "entidade-necessidades.html";
});
