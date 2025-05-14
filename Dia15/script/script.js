const url = 'https://api.petfinder.com/v2/oauth2/token';
const clientId = 'DczQAGrbe93sx4PUhQOPs3DzMiwrRizXSbabgidWcMBMu9wSQj';  // Reemplázalo con tu Client ID
const clientSecret = 'nlQmb9g7TQZsH3dnCTqUzw8JrKssiS9IZFV5AVGt';  // Reemplázalo con tu Client Secret
data = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret
    })
axios.post(url, data, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }, 
})
.then((response)=>{
    console.log(response)
    console.log('Token recibido:', response.data.access_token);
    obtenerAnimales(response.data.access_token);  // Llamamos la función para obtener datos con el token
})

function obtenerAnimales(token) {
    axios.get('https://api.petfinder.com/v2/animals?type=dog&location=pr&distance=50', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
.then(response => {
    console.log(response.data);
        mostrarAnimales(response.data);
})
}



// let token = null;
// let expiresIn = 3600; // Duración predeterminada en segundos

// async function obtenerToken() {
//     const url = 'https://api.petfinder.com/v2/oauth2/token';
//     const clientId = 'TU_CLIENT_ID';  // Reemplázalo con tu Client ID
//     const clientSecret = 'TU_CLIENT_SECRET';  // Reemplázalo con tu Client Secret
//     let datica = new URLSearchParams({
//             grant_type: 'client_credentials',
//             client_id: clientId,
//             client_secret: clientSecret
//         })
//     axios.post(url, datica, {
//         headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
    
//     })
//     .then((response)=>{
//         console.log(response)
//         console.log('Token recibido:', response.data.access_token);
//         obtenerAnimales(response.data.access_token);  // Llamamos la función para obtener datos con el token
//     })
// }

// Llamar a la función por primera vez

function mostrarAnimales(datica) {
       let mostrar = document.getElementById('informacion');
       mostrar.innerHTML = '';
 for (let i = 0; i <datica.animals.length; i++) {
        const animal = datica.animals[i];
        console.log(`Nombre: ${animal.name}`);
        console.log(`Especie: ${animal.species}`);
        console.log(`Raza: ${animal.breed}`);
        console.log(`Edad: ${animal.age}`);
        mostrar.innerHTML += `
        <div style="display: flex;flex-direction:row; padding:5vw; font-size: 16px; position: relative;width: 7vw;height: 30vh;background-color: rgb(206, 218, 206);top: 15vh;left: 5vw;border-radius: 2vw; margin: 10px;" class="cuadro${i}">
        <div class="animal">
            <h2>${animal.name}</h2>
            <p>Especie: ${animal.species}</p>
            <p>Raza: ${animal.breed}</p>
            <p>Edad: ${animal.age}</p>
           </div>
        </div>`
}
}