// Créer un nouvel objet URLSearchParams pour récupérer les paramètres de recherche de l'actuel URL
const searchParams = new URLSearchParams(window.location.search);

// Récupère l'ID du produit à partir des paramètres de recherche
const productId = searchParams.get("id");

// fonction pour récupérer les détails du produit en utilisant l'ID de produit et l'API fetch
const fetchProduct = (productId) => {
  fetch(`http://localhost:3000/api/products/${productId}`)  // $ interpolation get infos et affiche dans html
    .then((response) => response.json())     // prog synchrone, actions en attente de réponse
    .then((product) => {

// Affiche les détails du produit en utilisant la fonction displayProduct
      displayProduct(product);
    })
    .catch((error) => {       // gestion des erreurs

// méthode utilisée si une erreur survient lors de la récupération des données de l'API.
      console.log(error); //le développeur peut avoir des informations sur l'erreur qui est survenue.
      alert(
        "Veuillez nous exuser ce produit n'est pas disponible pour le moment"
      );
    });
};

const displayProduct = (product) => {
// Sélectionne l'élément avec l'ID "title" pour mettre à jour son contenu avec le nom du produit
  const title = document.getElementById("title");
  title.textContent = product.name;                 // textContent injecte du texte dans une balise

// Sélectionne le premier élément avec la classe "item__img" pour mettre à jour son contenu avec l'image du produit
  const image = document.getElementsByClassName("item__img")[0];
  image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;    // innerHTML injecte du html dans une balise

// Sélectionne l'élément avec l'ID "price" pour mettre à jour son contenu avec le prix du produit
  const price = document.getElementById("price");
  price.textContent = product.price;

// Sélectionne l'élément avec l'ID "description" pour mettre à jour son contenu avec la description du produit
  const description = document.getElementById("description");
  description.textContent = product.description;

// Sélectionne l'élément avec l'ID "colors" pour ajouter les options de couleur du produit
  const select = document.getElementById("colors");

// Boucle à travers les couleurs de produit pour créer des options pour l'élément de sélection
// Renvoie le contenu textuel d'un élément
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
// Lorsque le bouton est cliqué, la fonction 'AjouterProdPanier' est appelée.
// La fonction 'AjouterProdPanier' définit les variables quantity, colorSelect et color en utilisant la méthode getElementById.

   document.getElementById("addToCart").addEventListener("click", function () {
   AjouterProdPanier();
});

// fonction d'ajout du produit dans le panier
  const AjouterProdPanier = () => {

// récupérer la qté et la couleur

  let quantity = parseInt(document.getElementById("quantity").value); // parseInt permet de convertir string en chiffre entier
  let colorSelect = document.getElementById("colors"); // colorSelect récupère élément HTML (id "colors")
  let color = colorSelect.options[colorSelect.selectedIndex].value; // color récupère valeur sélectionnée dans liste déroulante HTML "colorSelect".
// propriété "selectedIndex" utilisée pour récupérer valeur option sélectionnée grace à "value".
  
    if(quantity < 1 || quantity > 100)
  {
      alert('Veuillez entrer une quantité entre 1 et 100');
      return            // return (seul) => la fonction s'arrête
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

/* Récupérer le panier grace à une condition ternaire 
   ce code ajoute un objet à un panier et le stocke localement pour que l'utilisateur puisse y accéder plus tard.
   L'opérateur ternaire vérifie si la valeur de "panier" est définie ou non. Si oui, elle est analysée avec la méthode "JSON.parse()"
   Si non la valeur de "panier" est initialisée avec un tableau vide. */

  let panier = localStorage.getItem("panierStorage") ? JSON.parse(localStorage.getItem("panierStorage")) : [];

/* gestion de l'ajout selon si le produit existe ou pas sur le panier
   Parcourir le panier pour voir si le produit existe
   Si "isExist" est égal à -1, cela signifie qu'il n'y a pas d'élément existant avec les mêmes attributs "_id" et "color" */
  let isExist = -1;

  for (let i = 0; i < panier.length; i++) {
    if (panier[i]._id === newAchat._id && panier[i].color === newAchat.color) {
      isExist = i;             // i = position dans le panier
    }
  }

// selon le resultat : si le produit existe on modifie la qté, si non on ajoute une nouvelle ligne dans le panier
  if (isExist !== -1) {
    panier[isExist].quantity = panier[isExist].quantity + newAchat.quantity; // on change la qté
  } else {
    panier.push(newAchat); // On ajoute l'objet "newAchat" au tableau "panier" en utilisant la méthode "push".
  }

  localStorage.setItem("panierStorage", JSON.stringify(panier)); // mise a jour du local storage
  location.replace("/front/html/cart.html"); // redirection vers la page panier. JSON.stringify : méthode statique convertit valeur JS en chaîne JSON
};
