const idEntidade = Number(pegarParametro("id"));
const entidade = buscarPorId(pegarEntidades(), idEntidade);
const areaPerfil = document.getElementById("perfil");

function montarPerfil() {
  if (entidade === null || entidade.status !== "aprovada") {
    areaPerfil.innerHTML = '<h1>Instituição não encontrada</h1><p class="vazio">Ela pode ter sido removida ou ainda está aguardando aprovação.</p>';
    return;
  }

  document.title = entidade.nome + " | DoeUVV";

  const necessidades = necessidadesDaEntidade(entidade.id);
  let itens = "";
  for (let i = 0; i < necessidades.length; i++) {
    itens += `<li><span>${necessidades[i].item}</span>${seloPrioridade(necessidades[i].prioridade)}</li>`;
  }
  if (necessidades.length === 0) {
    itens = '<li class="vazio">Nenhuma necessidade publicada ainda.</li>';
  }

  const campanhas = campanhasAtivas();
  let listaCampanhas = "";
  for (let i = 0; i < campanhas.length; i++) {
    if (campanhas[i].entidadeId === entidade.id) {
      listaCampanhas += `<li><strong>${campanhas[i].titulo}</strong> - ${campanhas[i].itens}</li>`;
    }
  }
  if (listaCampanhas === "") {
    listaCampanhas = '<li class="vazio">Nenhuma campanha ativa.</li>';
  }

  let mapa = '<p class="vazio">Localização não informada.</p>';
  if (entidade.lat !== null) {
    mapa = `<iframe class="mapa" title="Mapa com a localização de ${entidade.nome}" src="${linkMapa(entidade.lat, entidade.lng)}"></iframe>`;
  }

  let linkDoar = "login.html";
  const usuario = usuarioLogado();
  if (usuario !== null && usuario.perfil === "doador") {
    linkDoar = "doador-doar.html?id=" + entidade.id;
  }

  areaPerfil.innerHTML = `
    <div class="perfil-topo">
      <img src="${entidade.foto}" alt="Foto da entidade ${entidade.nome}" class="perfil-foto">
      <div class="cartao">
        <h1>${entidade.nome}</h1>
        <p class="texto-suave">${entidade.causa} · ${entidade.cidade}</p>
        <h2>Necessidades</h2>
        <ul class="lista-necessidades">${itens}</ul>
        <a href="${linkDoar}" class="botao">Quero doar</a>
      </div>
    </div>

    <section class="secao">
      <h2>Nossa história</h2>
      <p>${entidade.historia || "Sem descrição ainda."}</p>
    </section>

    <section class="secao layout-duplo">
      <article class="cartao">
        <h2>Entrega no local</h2>
        <ul class="info-lista">
          <li><strong>Endereço:</strong> ${entidade.endereco || "Não informado"}</li>
          <li><strong>CEP:</strong> ${entidade.cep || "Não informado"}</li>
          <li><strong>Horário e dias:</strong> ${entidade.horario || "Não informado"}</li>
          <li><strong>Chave Pix:</strong> ${entidade.pix || "Não aceita Pix"}</li>
        </ul>
        <h2>Campanhas</h2>
        <ul class="info-lista">${listaCampanhas}</ul>
      </article>
      ${mapa}
    </section>
  `;
}

montarPerfil();
