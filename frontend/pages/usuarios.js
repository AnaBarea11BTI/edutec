const main = document.querySelector("main")

async function receberMensagemDoBackend(){
    const response = await fetch("https://edutec-backend-liard.vercel.app/").then(response => response.json())

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