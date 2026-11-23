const usuario = protegerPagina("admin");
const pendentes = document.getElementById("tabela-pendentes");
const tabela = document.getElementById("tabela-entidades");

function mudarStatusEntidade(id, status) {
  const entidades = pegarEntidades();
  buscarPorId(entidades, id).status = status;
  salvar("entidades", entidades);
  location.reload();
}

const entidades = pegarEntidades();
for (let i = 0; i < entidades.length; i++) {
  const entidade = entidades[i];

  if (entidade.status === "pendente") {
    pendentes.innerHTML += `
      <tr>
        <td><strong>${entidade.nome}</strong><br><span class="texto-suave">${entidade.causa} · ${entidade.cidade}</span></td>
        <td>${entidade.endereco}</td>
        <td>${entidade.pix || "Não informada"}</td>
        <td>${entidade.historia}</td>
        <td>
          <div class="acoes">
            <button class="botao botao-pequeno" onclick="mudarStatusEntidade(${entidade.id}, 'aprovada')">Aprovar</button>
            <button class="botao botao-perigo botao-pequeno" onclick="mudarStatusEntidade(${entidade.id}, 'recusada')">Recusar</button>
          </div>
        </td>
      </tr>
    `;
  }

  let acao = `<button class="botao botao-perigo botao-pequeno" onclick="mudarStatusEntidade(${entidade.id}, 'suspensa')">Suspender</button>`;
  if (entidade.status !== "aprovada") {
    acao = `<button class="botao botao-pequeno" onclick="mudarStatusEntidade(${entidade.id}, 'aprovada')">Aprovar</button>`;
  }
  tabela.innerHTML += `
    <tr>
      <td>${entidade.nome}</td>
      <td>${entidade.causa}</td>
      <td>${entidade.cidade}</td>
      <td>${seloStatus(entidade.status)}</td>
      <td>${acao}</td>
    </tr>
  `;
}

function mudarStatusUsuario(nomeUsuario, status) {
  const lista = pegarUsuarios();
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].usuario === nomeUsuario) {
      lista[i].status = status;
    }
  }
  salvar("usuarios", lista);
  location.reload();
}

const tabelaDc = document.getElementById("tabela-dc");
const contas = pegarUsuarios();
for (let i = 0; i < contas.length; i++) {
  const conta = contas[i];
  if (conta.perfil !== "defesacivil") {
    continue;
  }
  let botoes = `<button class="botao botao-perigo botao-pequeno" onclick="mudarStatusUsuario('${conta.usuario}', 'suspensa')">Suspender</button>`;
  if (conta.status === "pendente") {
    botoes = `
      <button class="botao botao-pequeno" onclick="mudarStatusUsuario('${conta.usuario}', 'ativo')">Aprovar</button>
      <button class="botao botao-perigo botao-pequeno" onclick="mudarStatusUsuario('${conta.usuario}', 'recusada')">Recusar</button>
    `;
  } else if (conta.status !== "ativo") {
    botoes = `<button class="botao botao-pequeno" onclick="mudarStatusUsuario('${conta.usuario}', 'ativo')">Aprovar</button>`;
  }
  tabelaDc.innerHTML += `
    <tr>
      <td><strong>${conta.nome}</strong><br><span class="texto-suave">${conta.cidade || "Espírito Santo"}</span></td>
      <td>${conta.responsavel || "-"}<br><span class="texto-suave">${conta.telefone || ""}</span></td>
      <td>${conta.usuario}</td>
      <td>${seloStatus(conta.status)}</td>
      <td><div class="acoes">${botoes}</div></td>
    </tr>
  `;
}

if (pendentes.innerHTML === "") {
  pendentes.innerHTML = '<tr><td colspan="5" class="vazio">Nenhum cadastro aguardando aprovação.</td></tr>';
}
