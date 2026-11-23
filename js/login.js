localStorage.removeItem("usuarioLogado");

const formLogin = document.getElementById("form-login");

formLogin.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value;
  const mensagem = document.getElementById("mensagem-login");

  const encontrado = buscarUsuario(usuario);
  if (encontrado === null || encontrado.senha !== senha) {
    mensagem.textContent = "Usuário ou senha inválidos.";
    return;
  }

  let status = encontrado.status;
  if (encontrado.perfil === "entidade") {
    const entidade = buscarPorId(pegarEntidades(), encontrado.entidadeId);
    status = entidade === null ? "recusada" : entidade.status;
  }
  if (status === "pendente") {
    mensagem.textContent = "Seu cadastro ainda está aguardando a aprovação do administrador.";
    return;
  }
  if (status === "recusada" || status === "suspensa") {
    mensagem.textContent = "Seu cadastro não está liberado. Fale com o administrador.";
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
