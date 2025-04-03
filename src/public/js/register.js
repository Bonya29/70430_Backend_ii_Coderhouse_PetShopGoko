async function registerUser() {
    let first_name = document.getElementById('first_name').value
    let last_name = document.getElementById('last_name').value
    let gender = document.getElementById('gender').value
    let age = document.getElementById('age').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    if (!first_name || !last_name || !age || !email || !password) {
        return Swal.fire({
            title: "Campos Incompletos",
            text: "Todos los campos son obligatorios.",
            icon: "error",
        })
    }
    if (age < 13) {
        return Swal.fire({
            title: "Edad Insuficiente",
            text: "Lo sentimos, debes ser mayor de 13 años para registrarte.",
            icon: "error",
        })
    }
    let userData = { first_name, last_name, gender, age, email, password }
    try {
        let response = await fetch('/api/sessions/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            let errorData = await response.json()
            throw new Error(errorData.error)
        }

        Swal.fire({
            title: "Cuenta Creada",
            text: "Tu cuenta ha sido creada con exito, ahora puedes iniciar sesión.",
            icon: "success",
        })
        .then(() => {
            window.location.href = '/login'
        })
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
        })
        console.error("Error en el registro:", error)
    }
}