const usuariosIniciais = [
  { usuario: "doador", senha: "doa#2026", perfil: "doador", nome: "Maria Doadora", inicio: "doador-buscar.html", entidadeId: 0, status: "ativo" },
  { usuario: "entidade", senha: "ent!2026", perfil: "entidade", nome: "Casa do Caminho", inicio: "entidade-necessidades.html", entidadeId: 1, status: "ativo" },
  { usuario: "defesacivil", senha: "dc$-2026", perfil: "defesacivil", nome: "Defesa Civil ES", inicio: "dc-painel.html", entidadeId: 0, status: "ativo" },
  { usuario: "admin", senha: "adm@2026", perfil: "admin", nome: "Administrador", inicio: "admin-aprovacoes.html", entidadeId: 0, status: "ativo" }
];

const entidadesIniciais = [
  {
    id: 1,
    nome: "Casa do Caminho",
    causa: "Abrigo infantil",
    cidade: "Vila Velha",
    endereco: "R. das Acácias, 120 - Praia de Itaparica, Vila Velha/ES",
    cep: "29102-010",
    horario: "Seg a Sex, 8h às 17h; Sáb, 8h às 12h",
    pix: "doacoes@casadocaminho.org",
    historia: "Fundada em 2009 por um grupo de vizinhos de Itaparica, a Casa do Caminho acolhe crianças em situação de vulnerabilidade, oferecendo moradia, alimentação e acompanhamento pedagógico. Hoje cuidamos de 38 crianças e adolescentes, e cada doação vira fralda, merenda e material escolar.",
    foto: "img/casa-do-caminho.jpg",
    lat: -20.3417,
    lng: -40.2913,
    status: "aprovada"
  },
  {
    id: 2,
    nome: "Banco de Alimentos ES",
    causa: "Segurança alimentar",
    cidade: "Vitória",
    endereco: "Av. Leitão da Silva, 500 - Centro, Vitória/ES",
    cep: "29050-000",
    horario: "Seg a Sex, 9h às 18h",
    pix: "pix@bancodealimentoses.org",
    historia: "Desde 2015 o Banco de Alimentos ES combate o desperdício coletando alimentos de supermercados e produtores da Grande Vitória e redistribuindo para mais de 60 entidades. Cada quilo doado chega à mesa de famílias em situação de insegurança alimentar.",
    foto: "img/banco-de-alimentos.jpg",
    lat: -20.3155,
    lng: -40.3128,
    status: "aprovada"
  },
  {
    id: 3,
    nome: "Amigos dos Animais UVV",
    causa: "Proteção animal",
    cidade: "Vila Velha",
    endereco: "R. Prof. Vamoré, 45 - Glória, Vila Velha/ES",
    cep: "29122-030",
    horario: "Todos os dias, 8h às 20h",
    pix: "pix@amigosdosanimais.org",
    historia: "O Amigos dos Animais UVV nasceu em 2018 entre alunos da Universidade Vila Velha que resgatavam animais abandonados no campus. Hoje mantemos um abrigo com mais de 80 cães e gatos esperando adoção, todos vacinados e castrados graças às doações.",
    foto: "img/amigos-dos-animais.jpg",
    lat: -20.3539,
    lng: -40.2967,
    status: "aprovada"
  },
  {
    id: 4,
    nome: "Lar São Vicente",
    causa: "Acolhimento de idosos",
    cidade: "Cariacica",
    endereco: "R. Expedito Garcia, 210 - Campo Grande, Cariacica/ES",
    cep: "29146-000",
    horario: "Seg a Sáb, 9h às 17h",
    pix: "pix@larsaovicente.org",
    historia: "O Lar São Vicente acolhe idosos sem rede de apoio familiar desde 1987, em Cariacica. São 52 moradores que recebem cuidado diário, alimentação balanceada e companhia. Fraldas e suplementos são nossa maior despesa e é onde sua doação faz mais diferença.",
    foto: "img/lar-sao-vicente.jpg",
    lat: -20.2632,
    lng: -40.4198,
    status: "aprovada"
  },
  {
    id: 5,
    nome: "Abrigo Esperança",
    causa: "Acolhimento de desabrigados",
    cidade: "Cachoeiro de Itapemirim",
    endereco: "R. Moreira, 88 - Centro, Cachoeiro de Itapemirim/ES",
    cep: "29300-100",
    horario: "Todos os dias, 7h às 22h",
    pix: "pix@abrigoesperanca.org",
    historia: "O Abrigo Esperança recebe famílias que perderam suas casas em enchentes e deslizamentos no sul do estado. Durante as chuvas chegamos a acolher mais de 200 pessoas, e precisamos de água, colchões e kits de higiene para atender a todos.",
    foto: "img/abrigo-esperanca.jpg",
    lat: -20.8489,
    lng: -41.1129,
    status: "aprovada"
  },
  {
    id: 6,
    nome: "Projeto Mãos Dadas",
    causa: "Apoio a famílias",
    cidade: "Serra",
    endereco: "Av. Talma Rodrigues, 300 - Laranjeiras, Serra/ES",
    cep: "29165-130",
    horario: "Seg a Sex, 8h às 16h",
    pix: "pix@maosdadas.org",
    historia: "Grupo de voluntários que distribui cestas básicas e roupas para famílias de baixa renda da Serra.",
    foto: "img/maos-dadas.jpg",
    lat: -20.1286,
    lng: -40.3077,
    status: "pendente"
  },
  {
    id: 7,
    nome: "Instituto Recomeçar",
    causa: "Geração de renda",
    cidade: "Linhares",
    endereco: "R. Rufino de Carvalho, 77 - Centro, Linhares/ES",
    cep: "29900-030",
    horario: "Seg a Sex, 13h às 18h",
    pix: "pix@recomecar.org",
    historia: "Oferecemos cursos profissionalizantes e apoio a famílias atingidas pela seca no norte do Espírito Santo.",
    foto: "img/instituto-recomecar.jpg",
    lat: -19.3911,
    lng: -40.0722,
    status: "pendente"
  }
];

const necessidadesIniciais = [
  { id: 1, entidadeId: 1, item: "Fraldas infantis", prioridade: "urgente" },
  { id: 2, entidadeId: 1, item: "Leite em pó", prioridade: "alta" },
  { id: 3, entidadeId: 1, item: "Material escolar", prioridade: "normal" },
  { id: 4, entidadeId: 2, item: "Arroz e feijão", prioridade: "urgente" },
  { id: 5, entidadeId: 2, item: "Óleo de cozinha", prioridade: "alta" },
  { id: 6, entidadeId: 2, item: "Produtos de higiene", prioridade: "normal" },
  { id: 7, entidadeId: 3, item: "Ração para cães e gatos", prioridade: "urgente" },
  { id: 8, entidadeId: 3, item: "Medicamentos veterinários", prioridade: "alta" },
  { id: 9, entidadeId: 3, item: "Cobertores", prioridade: "normal" },
  { id: 10, entidadeId: 4, item: "Fraldas geriátricas", prioridade: "alta" },
  { id: 11, entidadeId: 4, item: "Suplementos nutricionais", prioridade: "alta" },
  { id: 12, entidadeId: 4, item: "Roupas de cama", prioridade: "normal" },
  { id: 13, entidadeId: 5, item: "Água potável", prioridade: "urgente" },
  { id: 14, entidadeId: 5, item: "Kits de higiene", prioridade: "urgente" },
  { id: 15, entidadeId: 5, item: "Colchões", prioridade: "alta" }
];

const campanhasIniciais = [
  {
    id: 1,
    titulo: "SOS Enchente Cachoeiro",
    tipo: "Enchente",
    cidade: "Cachoeiro de Itapemirim",
    descricao: "As chuvas dos últimos dias deixaram mais de 500 famílias desalojadas. Os pontos de coleta estão recebendo doações todos os dias.",
    itens: "Água potável, alimentos não perecíveis, colchões, kits de higiene",
    nivel: "Alto",
    entidadeId: 0,
    status: "ativa"
  },
  {
    id: 2,
    titulo: "Seca no Norte Capixaba",
    tipo: "Seca",
    cidade: "Linhares",
    descricao: "A estiagem prolongada afeta produtores rurais e comunidades do interior de Linhares.",
    itens: "Água potável, cestas básicas",
    nivel: "Médio",
    entidadeId: 0,
    status: "ativa"
  },
  {
    id: 3,
    titulo: "Deslizamento no Morro do Quadro",
    tipo: "Deslizamento",
    cidade: "Vitória",
    descricao: "Famílias foram retiradas de áreas de risco e estão em abrigos temporários.",
    itens: "Roupas, cobertores, alimentos",
    nivel: "Baixo",
    entidadeId: 0,
    status: "encerrada"
  },
  {
    id: 4,
    titulo: "Inverno Solidário",
    tipo: "Campanha social",
    cidade: "Vila Velha",
    descricao: "Arrecadação de agasalhos e cobertores para as crianças da Casa do Caminho.",
    itens: "Cobertores, agasalhos infantis, meias",
    nivel: "",
    entidadeId: 1,
    status: "ativa"
  },
  {
    id: 5,
    titulo: "Volta às Aulas",
    tipo: "Campanha social",
    cidade: "Vila Velha",
    descricao: "Kits de material escolar para o próximo ano letivo.",
    itens: "Cadernos, lápis, mochilas",
    nivel: "",
    entidadeId: 1,
    status: "pendente"
  }
];

const doacoesIniciais = [
  { id: 1, usuario: "doador", doador: "Maria Doadora", entidadeId: 1, item: "Leite em pó", quantidade: "6", unidade: "latas", forma: "Entregar no local", data: "2026-11-10", status: "recebida" },
  { id: 2, usuario: "doador", doador: "Maria Doadora", entidadeId: 3, item: "Ração para cães e gatos", quantidade: "10", unidade: "kg", forma: "Entregar no local", data: "2026-11-18", status: "aguardando" },
  { id: 3, usuario: "", doador: "João Pereira", entidadeId: 1, item: "Fraldas infantis", quantidade: "3", unidade: "pacotes", forma: "Solicitar coleta", data: "2026-11-16", status: "aguardando" },
  { id: 4, usuario: "", doador: "Ana Souza", entidadeId: 1, item: "Dinheiro", quantidade: "50", unidade: "reais", forma: "Pix", data: "2026-11-05", status: "recebida" },
  { id: 5, usuario: "", doador: "Carlos Lima", entidadeId: 5, item: "Água potável", quantidade: "20", unidade: "L", forma: "Entregar no local", data: "2026-11-12", status: "recebida" }
];

const nomesStatus = {
  aprovada: "Aprovada",
  pendente: "Pendente",
  recusada: "Recusada",
  suspensa: "Suspensa",
  ativa: "Ativa",
  ativo: "Ativo",
  encerrada: "Encerrada",
  aguardando: "Aguardando entrega",
  recebida: "Recebida",
  cancelada: "Cancelada"
};

function carregar(chave, listaInicial) {
  const texto = localStorage.getItem(chave);
  if (texto === null) {
    localStorage.setItem(chave, JSON.stringify(listaInicial));
    return listaInicial;
  }
  return JSON.parse(texto);
}

function salvar(chave, lista) {
  localStorage.setItem(chave, JSON.stringify(lista));
}

function pegarUsuarios() {
  return carregar("usuarios", usuariosIniciais);
}

function buscarUsuario(nomeUsuario) {
  const lista = pegarUsuarios();
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].usuario === nomeUsuario) {
      return lista[i];
    }
  }
  return null;
}

function pegarEntidades() {
  return carregar("entidades", entidadesIniciais);
}

function pegarNecessidades() {
  return carregar("necessidades", necessidadesIniciais);
}

function pegarCampanhas() {
  return carregar("campanhas", campanhasIniciais);
}

function pegarDoacoes() {
  return carregar("doacoes", doacoesIniciais);
}

function novoId(lista) {
  let maior = 0;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id > maior) {
      maior = lista[i].id;
    }
  }
  return maior + 1;
}

function buscarPorId(lista, id) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === id) {
      return lista[i];
    }
  }
  return null;
}

function entidadesAprovadas() {
  const entidades = pegarEntidades();
  const aprovadas = [];
  for (let i = 0; i < entidades.length; i++) {
    if (entidades[i].status === "aprovada") {
      aprovadas.push(entidades[i]);
    }
  }
  return aprovadas;
}

function campanhasAtivas() {
  const campanhas = pegarCampanhas();
  const entidades = pegarEntidades();
  const ativas = [];
  for (let i = 0; i < campanhas.length; i++) {
    if (campanhas[i].status !== "ativa") {
      continue;
    }
    if (campanhas[i].entidadeId !== 0) {
      const entidade = buscarPorId(entidades, campanhas[i].entidadeId);
      if (entidade === null || entidade.status !== "aprovada") {
        continue;
      }
    }
    ativas.push(campanhas[i]);
  }
  return ativas;
}

function ordemPrioridade(prioridade) {
  if (prioridade === "urgente") {
    return 0;
  }
  if (prioridade === "alta") {
    return 1;
  }
  return 2;
}

function necessidadesDaEntidade(entidadeId) {
  const necessidades = pegarNecessidades();
  const lista = [];
  for (let i = 0; i < necessidades.length; i++) {
    if (necessidades[i].entidadeId === entidadeId) {
      lista.push(necessidades[i]);
    }
  }
  lista.sort(function (a, b) {
    return ordemPrioridade(a.prioridade) - ordemPrioridade(b.prioridade);
  });
  return lista;
}

function nomePrioridade(prioridade) {
  if (prioridade === "urgente") {
    return "Urgente";
  }
  if (prioridade === "alta") {
    return "Alta";
  }
  return "Normal";
}

function seloPrioridade(prioridade) {
  return '<span class="selo selo-' + prioridade + '">' + nomePrioridade(prioridade) + "</span>";
}

function seloNivel(nivel) {
  let classe = "baixo";
  if (nivel === "Alto") {
    classe = "alto";
  } else if (nivel === "Médio") {
    classe = "medio";
  }
  return '<span class="selo selo-nivel-' + classe + '">Alerta ' + nivel + "</span>";
}

function seloStatus(status) {
  return '<span class="selo selo-status-' + status + '">' + nomesStatus[status] + "</span>";
}

function nomeOrigem(campanha) {
  if (campanha.entidadeId === 0) {
    return "Defesa Civil";
  }
  const entidade = buscarPorId(pegarEntidades(), campanha.entidadeId);
  if (entidade === null) {
    return "Entidade";
  }
  return entidade.nome;
}

function formatarData(data) {
  if (!data) {
    return "-";
  }
  const partes = data.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

function dataDeHoje() {
  const agora = new Date();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  return agora.getFullYear() + "-" + mes + "-" + dia;
}

function linkMapa(lat, lng) {
  const esquerda = lng - 0.01;
  const direita = lng + 0.01;
  const baixo = lat - 0.006;
  const cima = lat + 0.006;
  return "https://www.openstreetmap.org/export/embed.html?bbox=" + esquerda + "," + baixo + "," + direita + "," + cima + "&layer=mapnik&marker=" + lat + "," + lng;
}

function pegarParametro(nome) {
  const parametros = new URLSearchParams(window.location.search);
  return parametros.get(nome);
}

function usuarioLogado() {
  const texto = localStorage.getItem("usuarioLogado");
  if (texto === null) {
    return null;
  }
  return JSON.parse(texto);
}

function protegerPagina(perfil) {
  const usuario = usuarioLogado();
  if (usuario === null || usuario.perfil !== perfil) {
    window.location.href = "login.html";
    return null;
  }
  document.getElementById("nome-usuario").textContent = "Olá, " + usuario.nome;
  return usuario;
}
