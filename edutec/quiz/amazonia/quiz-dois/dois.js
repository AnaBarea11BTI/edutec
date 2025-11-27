document.addEventListener('DOMContentLoaded', () => {
  const opcoes = document.querySelectorAll('.opcao');
  let clicado = false; 

  opcoes.forEach(opcao => {
    opcao.addEventListener('click', () => {
      if (clicado) {
        return;
      }
      clicado = true; 

      const isCorrect = opcao.getAttribute('data-resposta') === 'correta';

      if (isCorrect) {
        opcao.classList.add('correta');
      } else {
        opcao.classList.add('errada');
      }

      setTimeout(() => {
        if (isCorrect) {
          window.location.href = '../quiz-tres/tres.html';
        } else {
          window.location.href = '../resposta-errada/questao.html?origem=2';
        }
      }, 1000); 
    });
  });
});
