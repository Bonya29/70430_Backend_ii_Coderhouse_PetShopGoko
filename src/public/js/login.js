async function userLogin() {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    if (!email || !password) {
        return Swal.fire({
            title: "Campos Incompletos",
            text: "Todos los campos son obligatorios",
            icon: "error",
        })
    }
    let formData = { email, password }
    try {
        let response = await fetch('/api/sessions/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        if (!response.ok) {
            let errorData = await response.json()
            throw new Error(errorData.error)
        }

        Swal.fire({
            title: "Login Exitoso",
            text: "Has iniciado sesión con exito",
            icon: "success"
        })
        .then(() => {
            window.location.href = '/home'
        })
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
        })
        console.error("Error al iniciar sesión:", error)
    }    
}

function info() {
    Swal.fire({
        title: "Usuarios para ingresar a current",
        html: "<strong>Admin 1:</strong><br>Email: admin1@example.com <br>Contraseña: qwer1234 <br><br><strong>Admin 2:</strong><br>Email: admin2@example.com <br>Contraseña: 1234qwer",
        icon: "info"
    })
}