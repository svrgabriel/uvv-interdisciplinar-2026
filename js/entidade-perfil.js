const usuario = protegerPagina("entidade");
const formPerfil = document.getElementById("form-perfil");
const campos = ["nome", "causa", "cidade", "cep", "endereco", "horario", "pix", "foto", "historia"];

document.getElementById("link-publico").href = "instituicao.html?id=" + usuario.entidadeId;

const minhaEntidade = buscarPorId(pegarEntidades(), usuario.entidadeId);
for (let i = 0; i < campos.length; i++) {
  document.getElementById(campos[i]).value = minhaEntidade[campos[i]];
}

formPerfil.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const entidades = pegarEntidades();
  const entidade = buscarPorId(entidades, usuario.entidadeId);
  for (let i = 0; i < campos.length; i++) {
    entidade[campos[i]] = document.getElementById(campos[i]).value.trim();
  }
  salvar("entidades", entidades);

  usuario.nome = entidade.nome;
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  document.getElementById("nome-usuario").textContent = "Olá, " + entidade.nome;
  document.getElementById("mensagem-perfil").textContent = "Perfil salvo!";
});
