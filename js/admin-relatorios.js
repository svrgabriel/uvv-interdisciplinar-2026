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

document.getElementById("rel-urgente").textContent = porPrioridade.urgente;
document.getElementById("rel-alta").textContent = porPrioridade.alta;
document.getElementById("rel-normal").textContent = porPrioridade.normal;
document.getElementById("rel-aguardando").textContent = porStatus.aguardando;
document.getElementById("rel-recebida").textContent = porStatus.recebida;
document.getElementById("rel-cancelada").textContent = porStatus.cancelada;

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
