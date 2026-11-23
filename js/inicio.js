const entidades = entidadesAprovadas();
const campanhas = campanhasAtivas();

document.getElementById("total-entidades").textContent = entidades.length;
document.getElementById("total-campanhas").textContent = campanhas.length;
document.getElementById("total-necessidades").textContent = pegarNecessidades().length;
document.getElementById("total-doacoes").textContent = pegarDoacoes().length;

const listaCampanhas = document.getElementById("lista-campanhas");
for (let i = 0; i < campanhas.length && i < 3; i++) {
  const campanha = campanhas[i];
  let selo = "";
  if (campanha.nivel !== "") {
    selo = seloNivel(campanha.nivel);
  }
  listaCampanhas.innerHTML += `
    <article class="cartao">
      <div class="cartao-topo">
        <h3 class="cartao-titulo">${campanha.titulo}</h3>
        ${selo}
      </div>
      <p class="texto-suave">${campanha.tipo} · ${campanha.cidade} · por ${nomeOrigem(campanha)}</p>
      <p>${campanha.descricao}</p>
      <p class="texto-suave"><strong>Precisa de:</strong> ${campanha.itens}</p>
    </article>
  `;
}

const listaEntidades = document.getElementById("lista-entidades");
for (let i = 0; i < entidades.length && i < 3; i++) {
  const entidade = entidades[i];
  const necessidades = necessidadesDaEntidade(entidade.id);
  let itens = "";
  for (let j = 0; j < necessidades.length && j < 2; j++) {
    itens += `<li><span>${necessidades[j].item}</span>${seloPrioridade(necessidades[j].prioridade)}</li>`;
  }
  listaEntidades.innerHTML += `
    <article class="cartao">
      <img src="${entidade.foto}" alt="Foto da entidade ${entidade.nome}" class="cartao-foto">
      <a href="instituicao.html?id=${entidade.id}" class="cartao-titulo">${entidade.nome}</a>
      <p class="texto-suave">${entidade.causa} · ${entidade.cidade}</p>
      <ul class="lista-necessidades">${itens}</ul>
      <a href="instituicao.html?id=${entidade.id}" class="botao botao-contorno botao-pequeno">Ver perfil</a>
    </article>
  `;
}
