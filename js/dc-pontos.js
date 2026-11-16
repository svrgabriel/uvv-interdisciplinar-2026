const usuario = protegerPagina("defesacivil");
const filtroCidade = document.getElementById("filtro-cidade");
const tabela = document.getElementById("lista-pontos");

filtroCidade.value = pegarParametro("cidade") || "";

const pontos = entidadesAprovadas();
for (let i = 0; i < pontos.length; i++) {
  const entidade = pontos[i];
  if (filtroCidade.value !== "" && entidade.cidade !== filtroCidade.value) {
    continue;
  }
  const necessidades = necessidadesDaEntidade(entidade.id);
  let urgentes = "";
  for (let j = 0; j < necessidades.length; j++) {
    if (necessidades[j].prioridade === "urgente") {
      urgentes += `<li>${necessidades[j].item}</li>`;
    }
  }
  if (urgentes === "") {
    urgentes = '<li class="vazio">Nenhuma</li>';
  }
  tabela.innerHTML += `
    <tr>
      <td><a href="instituicao.html?id=${entidade.id}" class="cartao-titulo">${entidade.nome}</a><br><span class="texto-suave">${entidade.causa} · ${entidade.cidade}</span></td>
      <td>${entidade.endereco}</td>
      <td>${entidade.horario}</td>
      <td><ul class="lista-necessidades">${urgentes}</ul></td>
    </tr>
  `;
}

if (tabela.innerHTML === "") {
  tabela.innerHTML = '<tr><td colspan="4" class="vazio">Nenhum ponto de coleta cadastrado nessa cidade. Considere divulgar a campanha para entidades da região.</td></tr>';
}
