// Créer un nouvel objet URLSearchParams pour récupérer les paramètres de recherche de l'actuel URL
const searchParams = new URLSearchParams(window.location.search);

// Récupère l'ID du produit à partir des paramètres de recherche
const productId = searchParams.get("id");

// fonction pour récupérer les détails du produit en utilisant l'ID de produit et l'API fetch
const fetchProduct = (productId) => {
  fetch(`http://localhost:3000/api/products/${productId}`)  
    .then((response) => response.json())     
    .then((product) => {

// Affiche les détails du produit en utilisant la fonction displayProduct
      displayProduct(product);
    })
    .catch((error) => {      

// méthode utilisée si une erreur survient lors de la récupération des données de l'API.
      console.log(error); 
      alert(
        "Veuillez nous excuser ce produit n'est pas disponible pour le moment !"
      );
    });
};

const displayProduct = (product) => {
// Mise à jour son contenu avec le nom du produit
  const title = document.getElementById("title");
  title.textContent = product.name;                

// Mise à jour son contenu avec l'image du produit
  const image = document.getElementsByClassName("item__img")[0];
  image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;    // innerHTML injecte du html dans une balise

// Mise à jour son contenu avec le prix du produit
  const price = document.getElementById("price");
  price.textContent = product.price;

// Misee à jour son contenu avec la description du produit
  const description = document.getElementById("description");
  description.textContent = product.description;

// Ajouter des options de couleur du produit
  const select = document.getElementById("colors");

// Boucle à travers les couleurs de produit pour créer des options pour l'élément de sélection
  for (let color of product.colors) {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;

//méthode JS qui ajoute nouvel élément enfant à élément parent existant dans le DOM.
    select.appendChild(option); 
  }
};

// Appelle la fonction fetchProduct avec l'ID du produit récupéré pour avoir les détails du produit
   fetchProduct(productId);




//// ETAPE 7 : Ajouter des produits dans le panier ////

// ECOUTE EVENEMENT AU CLICK + fonction 'AjouterProdPanier'
   document.getElementById("addToCart").addEventListener("click", function () {
   AjouterProdPanier();
});

// fonction d'ajout du produit dans le panier
  const AjouterProdPanier = () => {

// récupére la qté et la couleur
  let quantity = parseInt(document.getElementById("quantity").value); 
  let colorSelect = document.getElementById("colors"); 
  let color = colorSelect.options[colorSelect.selectedIndex].value; 
  
    if(quantity < 1 || quantity > 100)  
  {
    alert('Veuillez entrer une quantité entre 1 et 100');
    return        
  }
  
  if(color == -1)
  {
    alert('Veuillez choisir une couleur');
    return
  }

// créér objet 'nouvel achat'
  let newAchat = {
    
    _id: productId,
    quantity: quantity,
    color: color,
  };

// Récupére le panier grace à une condition ternaire    

  let panier = localStorage.getItem("panierStorage") ? JSON.parse(localStorage.getItem("panierStorage")) : [];

/* gestion de l'ajout selon si le produit existe ou pas sur le panier
   Parcourir le panier pour voir si le produit existe */  
  let isExist = -1;

  for (let i = 0; i < panier.length; i++) {
    if (panier[i]._id === newAchat._id && panier[i].color === newAchat.color) {
      isExist = i;             
    }
  }

// selon le resultat : si le produit existe on modifie la qté, si non on ajoute une nouvelle ligne dans le panier
  if (isExist !== -1) {
    panier[isExist].quantity = Number(panier[isExist].quantity) + Number(newAchat.quantity);  // on change la qté
  } else {
    panier.push(newAchat); // On ajoute l'objet "newAchat" au tableau "panier" 
  }

// mise a jour du local storage
  localStorage.setItem("panierStorage", JSON.stringify(panier)); 
  location.replace("/front/html/cart.html"); 
};
