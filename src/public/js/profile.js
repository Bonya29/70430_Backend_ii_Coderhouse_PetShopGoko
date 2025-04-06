async function getUserData() {
    const fullname = document.getElementById('fullname')
    const gender = document.getElementById('gender')
    const email = document.getElementById('email')
    const age = document.getElementById('age')
    const role = document.getElementById('role')
    
    const response = await fetch('/api/sessions/current', {
        method: 'GET',
        credentials: 'include'
    })

    const data = await response.json()
    const user = data.user

    fullname.textContent = user.first_name + ' ' + user.last_name
    gender.textContent = user.gender
    email.textContent = user.email
    age.textContent = user.age
    role.textContent = user.role
}

async function logout() {
    await fetch('/api/sessions/logout', {
        method: 'POST',
        credentials: 'include'
    })
    .then(() => window.location.href = '/login')
}

async function deleteUser() {
    const response = await fetch('/api/sessions/current', {
        method: 'GET',
        credentials: 'include'
    })

    const data = await response.json()
    const user = data.user
    
    Swal.fire({
        title: "Confirmar Eliminación",
        html: `¿Estas seguro que quieres eliminar tu cuenta?<br>Se borraran todos tus datos.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
    })
    .then( async (result) => {
        if (result.isConfirmed) {
            await fetch('/api/sessions/deleteAccount/' + user.id, {
                method: 'DELETE',
                credentials: 'include'
            })
            .then(() => Swal.fire({
                title: "Cuenta Eliminada!",
                text: "Tu cuenta ha sido eliminada con exito",
                icon: "success"
                })
                .then(() => logout())
            )
        }
    })
}



document.addEventListener('DOMContentLoaded', getUserData)