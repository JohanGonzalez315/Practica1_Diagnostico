const getUsers = () => {

    fetch("https://reqres.in/api/users?page=2")
        .then(response => {
            const result = response.json()
            result.then(data => {
                const users = data.data
                let tbody = document.getElementById("bodyTable")
                let html = ""
                users.forEach(user => {
                    html +=
                        `
                    <tr>
                        <td>${user.id}</td>
                    <td>${user.email}</td>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td><img src='${user.avatar}'></td>
                    <td>
                    <button type="button" class="btn btn-danger" onclick=(removeUser(${user.id}))>Delete</button>
                    <button type="button" class="btn btn-info" onclick=(updateUser(${user.id}))>Modify</button>
                    </td>
                    </tr>
                    `
                })
                tbody.innerHTML = html
            })

        }).catch(error => {
            console.log("Error: ", error);
        })

}

const createUser = () => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let data = JSON.stringify({
        "name": "morpheus",
        "job": "leader"
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
    };

    fetch("https://reqres.in/api/users", requestOptions)
        .then(response => {
            alert(`Se creo correctamente el usuario. Código de status: ${response.status}`)
        })
        .catch(error => console.log('error', error))

}


const updateUser = (id) => {
    let data = {
        name: "morpheusUPDATE",
        job: "leaderUPDATE"
    }

    fetch(`https://reqres.in/api/users/${id}`, { method: "put", body: data })
    .then(response => {
        alert(`Actualización exitosa. Código de status: ${response.status}`)
    })
}

const removeUser = (id) => {
    fetch(`https://reqres.in/api/users/${id}`, { method: "delete"})
    .then(response => {
        alert(`Eliminación exitosa. Código de status: ${response.status}`)
    })
}

getUsers()
