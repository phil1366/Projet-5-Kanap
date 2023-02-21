let container = document.getElementById("items");   // On récupère le conteneur où les produits vont être affichés. c la fonction pour afficher les produits.

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

/*Les fonctions "=>" ont également un comportement différent pour la liaison de "this" et pour la gestion des erreurs. 
En général, il est préférable d'utiliser des fonctions fléchées lorsque vous n'avez pas besoin de créer un nouveau contexte "this" 
et lorsque vous n'avez pas besoin de gérer des erreurs de manière spécifique.        //????????