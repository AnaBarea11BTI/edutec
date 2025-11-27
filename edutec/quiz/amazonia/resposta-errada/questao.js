document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const origem = urlParams.get('origem');

  const btnProxima = document.querySelector('.proxima');
  const btnVoltar = document.querySelector('.voltar');

  if (origem === '1') {
    btnVoltar.addEventListener('click', () => { window.location.href = '../quiz-um/um.html'; });
    btnProxima.addEventListener('click', () => { window.location.href = '../quiz-dois/dois.html'; });
  } else if (origem === '2') {
    btnVoltar.addEventListener('click', () => { window.location.href = '../quiz-dois/dois.html'; });
    btnProxima.addEventListener('click', () => { window.location.href = '../quiz-tres/tres.html'; });
  } else if (origem === '3') {
    btnVoltar.addEventListener('click', () => { window.location.href = '../quiz-tres/tres.html'; });
    btnProxima.addEventListener('click', () => { window.location.href = '../quiz-quatro/quatro.html'; });
  } else if (origem === '4') {
    btnVoltar.addEventListener('click', () => { window.location.href = '../quiz-quatro/quatro.html'; });
    btnProxima.addEventListener('click', () => { window.location.href = '../../finalizacao/finalizado.html'; });
  }
});
