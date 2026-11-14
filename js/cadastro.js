const formCadastro = document.getElementById("form-cadastro");

formCadastro.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const entidades = pegarEntidades();
  const nova = {
    id: novoId(entidades),
    nome: document.getElementById("nome").value.trim(),
    causa: document.getElementById("causa").value.trim(),
    cidade: document.getElementById("cidade").value.trim(),
    endereco: document.getElementById("endereco").value.trim(),
    cep: document.getElementById("cep").value.trim(),
    horario: document.getElementById("horario").value.trim(),
    pix: document.getElementById("pix").value.trim(),
    historia: document.getElementById("historia").value.trim(),
    foto: "img/entidade-padrao.jpg",
    lat: null,
    lng: null,
    status: "pendente"
  };
  entidades.push(nova);
  salvar("entidades", entidades);
  formCadastro.reset();
  document.getElementById("mensagem-cadastro").textContent = "Cadastro enviado! Aguarde a aprovação do administrador.";
});
