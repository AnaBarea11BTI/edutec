document.addEventListener('DOMContentLoaded', () => {
  const opcoes = document.querySelectorAll('.opcao');
  let clicado = false; 

  opcoes.forEach(opcao => {
    opcao.addEventListener('click', () => {
      if (clicado) return;
      clicado = true;

      const isCorrect = opcao.getAttribute('data-resposta') === 'correta';
      opcao.classList.add(isCorrect ? 'correta' : 'errada');

      setTimeout(() => {
        if (isCorrect) {
          finalizarQuizAtual(); 
        } else {
          window.location.href = './resposta-errada/questao.html?origem=4';
        }
      }, 1000);
    });
  });
});
