const formLogin = document.getElementById("form-login");

formLogin.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value;
  const mensagem = document.getElementById("mensagem-login");

  let encontrado = null;
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].usuario === usuario && usuarios[i].senha === senha) {
      encontrado = usuarios[i];
    }
  }

  if (encontrado === null) {
    mensagem.textContent = "Usuário ou senha inválidos.";
    return;
  }

  const sessao = {
    usuario: encontrado.usuario,
    perfil: encontrado.perfil,
    nome: encontrado.nome,
    inicio: encontrado.inicio,
    entidadeId: encontrado.entidadeId
  };
  localStorage.setItem("usuarioLogado", JSON.stringify(sessao));
  window.location.href = encontrado.inicio;
});
