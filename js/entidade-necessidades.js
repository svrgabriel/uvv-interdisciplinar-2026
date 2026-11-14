const usuario = protegerPagina("entidade");
const formNecessidade = document.getElementById("form-necessidade");
const campoId = document.getElementById("id-necessidade");
const campoItem = document.getElementById("item");
const campoPrioridade = document.getElementById("prioridade");
const mensagem = document.getElementById("mensagem-necessidade");
const limite = 50;

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem mensagem-" + tipo;
}

function limparFormulario() {
  formNecessidade.reset();
  campoId.value = "";
  document.getElementById("titulo-form").textContent = "Nova necessidade";
  document.getElementById("botao-salvar").textContent = "Adicionar";
  document.getElementById("botao-cancelar").hidden = true;
}

function listarNecessidades() {
  const lista = necessidadesDaEntidade(usuario.entidadeId);
  const tabela = document.getElementById("tabela-necessidades");
  tabela.innerHTML = "";
  document.getElementById("contador").textContent = lista.length;

  for (let i = 0; i < lista.length; i++) {
    tabela.innerHTML += `
      <tr>
        <td>${lista[i].item}</td>
        <td>${seloPrioridade(lista[i].prioridade)}</td>
        <td class="cartao-botoes">
          <button class="botao botao-contorno botao-pequeno" onclick="editarNecessidade(${lista[i].id})">Editar</button>
          <button class="botao botao-perigo botao-pequeno" onclick="excluirNecessidade(${lista[i].id})">Excluir</button>
        </td>
      </tr>
    `;
  }

  if (lista.length === 0) {
    tabela.innerHTML = '<tr><td colspan="3" class="vazio">Nenhuma necessidade cadastrada ainda.</td></tr>';
  }
}

function editarNecessidade(id) {
  const necessidade = buscarPorId(pegarNecessidades(), id);
  campoId.value = necessidade.id;
  campoItem.value = necessidade.item;
  campoPrioridade.value = necessidade.prioridade;
  document.getElementById("titulo-form").textContent = "Editar necessidade";
  document.getElementById("botao-salvar").textContent = "Salvar alterações";
  document.getElementById("botao-cancelar").hidden = false;
  mostrarMensagem("", "sucesso");
  campoItem.focus();
}

function excluirNecessidade(id) {
  if (!confirm("Deseja excluir esta necessidade?")) {
    return;
  }
  const necessidades = pegarNecessidades();
  const novaLista = [];
  for (let i = 0; i < necessidades.length; i++) {
    if (necessidades[i].id !== id) {
      novaLista.push(necessidades[i]);
    }
  }
  salvar("necessidades", novaLista);
  limparFormulario();
  mostrarMensagem("Necessidade excluída.", "sucesso");
  listarNecessidades();
}

formNecessidade.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const necessidades = pegarNecessidades();
  const item = campoItem.value.trim();

  if (item === "") {
    mostrarMensagem("Informe o item.", "erro");
    return;
  }

  if (campoId.value === "") {
    if (necessidadesDaEntidade(usuario.entidadeId).length >= limite) {
      mostrarMensagem("Limite de 50 necessidades atingido. Exclua alguma para adicionar outra.", "erro");
      return;
    }
    necessidades.push({
      id: novoId(necessidades),
      entidadeId: usuario.entidadeId,
      item: item,
      prioridade: campoPrioridade.value
    });
    mostrarMensagem("Necessidade adicionada!", "sucesso");
  } else {
    const necessidade = buscarPorId(necessidades, Number(campoId.value));
    necessidade.item = item;
    necessidade.prioridade = campoPrioridade.value;
    mostrarMensagem("Necessidade atualizada!", "sucesso");
  }

  salvar("necessidades", necessidades);
  limparFormulario();
  listarNecessidades();
});

listarNecessidades();
