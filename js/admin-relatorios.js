const usuario = protegerPagina("admin");
const entidadesRelatorio = pegarEntidades();
const necessidadesRelatorio = pegarNecessidades();
const doacoesRelatorio = pegarDoacoes();

let aprovadas = 0;
let pendentes = 0;
for (let i = 0; i < entidadesRelatorio.length; i++) {
  if (entidadesRelatorio[i].status === "aprovada") {
    aprovadas++;
  } else if (entidadesRelatorio[i].status === "pendente") {
    pendentes++;
  }
}

const porStatus = { aguardando: 0, recebida: 0, cancelada: 0 };
for (let i = 0; i < doacoesRelatorio.length; i++) {
  porStatus[doacoesRelatorio[i].status]++;
}

const porPrioridade = { urgente: 0, alta: 0, normal: 0 };
for (let i = 0; i < necessidadesRelatorio.length; i++) {
  porPrioridade[necessidadesRelatorio[i].prioridade]++;
}

document.getElementById("rel-entidades").textContent = aprovadas;
document.getElementById("rel-pendentes").textContent = pendentes;
document.getElementById("rel-campanhas").textContent = campanhasAtivas().length;
document.getElementById("rel-doacoes").textContent = porStatus.recebida;

document.getElementById("rel-prioridades").innerHTML = `
  <li>${seloPrioridade("urgente")}<strong>${porPrioridade.urgente}</strong></li>
  <li>${seloPrioridade("alta")}<strong>${porPrioridade.alta}</strong></li>
  <li>${seloPrioridade("normal")}<strong>${porPrioridade.normal}</strong></li>
`;

document.getElementById("rel-status").innerHTML = `
  <li>${seloStatus("aguardando")}<strong>${porStatus.aguardando}</strong></li>
  <li>${seloStatus("recebida")}<strong>${porStatus.recebida}</strong></li>
  <li>${seloStatus("cancelada")}<strong>${porStatus.cancelada}</strong></li>
`;

const tabela = document.getElementById("tabela-relatorio");
for (let i = 0; i < entidadesRelatorio.length; i++) {
  const entidade = entidadesRelatorio[i];
  if (entidade.status !== "aprovada") {
    continue;
  }
  let aguardando = 0;
  let recebidas = 0;
  for (let j = 0; j < doacoesRelatorio.length; j++) {
    if (doacoesRelatorio[j].entidadeId === entidade.id) {
      if (doacoesRelatorio[j].status === "aguardando") {
        aguardando++;
      } else if (doacoesRelatorio[j].status === "recebida") {
        recebidas++;
      }
    }
  }
  tabela.innerHTML += `
    <tr>
      <td>${entidade.nome}</td>
      <td>${entidade.cidade}</td>
      <td>${necessidadesDaEntidade(entidade.id).length}</td>
      <td>${aguardando}</td>
      <td>${recebidas}</td>
    </tr>
  `;
}
