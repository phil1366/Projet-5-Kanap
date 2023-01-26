let container = document.getElementById("items");

function affichage(kanap){
    container.innerHTML += `
                 <a href="./product.html?id=${kanap._id}">
                  <article>
                    <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
                    <h3 class="productName">${kanap.name}</h3>
                    <p class="productDescription">${kanap.description}</p>
                  </article>
                </a>           
            `;
}

//APPEL API AVEC FETCH
fetch("http://localhost:3000/api/products")
    .then(response =>  response.json())  
    .then(function (listeProduct) {       
        for (let element of listeProduct) {                    
            affichage(element);
        }
    })    

//si erreur    
    .catch(function (err) {
        console.log("fetch Error")
        alert("Veuillez nous excuser : produits indisponible pour le moment")
    });