// Attach the handler to the form submit event instead of a generic button
const form = document.querySelector('form.cadastro-form') || document.querySelector('form')

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        await login()
    })
} else {
    // fallback: attach to first button if form is not found
    const button = document.querySelector('button')
    if (button) button.addEventListener('click', async (e) => { e.preventDefault(); await login() })
}

async function login() {
    const emailEl = document.querySelector('#email')
    const passwordEl = document.querySelector('#senha')

    const email = emailEl ? emailEl.value.trim() : ''
    const password = passwordEl ? passwordEl.value : ''

    if (!email || !password) {
        alert('Por favor preencha email e senha.')
        return
    }

    const user = { email, password }

    try {
        const res = await fetch('http://localhost:3333/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user })
        })

        // Try to parse JSON even on non-2xx responses
        let data
        try { data = await res.json() } catch (e) { data = {} }

        if (!res.ok) {
            // backend likely sends { message: '...' } on errors
            const message = data && data.message ? data.message : 'Erro ao fazer login.'
            alert(message)
            return
        }

        // Backend may return user info directly or inside a 'user' field and may include a token.
        const payload = data.user || data
        const id = payload.id || data.id
        const name = payload.name || data.name

        if (data.token) sessionStorage.setItem('token', data.token)

        if (id || name) sessionStorage.setItem('user', JSON.stringify({ id, name }))

        alert('Login realizado com sucesso!')
        window.location.href = '../../index.html'

    } catch (err) {
        console.error('Erro na requisição de login:', err)
        alert('Erro de rede ou servidor. Tente novamente mais tarde.')
    }
}
