const main = document.querySelector("main")

async function receberMensagemDoBackend(){
    const response = await fetch("http://localhost:3333").then(response => response.json())

    response.map((persons) =>{
    main.innerHTML += `
    <section>
    <h2>Nome: ${persons.name}</h2>
    <p>E-mail: ${persons.email}</p>
    </section>
      `
      })
}

receberMensagemDoBackend()