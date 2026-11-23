const usuario = protegerPagina("doador");
const filtroCidade = document.getElementById("filtro-cidade");
const tabela = document.getElementById("lista-pontos");
const mapa = document.getElementById("mapa");

filtroCidade.value = pegarParametro("cidade") || "";

const pontos = entidadesAprovadas();
for (let i = 0; i < pontos.length; i++) {
  const entidade = pontos[i];
  if (filtroCidade.value !== "" && entidade.cidade !== filtroCidade.value) {
    continue;
  }

  let linkDoMapa = "Sem localização";
  if (entidade.lat !== null) {
    linkDoMapa = `<a href="${linkMapa(entidade.lat, entidade.lng)}" target="mapa" class="botao botao-contorno botao-pequeno">Ver no mapa</a>`;
    if (mapa.src === "") {
      mapa.src = linkMapa(entidade.lat, entidade.lng);
    }
  }

  tabela.innerHTML += `
    <tr>
      <td><a href="instituicao.html?id=${entidade.id}" class="cartao-titulo">${entidade.nome}</a><br><span class="texto-suave">${entidade.cidade}</span></td>
      <td>${entidade.endereco}<br><span class="texto-suave">${entidade.horario}</span></td>
      <td>${linkDoMapa}</td>
    </tr>
  `;
}

if (tabela.innerHTML === "") {
  tabela.innerHTML = '<tr><td colspan="3" class="vazio">Nenhum ponto de coleta nessa cidade ainda.</td></tr>';
}
