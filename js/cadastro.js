const tipoDaUrl = pegarParametro("tipo");
if (tipoDaUrl === "entidade" || tipoDaUrl === "dc" || tipoDaUrl === "doador") {
  document.getElementById("tipo-" + tipoDaUrl).checked = true;
}

function valor(id) {
  return document.getElementById(id).value.trim();
}

function conferirAcesso(prefixo) {
  const mensagem = document.getElementById(prefixo + "-mensagem");
  if (buscarUsuario(valor(prefixo + "-usuario")) !== null) {
    mensagem.textContent = "Esse usuário já existe. Escolha outro.";
    return false;
  }
  if (document.getElementById(prefixo + "-senha").value !== document.getElementById(prefixo + "-confirmar").value) {
    mensagem.textContent = "As senhas não são iguais.";
    return false;
  }
  mensagem.textContent = "";
  return true;
}

function salvarUsuario(novo) {
  const lista = pegarUsuarios();
  lista.push(novo);
  salvar("usuarios", lista);
}

document.getElementById("form-doador").addEventListener("submit", function (evento) {
  evento.preventDefault();
  if (!conferirAcesso("doador")) {
    return;
  }
  salvarUsuario({
    usuario: valor("doador-usuario"),
    senha: document.getElementById("doador-senha").value,
    perfil: "doador",
    nome: valor("doador-nome"),
    cidade: valor("doador-cidade"),
    email: valor("doador-email"),
    inicio: "doador-buscar.html",
    entidadeId: 0,
    status: "ativo"
  });
  alert("Cadastro criado! Agora é só entrar com seu usuário e senha.");
  window.location.href = "login.html";
});

document.getElementById("form-dc").addEventListener("submit", function (evento) {
  evento.preventDefault();
  if (!conferirAcesso("dc")) {
    return;
  }
  salvarUsuario({
    usuario: valor("dc-usuario"),
    senha: document.getElementById("dc-senha").value,
    perfil: "defesacivil",
    nome: valor("dc-nome"),
    cidade: valor("dc-cidade"),
    responsavel: valor("dc-responsavel"),
    telefone: valor("dc-telefone"),
    inicio: "dc-painel.html",
    entidadeId: 0,
    status: "pendente"
  });
  alert("Cadastro enviado! Aguarde a aprovação do administrador.");
  window.location.href = "index.html";
});

document.getElementById("form-entidade").addEventListener("submit", function (evento) {
  evento.preventDefault();
  if (!conferirAcesso("ent")) {
    return;
  }
  const entidades = pegarEntidades();
  const novaEntidade = {
    id: novoId(entidades),
    nome: valor("nome"),
    causa: valor("causa"),
    cidade: valor("cidade"),
    cep: valor("cep"),
    endereco: valor("endereco"),
    horario: valor("horario"),
    pix: valor("pix"),
    historia: valor("historia"),
    foto: "img/entidade-padrao.jpg",
    lat: null,
    lng: null,
    status: "pendente"
  };
  entidades.push(novaEntidade);
  salvar("entidades", entidades);
  salvarUsuario({
    usuario: valor("ent-usuario"),
    senha: document.getElementById("ent-senha").value,
    perfil: "entidade",
    nome: novaEntidade.nome,
    inicio: "entidade-necessidades.html",
    entidadeId: novaEntidade.id,
    status: "ativo"
  });
  alert("Cadastro enviado! Aguarde a aprovação do administrador.");
  window.location.href = "index.html";
});
