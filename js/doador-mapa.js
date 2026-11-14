const usuario = protegerPagina("doador");
const pontos = entidadesAprovadas();
const filtroCidade = document.getElementById("filtro-cidade");

preencherCidades("filtro-cidade", pontos);

const cidadeDaUrl = pegarParametro("cidade");
if (cidadeDaUrl !== null) {
  filtroCidade.value = cidadeDaUrl;
  if (filtroCidade.value !== cidadeDaUrl) {
    filtroCidade.innerHTML += `<option value="${cidadeDaUrl}">${cidadeDaUrl}</option>`;
    filtroCidade.value = cidadeDaUrl;
  }
}

function verNoMapa(id) {
  const entidade = buscarPorId(pontos, id);
  document.getElementById("titulo-mapa").textContent = entidade.nome;
  if (entidade.lat === null) {
    document.getElementById("mapa").src = "";
    return;
  }
  document.getElementById("mapa").src = linkMapa(entidade.lat, entidade.lng);
}

function mostrarPontos() {
  const lista = document.getElementById("lista-pontos");
  const cidade = filtroCidade.value;
  lista.innerHTML = "";
  let primeiro = 0;

  for (let i = 0; i < pontos.length; i++) {
    const entidade = pontos[i];
    if (cidade !== "" && entidade.cidade !== cidade) {
      continue;
    }
    if (primeiro === 0) {
      primeiro = entidade.id;
    }
    lista.innerHTML += `
      <li class="cartao">
        <a href="instituicao.html?id=${entidade.id}" class="cartao-titulo">${entidade.nome}</a>
        <p class="texto-suave">${entidade.endereco || "Endereço não informado"}</p>
        <p class="texto-suave">${entidade.horario || "Horário não informado"}</p>
        <div class="cartao-botoes">
          <button class="botao botao-contorno botao-pequeno" onclick="verNoMapa(${entidade.id})">Ver no mapa</button>
          <a href="doador-doar.html?id=${entidade.id}" class="botao botao-pequeno">Quero doar</a>
        </div>
      </li>
    `;
  }

  if (primeiro === 0) {
    lista.innerHTML = '<li class="vazio">Nenhum ponto de coleta nessa cidade ainda.</li>';
  } else {
    verNoMapa(primeiro);
  }
}

filtroCidade.addEventListener("change", mostrarPontos);
mostrarPontos();
