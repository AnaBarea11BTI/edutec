const form = document.querySelector(".cadastro-form");
const mensagemErroEl = document.getElementById("mensagemErro");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  mensagemErroEl.innerText = ""; // limpa mensagens

  const name = document.querySelector("#nome").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#senha").value;

  // validação de campos vazios
  if (!name || !email || !password) {
    mensagemErroEl.innerText = "Preencha todos os campos.";
    return;
  }

  try {
    const response = await fetch("http://localhost:3333/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: { name, email, password } })
    });

    const data = await response.json();

    // email já existente — backend deve devolver !response.ok
    if (!response.ok) {
      mensagemErroEl.innerText =
        data.error || data.message || "Erro ao cadastrar.";
      return;
    }

    alert("Cadastro realizado com sucesso!");
    window.location.href = "../../index.html";

  } catch (err) {
    console.error(err);
    mensagemErroEl.innerText = "Erro ao conectar com o servidor.";
  }
});
