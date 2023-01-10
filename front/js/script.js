let container = document.getElementById("items");


const display = (produit) => {
    let link = document.createElement('a');
    link.setAttribute('href',`./product.html?id=${produit._id}`);

    let article = document.createElement('article');

    let img = document.createElement('img');
    img.setAttribute('src',`${produit.imageUrl}`);
    img.setAttribute('alt',`${produit.altTxt}`);

    let h3 = document.createElement('h3');
     h3.textContent =`${produit.name}`;
     h3.classList.add("productName");

    let p = document.createElement('p');
    p.textContent = `${produit.description}`;
    p.classList.add("productDescription");
    
   article.appendChild(img);
   article.appendChild(h3);   
   article.appendChild(p); 
   link.appendChild(article);

    container.appendChild(link);    
};
//.then(response => {alert('test');return response.json()})

//APPEL API AVEC FETCH
fetch("http://localhost:3000/api/products")
    .then(response =>  response.json())  
    .then(function (listeProduct) {        
        // boucle for prend un produit de la liste 
        for (let product of listeProduct) {
            //let produit = new Kanap(product)
            display(product);
        }
    })
    //SI PROBLEME API
    .catch(function (err) {
        console.log("fetch Error")
        alert("Veuillez nous exuser les produits ne sont pas disponible pour le moment ")
    });