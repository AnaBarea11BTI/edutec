const user = sessionStorage.getItem("user");
if (!user || user === "undefined") {
  aviso("Você precisa estar logado para jogar!");

  setTimeout(() => {
    window.location.href = "/frontend/pages/login.html";
  }, 1500);
}

document.addEventListener("DOMContentLoaded", function () {
  const btnConteudo = document.getElementById("btn-conteudo");
  const dropdownMenu = document.getElementById("dropdown-menu");

  if (btnConteudo && dropdownMenu) {
    btnConteudo.addEventListener("click", function (e) {
      e.preventDefault();
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });
  }

  document.addEventListener("click", function (e) {
    if (
      dropdownMenu &&
      !dropdownMenu.contains(e.target) &&
      btnConteudo &&
      !btnConteudo.contains(e.target)
    ) {
      dropdownMenu.style.display = "none";
    }
  });
});

const temas = ['amazonia', 'igapo', 'savana', 'terra', 'varzea'];

function getTemaAtualFromURL() {
  const path = window.location.pathname;
  const parts = path.split('/').filter(Boolean);
  if (parts.length > 2 && parts[1] === 'quiz') {
    return parts[2];
  }
  return '';
}

function criarOrdemAPartirDe(inicio) {
  const idx = temas.indexOf(inicio);
  if (idx === -1) return [...temas];
  return [...temas.slice(idx), ...temas.slice(0, idx)];
}

function iniciarQuiz(temaEscolhido) {
  const ordemQuiz = criarOrdemAPartirDe(temaEscolhido);
  localStorage.setItem('ordemQuiz', JSON.stringify(ordemQuiz));
  localStorage.setItem('temasCompletados', JSON.stringify([]));
  localStorage.removeItem('temaRecemConcluido');
  localStorage.setItem('temaInicial', temaEscolhido);
  window.location.href = `/edutec/quiz/${temaEscolhido}/${temaEscolhido}-quiz.html`;
}

function finalizarQuizAtual() {
  const temaAtual = getTemaAtualFromURL();
  let temasCompletados = JSON.parse(localStorage.getItem('temasCompletados')) || [];
  const ordemQuiz = JSON.parse(localStorage.getItem('ordemQuiz')) || [];

  if (!temasCompletados.includes(temaAtual)) {
    temasCompletados.push(temaAtual);
    localStorage.setItem('temasCompletados', JSON.stringify(temasCompletados));
  }

  if (temasCompletados.length >= ordemQuiz.length) {
    localStorage.clear();
    window.location.href = '/edutec/quiz/finalizacao/todos-finalizados.html';
  } else {
    window.location.href = "/edutec/quiz/finalizacao/finalizado.html";
  }
}

function proximoQuiz() {
  const ordemQuiz = JSON.parse(localStorage.getItem('ordemQuiz')) || [];
  const temasCompletados = JSON.parse(localStorage.getItem('temasCompletados')) || [];

  const proximoTema = ordemQuiz.find(t => !temasCompletados.includes(t));

  if (proximoTema) {
    window.location.href = `/edutec/quiz/${proximoTema}/${proximoTema}-quiz.html`;
  } else {
    localStorage.clear();
    window.location.href = '/edutec/quiz/finalizacao/todos-finalizados.html';
  }
}

function aviso(msg) {
  const el = document.getElementById("aviso");
  el.innerText = msg;
  el.classList.add("show");

  setTimeout(() => {
    el.classList.remove("show");
  }, 3000);
}

const userBotao = sessionStorage.getItem("user");
const botao = document.getElementById("btnJogar");

if(!user){
   botao.style.display = "none";
}
