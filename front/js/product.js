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
            listImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">` ;
            
      // Sélectionne l'élément avec l'ID "price" pour mettre à jour son contenu avec le prix du produit      
            const price = document.getElementById("price");
            price.textContent = product.price;

      // Sélectionne l'élément avec l'ID "description" pour mettre à jour son contenu avec la description du produit    
            const description = document.getElementById("description");
            description.textContent = product.description;
      
      // Sélectionne l'élément avec l'ID "colors" pour ajouter les options de couleur du produit
            const select = document.getElementById("colors");

      // Boucle à travers les couleurs de produit pour créer des options pour l'élément de sélection              
            for (let color of product.colors) {
              const option = document.createElement("option");
              option.value = color;
              option.textContent = color;
    
              select.appendChild(option);
            }        
          };

      // fonction pour récupérer les détails du produit en utilisant l'ID de produit et l'API fetch    
          const fetchProduct = (productId) => {
            fetch(`http://localhost:3000/api/products/${productId}`)
              .then(response => response.json())      
              .then(product => { // Affiche les détails du produit en utilisant la fonction displayProduct
                displayProduct(product);
              })           
              .catch(error => {// Affiche une alerte en cas d'erreur  
                console.log(error);
                alert("Veuillez nous exuser ce produit n'est pas disponible pour le moment ");
              });
          };
      
      // Créer un nouvel objet URLSearchParams pour récupérer les paramètres de recherche de l'actuel URL
          const searchParams = new URLSearchParams(window.location.search);

      // Récupère l'ID de produit à partir des paramètres de recherche
          const productId = searchParams.get("id");    
    
      // Appelle la fonction fetchProduct en passant l'ID de produit récupéré pour récupérer les détails du produit
          fetchProduct(productId);

   
      //// ÉTAPE 7 : Ajouter des produits dans le panier ////

      // ECOUTE EVENEMENT AU CLICK + FNCT AjouterProdPanier

      document.getElementById('addToCart').addEventListener('click',  function () {AjouterProdPanier()});

      const AjouterProdPanier  = () => { //fonction d'ajout du produit dans le panier

      // récuperer la qté et la couleur
      let quantity = parseInt(document.getElementById('quantity').value);// parseInt permet de convertir string en entier     
      let colorSelect = document.getElementById("colors");
      let color = colorSelect.options[colorSelect.selectedIndex].value;

      // créér objet nouvel achat
      let newAchat = {
         "_id" : productId,
         "quantity" : quantity,
         "color" : color,
      }


          //RECUPERER LE PANIER// grace condition ternaire : let variable=(condition)? "valeur si vrai": "valeur si faux"
          //let panier = (1==3) ? val1 : val2;
          let panier = localStorage.getItem('panierStorage') ? JSON.parse(localStorage.getItem('panierStorage')) : [];     
                
          //gestion de l'ajout selon si le produit exist ou pas sur le panier

          // -> parcourir le panier pour voir si le produit existe
          let isExist = -1 ;

          for (let i = 0; i < panier.length; i++) {           
            
                  if (panier[i]._id === newAchat._id && panier[i].color === newAchat.color ) {
                        isExist = i;
                  }
           };

          // -> selon la resultat : si le produit existe on va modifier la quantité sinon on ajoute une nouvelle ligne sur le panier
          if ( isExist !== -1 ) {
            panier[isExist].quantity = panier[isExist].quantity + newAchat.quantity; // on change la qté
          } 
          else {
            panier.push(newAchat); // on ajoute une nouvelle ligne
          };

      localStorage.setItem('panierStorage', JSON.stringify(panier)); // mise à jour du local storage
      location.replace("/front/html/cart.html"); // redirection vers la page panier

      }



     





   
   


    
    
    
    

//RECUPERER LE PANIER// grace condition ternaire : let variable=(condition)? "valeur si vrai": "valeur si faux"
          //let panier = (1==3) ? val1 : val2;
//gestion de l'ajout selon si le produit exist ou pas sur le panier

          // -> parcourir le panier pour voir si le produit existe
 // -> selon la resultat : si le produit existe on va modifier la quantité sinon on ajoute une nouvelle ligne sur le panier
// on change la qté
// on ajoute une nouvelle ligne
// mise à jour du local storage
// redirection vers la page panier