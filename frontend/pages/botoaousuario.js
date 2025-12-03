const user = JSON.parse(sessionStorage.getItem("user"))

const avatar = document.querySelector("#avatar")
const menu = document.querySelector("#menu-user")
const info = document.querySelector("#menu-info")
const logoutButton = document.querySelector("#logout")
const loginButton = document.querySelector("#btn-login") 

if (!user) {
    avatar.style.display = "none"
} else {

    if (loginButton) loginButton.style.display = "none"

    info.innerHTML = `
        <strong>${user.name}</strong><br>${user.email}
    `
    avatar.onclick = () => menu.classList.toggle("hidden")
}

logoutButton.onclick = () => {
    sessionStorage.removeItem("user")
    window.location.reload()
}
