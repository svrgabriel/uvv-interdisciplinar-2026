const formCadastro = document.getElementById("form-cadastro");

formCadastro.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const entidades = pegarEntidades();
  entidades.push({
    id: novoId(entidades),
    nome: document.getElementById("nome").value.trim(),
    causa: document.getElementById("causa").value,
    cidade: document.getElementById("cidade").value,
    cep: document.getElementById("cep").value.trim(),
    endereco: document.getElementById("endereco").value.trim(),
    horario: document.getElementById("horario").value.trim(),
    pix: document.getElementById("pix").value.trim(),
    historia: document.getElementById("historia").value.trim(),
    foto: "img/entidade-padrao.jpg",
    lat: null,
    lng: null,
    status: "pendente"
  });
  salvar("entidades", entidades);
  alert("Cadastro enviado! Aguarde a aprovação do administrador.");
  window.location.href = "index.html";
});
