const usuario = protegerPagina("admin");

function mudarStatusEntidade(id, status) {
  const entidades = pegarEntidades();
  buscarPorId(entidades, id).status = status;
  salvar("entidades", entidades);
  listarEntidades();
}

function listarEntidades() {
  const entidades = pegarEntidades();
  const pendentes = document.getElementById("lista-pendentes");
  const tabela = document.getElementById("tabela-entidades");
  pendentes.innerHTML = "";
  tabela.innerHTML = "";

  for (let i = 0; i < entidades.length; i++) {
    const entidade = entidades[i];

    if (entidade.status === "pendente") {
      pendentes.innerHTML += `
        <article class="cartao">
          <div class="cartao-topo">
            <h3 class="cartao-titulo">${entidade.nome}</h3>
            ${seloStatus(entidade.status)}
          </div>
          <p class="texto-suave">${entidade.causa} · ${entidade.cidade}</p>
          <p>${entidade.historia || "Sem descrição."}</p>
          <ul class="info-lista texto-suave">
            <li><strong>Endereço:</strong> ${entidade.endereco || "Não informado"}</li>
            <li><strong>Chave Pix:</strong> ${entidade.pix || "Não informada"}</li>
          </ul>
          <div class="cartao-botoes">
            <button class="botao botao-pequeno" onclick="mudarStatusEntidade(${entidade.id}, 'aprovada')">Aprovar</button>
            <button class="botao botao-perigo botao-pequeno" onclick="mudarStatusEntidade(${entidade.id}, 'recusada')">Recusar</button>
          </div>
        </article>
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

  if (pendentes.innerHTML === "") {
    pendentes.innerHTML = '<p class="vazio">Nenhum cadastro aguardando aprovação.</p>';
  }
}

listarEntidades();
