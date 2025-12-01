const main = document.querySelector('main')

async function receberMensagemDoBackend() {
  try {
    const res = await fetch('http://localhost:3333')
    if (!res.ok) {
      console.error('Erro ao buscar usuários:', res.status)
      return
    }
    const response = await res.json()

    if (!Array.isArray(response)) return

    response.forEach((person) => {
      main.innerHTML += `
    <section>
      <h2>Nome: ${person.name}</h2>
      <p>E-mail: ${person.email}</p>
    </section>`
    })
  } catch (err) {
    console.error('Erro de rede ao buscar usuários:', err)
  }
}

receberMensagemDoBackend()