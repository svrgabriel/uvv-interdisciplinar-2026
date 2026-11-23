localStorage.removeItem("usuarioLogado");

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

const botoesCopiar = document.querySelectorAll(".copiar");

for (let i = 0; i < botoesCopiar.length; i++) {
  botoesCopiar[i].addEventListener("click", function () {
    const botao = botoesCopiar[i];
    const texto = botao.dataset.texto;
    navigator.clipboard.writeText(texto).then(function () {
      botao.textContent = "Copiado!";
      setTimeout(function () {
        botao.textContent = texto;
      }, 1500);
    });
  });
}
