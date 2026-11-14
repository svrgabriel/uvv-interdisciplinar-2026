const usuario = protegerPagina("defesacivil");
const entidadesPainel = entidadesAprovadas();
const campanhasPainel = campanhasAtivas();
const necessidadesPainel = pegarNecessidades();

function pesoNivel(nivel) {
  if (nivel === "Alto") {
    return 3;
  }
  if (nivel === "Médio") {
    return 2;
  }
  if (nivel === "Baixo") {
    return 1;
  }
  return 0;
}

const cidades = [];
for (let i = 0; i < entidadesPainel.length; i++) {
  if (cidades.indexOf(entidadesPainel[i].cidade) === -1) {
    cidades.push(entidadesPainel[i].cidade);
  }
}
for (let i = 0; i < campanhasPainel.length; i++) {
  if (cidades.indexOf(campanhasPainel[i].cidade) === -1) {
    cidades.push(campanhasPainel[i].cidade);
  }
}

const regioes = [];
let totalEmergenciais = 0;
let totalUrgentes = 0;

for (let i = 0; i < cidades.length; i++) {
  const regiao = { cidade: cidades[i], nivel: "", campanhas: [], entidades: 0, urgentes: 0 };

  for (let j = 0; j < campanhasPainel.length; j++) {
    const campanha = campanhasPainel[j];
    if (campanha.cidade === regiao.cidade) {
      regiao.campanhas.push(campanha.titulo);
      if (pesoNivel(campanha.nivel) > pesoNivel(regiao.nivel)) {
        regiao.nivel = campanha.nivel;
      }
    }
  }

  for (let j = 0; j < entidadesPainel.length; j++) {
    if (entidadesPainel[j].cidade === regiao.cidade) {
      regiao.entidades++;
      for (let k = 0; k < necessidadesPainel.length; k++) {
        if (necessidadesPainel[k].entidadeId === entidadesPainel[j].id && necessidadesPainel[k].prioridade === "urgente") {
          regiao.urgentes++;
        }
      }
    }
  }

  totalUrgentes += regiao.urgentes;
  regioes.push(regiao);
}

for (let i = 0; i < campanhasPainel.length; i++) {
  if (campanhasPainel[i].entidadeId === 0) {
    totalEmergenciais++;
  }
}

regioes.sort(function (a, b) {
  return pesoNivel(b.nivel) - pesoNivel(a.nivel);
});

let totalAlto = 0;
const lista = document.getElementById("lista-regioes");

for (let i = 0; i < regioes.length; i++) {
  const regiao = regioes[i];
  let classe = "regiao-normal";
  let selo = '<span class="selo selo-status-encerrada">Sem alerta</span>';
  if (regiao.nivel === "Alto") {
    classe = "regiao-alto";
    totalAlto++;
  } else if (regiao.nivel === "Médio") {
    classe = "regiao-medio";
  } else if (regiao.nivel === "Baixo") {
    classe = "regiao-baixo";
  }
  if (regiao.nivel !== "") {
    selo = seloNivel(regiao.nivel);
  }

  let campanhasTexto = "Nenhuma";
  if (regiao.campanhas.length > 0) {
    campanhasTexto = regiao.campanhas.join(", ");
  }

  lista.innerHTML += `
    <article class="cartao ${classe}">
      <div class="cartao-topo">
        <h3 class="cartao-titulo">${regiao.cidade}</h3>
        ${selo}
      </div>
      <ul class="info-lista texto-suave">
        <li><strong>Campanhas ativas:</strong> ${campanhasTexto}</li>
        <li><strong>Pontos de coleta:</strong> ${regiao.entidades}</li>
        <li><strong>Necessidades urgentes:</strong> ${regiao.urgentes}</li>
      </ul>
      <a href="dc-pontos.html?cidade=${regiao.cidade}" class="botao botao-contorno botao-pequeno">Ver pontos de coleta</a>
    </article>
  `;
}

document.getElementById("total-regioes").textContent = regioes.length;
document.getElementById("total-alerta-alto").textContent = totalAlto;
document.getElementById("total-emergenciais").textContent = totalEmergenciais;
document.getElementById("total-urgentes").textContent = totalUrgentes;
