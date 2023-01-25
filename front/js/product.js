     const displayProduct = (product) => {  
            const title = document.getElementById("title");
            title.textContent = product.name;
          
                
            const listImage = document.getElementsByClassName("item__img")[0];
            listImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">` ;
            
            
            const price = document.getElementById("price");
            price.textContent = product.price;
          
            const description = document.getElementById("description");
            description.textContent = product.description;
          
            const select = document.getElementById("colors");
                    
            for (let color of product.colors) {
              const option = document.createElement("option");
              option.value = color;
              option.textContent = color;
    
              select.appendChild(option);
            }        
          };
          
          const fetchProduct = (productId) => {
            fetch(`http://localhost:3000/api/products/${productId}`)
              .then(response => response.json())
              .then(product => {
                displayProduct(product);
              })
              .catch(error => {
                console.log(error);
                alert("Veuillez nous exuser ce produit n'est pas disponible pour le moment ");
              });
          };
          
          const searchParams = new URLSearchParams(window.location.search);
          const productId = searchParams.get("id");    
    
      fetchProduct(productId);
   
    //Ajouter des produits dans le panier

// ECOUTE EVENEMENT AU CLICK + FNCT AjouterProdPanier

document.getElementById('addToCart').addEventListener('click',  function () {AjouterProdPanier()});

const AjouterProdPanier  = () => {

 // récuperer la qté et la couleur
 let quantity = parseInt(document.getElementById('quantity').value); 
 let colorSelect = document.getElementById("colors");
 let color = colorSelect.options[colorSelect.selectedIndex].value;

 // créér l'objet nouvel achat
 let newAchat = {
  "_id" : productId,
  "quantity" : quantity,
  "color" : color,
}


//RECUPERER LE PANIER// grace condition ternaire : let variable=(condition)? "valeur si vrai": "valeur si faux"
//let panier = (1==3) ? val1 : val2;
let panier = localStorage.getItem('panierStorage') ? JSON.parse(localStorage.getItem('panierStorage')) : [];

panier.push(newAchat);

localStorage.setItem('panierStorage', JSON.stringify(panier));
}