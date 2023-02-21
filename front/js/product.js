const { log } = require("console");
const { title } = require("process");
const { URLSearchParams } = require("url");
const { response } = require("../../back/app");

const displayProduct = (product) => {  

  // Sélectionne l'élément avec l'ID "title" pour mettre à jour son contenu avec le nom du produit
  const title = document.getElementById("title");
  title.textContent = product.name;
  
  // Sélectionne le premier élément avec la classe "item__img" pour mettre à jour son contenu avec l'image du produit
  const listImage = document.getElementsByClassName("item__img")[0];
  listImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

  // Sélectionne l'élément avec l'ID "price" pour mettre à jour son contenu avec le prix du produit.   
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

    select.appendChild(option);   //méthode JS qui ajoute nouvel élément enfant à élément parent existant dans le DOM. 
  };

// fonction pour récupérer les détails du produit depuis l'api en utilisant l'ID de produit (API fetch)
const fetchProduct = (productId) => {
  fetch(`http://localhost:3000/api/products/${productId}`)
    .then(response => response.json())
    .then(product => {      // Affiche les détails du produit en utilisant la fonction displayProduct
      displayProduct(product);
    })
    .catch(error => {    //méthode utilisée si une erreur survient lors de la récupération des données de l'API.
      console.log(error);  //le développeur peut avoir des informations sur l'erreur qui est survenue.
      alert("Veuillez nous exuser ce produit n'est pas disponible pour le moment ");
    });
};

// Créer un nouvel objet URLSearchParams pour récupérer les paramètres de recherche de l'actuel URL
const searchParams = new URLSearchParams(window.location.search);              //????????  window...

// Récupère l'ID de produit à partir des paramètres de recherche
const productId = searchParams.get("id");

// Appelle la fonction fetchProduct en passant l'ID de produit récupéré pour récupérer les détails du produit
fetchProduct(productId);

//// ÉTAPE 7 : Ajouter des produits dans le panier ////

// ECOUTE EVENEMENT AU CLICK + FNCT AjouterProdPanier
// Lorsque le bouton est cliqué, la fonction AjouterProdPanier sera appelée.
// La fonction AjouterProdPanier définit les variables quantity, colorSelect et color en utilisant la méthode getElementById. 
document.getElementById('addToCart').addEventListener('click',  function () {AjouterProdPanier()});    //???????? 

//fonction d'ajout du produit dans le panier
const AjouterProdPanier  = () => {  

// récuperer la qté et la couleur
let quantity = parseInt(document.getElementById('quantity').value);   // variable "quantity" assigne valeur numérique par méthode "getElementById"
let colorSelect = document.getElementById("colors");               //"colorSelect" récupère élément HTML (id "colors") par méthode "getElementById".
let color = colorSelect.options[colorSelect.selectedIndex].value;  //"color" récupère valeur sélectionnée dans liste déroulante HTML "colorSelect".
                                                                   // propriété "selectedIndex" utilisée pour récupérer valeur option sélectionnée grace à "value".
  // créér objet 'nouvel achat'
  let newAchat = {
    "_id" : productId,                    //??????? _id  mongo ou id
    "quantity" : quantity,
    "color" : color,
  }

  //RECUPERER LE PANIER// grace condition ternaire : let variable=(condition)? "valeur si vrai": "valeur si faux"
  ////ce code ajoute un objet à un panier et le stocke localement pour que l'utilisateur puisse y accéder plus tard.

  /* variable "panier" utilise la méthode getItem() de l'objet localStorage. 
  La valeur de "panier" est la valeur stockée dans la clé "panierStorage" dans le stockage local de l'utilisateur. 
  Opérateur ternaire vérifie si la valeur de "panier" est définie ou non. Si oui, elle est analysée avec la méthode "JSON.parse()"
  Si non la valeur de "panier" est initialisée avec un tableau vide. */ 
  let panier = localStorage.getItem('panierStorage') ? JSON.parse(localStorage.getItem('panierStorage')) : [];
  panier.push(newAchat);   //ajoute un nouvel objet "achat" à la fin du tableau "panier". 
  localStorage.setItem('panierStorage', JSON.stringify(panier)); //méthode statique convertit une valeur JavaScript en chaîne JSON      //??????? set.Item
  /* Prend le tableau "panier" et le convertit en une chaîne de caractères JSON. 
  JSON est stockée dans le stockage local du navigateur sous la clé "panierStorage". Cela signifie que les données du panier seront stockées
  localement sur l'ordinateur de l'utilisateur, même si le navigateur est fermé ou la page est actualisée. */
  }
}

  // gestion de l'ajout selon si le produit exist ou pas sur le panier
  // parcourir le panier pour voir si le produit existe
  let isExist = -1;         //??????????

  /* boucle "for" qui parcourt chaque élément du tableau "panier". Pour chaque élément, le code vérifie si l'ID 
  et la couleur correspondent à ceux de l'objet "newAchat" en utilisant une condition "if". 
  Si l'attribut "_id" de l'élément est identique à celui de l'objet "newAchat" passé en paramètre
  Si l'attribut "color" de l'élément est identique à celui de l'objet "newAchat" passé en paramètre
  Si les 2 conditions sont vraies, la variable "isExist" est définie avec la valeur de l'index de l'élément correspondant dans le tableau "panier". */
  for (let i = 0; i < panier.length; i++) {
    if (panier[i]._id === newAchat._id && panier[i].color === newAchat.color) { //L'opérateur logique ET (&&) renvoie vrai si et uniquement si ses 2 opérandes sont true ou équivalents à true.
      isExist = i;
    }                       //?????????
  }

  /* selon le resultat : si le produit existe on modifie la qté, si non on ajoute une nouvelle ligne dans le panier 
  Vérifie si la variable "isExist" est différente de -1. Si oui => 1 élément existant dans tableau "panier" a les mêmes attributs "_id" 
  et "color" que l'objet "newAchat" passé en paramètre.
  Dans ce cas, le code update la qté de l'élément existant en ajoutant la qté de l'objet "newAchat" à la qté de l'élément existant dans le panier.
  Si "isExist" est égal à -1, cela signifie qu'il n'y a pas d'élément existant avec les mêmes attributs "_id" et "color" 
  que l'objet "newAchat" dans le tableau "panier".
  Dans ce cas, le code ajoute simplement l'objet "newAchat" au tableau "panier" en utilisant la méthode "push". */
  if (isExist !== -1) {
    panier[isExist].quantity = panier[isExist].quantity + newAchat.quantity; // on change la qté         //???????
  } else {
    panier.push(newAchat); // on ajoute une nouvelle ligne
  }

  localStorage.setItem("panierStorage", JSON.stringify(panier)); // mise à jour du local storage      //????????
  location.replace("/front/html/cart.html"); // redirection vers la page panier
  //JSON.stringify : méthode statique convertit valeur JS en chaîne JSON







   
  -  

  // Sélectionne l'élément avec l'ID "title" pour mettre à jour son contenu avec le nom du produit
  - 
  
  // Sélectionne le premier élément avec la classe "item__img" pour mettre à jour son contenu avec l'image du produit
  - 
  
  // Sélectionne l'élément avec l'ID "price" pour mettre à jour son contenu avec le prix du produit 
  - 
  
  // Sélectionne l'élément avec l'ID "description" pour mettre à jour son contenu avec la description du produit
  -  
  
  // Sélectionne l'élément avec l'ID "colors" pour ajouter les options de couleur du produit 
  - 
  
  // Boucle à travers les couleurs de produit pour créer des options pour l'élément de sélection
  // Renvoie le contenu textuel d'un élément
  // méthode JS qui ajoute nouvel élément enfant à élément parent existant dans le DOM. 
  - 
  
  // fonction pour récupérer les détails du produit depuis l'api en utilisant l'ID de produit (API fetch)
  // Affiche les détails du produit en utilisant la fonction displayProduct
  -  
 
  // Affiche une alerte en cas d'erreur     
  // méthode utilisée si une erreur survient lors de la récupération des données de l'API.
  // Le développeur peut avoir des informations sur l'erreur qui est survenue.   
  -    
  
  // Créer un nouvel objet URLSearchParams pour récupérer les paramètres de recherche de l'actuel URL  
  -  
  
  // Récupère l'ID de produit à partir des paramètres de recherche  
  -  
  
  // Appelle la fonction fetchProduct en passant l'ID de produit récupéré pour récupérer les détails du produit
  -  
  
  //// ÉTAPE 7 : Ajouter des produits dans le panier ////     
  // ECOUTE EVENEMENT AU CLICK + FNCT AjouterProdPanier
  // Lorsque le bouton est cliqué, la fonction AjouterProdPanier sera appelée.
  // La fonction AjouterProdPanier définit les variables quantity, colorSelect et color en utilisant la méthode getElementById. 
  -  
  
  //fonction d'ajout du produit dans le panier   // récuperer la qté et la couleur
  -  
  
  //variable "quantity" assigne valeur numérique par méthode "getElementById"
  //variable "colorSelect" récupère élément HTML (id "colors") par méthode "getElementById".
  //variable "color" récupère valeur sélectionnée dans liste déroulante HTML "colorSelect".
  //propriété "selectedIndex" utilisée pour récupérer valeur option sélectionnée grace à "value".
   
  // créér l'objet nouvel achat
  -  
  
  //RECUPERER LE PANIER// grace à condition ternaire : let variable=(condition)? "valeur si vrai": "valeur si faux"
  //// Ce code ajoute un objet à un panier et le stocke localement pour que l'utilisateur puisse y accéder plus tard.
  
  /* variable "panier" utilise la méthode getItem() de l'objet localStorage. 
    La valeur de "panier" est la valeur stockée dans la clé "panierStorage" dans le stockage local de l'utilisateur. 
    Opérateur ternaire vérifie si la valeur de "panier" est définie ou non. Si oui, elle est analysée avec la méthode "JSON.parse()"
    Si non la valeur de "panier" est initialisée avec un tableau vide. */ 
  -    
  
  /* Ajoute un nouvel objet "achat" à la fin du tableau "panier".
    Prend le tableau "panier" et le convertit en une chaîne de caractères JSON. 
    JSON est stockée dans le stockage local du navigateur sous la clé "panierStorage". Cela signifie que les données du panier seront stockées
    localement sur l'ordinateur de l'utilisateur, même si le navigateur est fermé ou la page est actualisée. /*    
  
  /* parcourir le panier pour voir si le produit existe
  variable utilisée plus tard pour déterminer si l'objet "newAchat" existe déjà dans le panier. */      
  - 
  
  /* boucle "for" qui parcourt chaque élément du tableau "panier". Pour chaque élément, le code vérifie si l'ID 
  et la couleur correspondent à ceux de l'objet "newAchat" en utilisant une condition "if". 
  Si les ID et les couleurs correspondent, alors la variable "isExist" est mise à jour avec la valeur de
  l'indice actuel de l'élément dans le tableau "panier". Si non, "isExist" conserve sa valeur initiale de "-1". */
  
  -  //L'opérateur logique ET (&&) renvoie vrai si et uniquement si ses 2 opérandes sont true ou équivalents à true.
                 
  /* selon le resultat : si le produit existe on modifie la qté, si non on ajoute une nouvelle ligne dans le panier 
    Vérifie si la variable "isExist" est différente de -1. Si oui => 1 élément existant dans tableau "panier" a les mêmes attributs "_id" 
    et "color" que l'objet "newAchat" passé en paramètre.
    Dans ce cas, le code update la qté de l'élément existant en ajoutant la qté de l'objet "newAchat" à la qté de l'élément existant dans le panier.
    Si "isExist" est égal à -1, cela signifie qu'il n'y a pas d'élément existant avec les mêmes attributs "_id" et "color" 
    que l'objet "newAchat" dans le tableau "panier".
    Dans ce cas, le code ajoute simplement l'objet "newAchat" au tableau "panier" en utilisant la méthode "push". */
  -  
  
  // on ajoute une nouvelle ligne
   // on change la qté
  // on ajoute une nouvelle ligne
  
  //mise à jour du local storage
  //redirection vers la page panier
  //JSON.stringify : méthode statique convertit valeur JS en chaîne JSON
  -
    