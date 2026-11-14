const usuario = protegerPagina("defesacivil");
const pontosColeta = entidadesAprovadas();
const filtroCidade = document.getElementById("filtro-cidade");

preencherCidades("filtro-cidade", pontosColeta);

const cidadeDaUrl = pegarParametro("cidade");
if (cidadeDaUrl !== null) {
  filtroCidade.value = cidadeDaUrl;
}

function mostrarPontos() {
  const area = document.getElementById("lista-pontos");
  const cidade = filtroCidade.value;
  area.innerHTML = "";

  for (let i = 0; i < pontosColeta.length; i++) {
    const entidade = pontosColeta[i];
    if (cidade !== "" && entidade.cidade !== cidade) {
      continue;
    }
    const necessidades = necessidadesDaEntidade(entidade.id);
    let urgentes = "";
    for (let j = 0; j < necessidades.length; j++) {
      if (necessidades[j].prioridade === "urgente") {
        urgentes += `<li><span>${necessidades[j].item}</span>${seloPrioridade("urgente")}</li>`;
      }
    }
    if (urgentes === "") {
      urgentes = '<li class="vazio">Nenhuma necessidade urgente.</li>';
    }
    area.innerHTML += `
      <article class="cartao">
        <a href="instituicao.html?id=${entidade.id}" class="cartao-titulo">${entidade.nome}</a>
        <p class="texto-suave">${entidade.causa} · ${entidade.cidade}</p>
        <ul class="info-lista texto-suave">
          <li><strong>Endereço:</strong> ${entidade.endereco || "Não informado"}</li>
          <li><strong>Horário:</strong> ${entidade.horario || "Não informado"}</li>
        </ul>
        <h3>Necessidades urgentes</h3>
        <ul class="lista-necessidades">${urgentes}</ul>
      </article>
    `;
  }

  if (area.innerHTML === "") {
    area.innerHTML = '<p class="vazio">Nenhum ponto de coleta cadastrado nessa cidade. Considere divulgar a campanha para entidades da região.</p>';
  }
}

filtroCidade.addEventListener("change", mostrarPontos);
mostrarPontos();
