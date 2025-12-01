// Attach to the form submit and perform basic validation + robust error handling
const form = document.querySelector('form.cadastro-form') || document.querySelector('form')

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        await sendUser()
    })
} else {
    const button = document.querySelector('button')
    if (button) button.addEventListener('click', async (e) => { e.preventDefault(); await sendUser() })
}

async function sendUser() {
    const nameEl = document.querySelector('#nome')
    const emailEl = document.querySelector('#email')
    const passwordEl = document.querySelector('#senha')

    const name = nameEl ? nameEl.value.trim() : ''
    const email = emailEl ? emailEl.value.trim() : ''
    const password = passwordEl ? passwordEl.value : ''

    if (!name || !email || !password) {
        alert('Preencha todos os campos.')
        return
    }

    const user = { name, email, password }

    try {
        const res = await fetch('http://localhost:3333/cadastrar', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ user })
        })

        let data
        try { data = await res.json() } catch (e) { data = {} }

        if (!res.ok) {
            alert((data && data.message) ? data.message : 'Erro ao cadastrar usuário.')
            return
        }

        alert(data.message || 'Cadastro realizado com sucesso!')
        window.location.href = '../../index.html'

    } catch (err) {
        console.error('Erro na requisição de cadastro:', err)
        alert('Erro de rede ou servidor. Tente novamente mais tarde.')
    }
}