let QteTotal = 0;
let PrixTotal = 0;


////  Étape 8 : Afficher un tableau récapitulatif des achats dans la page Panier ////

//RECUPERATION DU PANIER DANS LE LOCAL STORAGE
let panier = localStorage.getItem("panierStorage") ? JSON.parse(localStorage.getItem("panierStorage")) : [];

//Fonction Récupere les données du produit via l'API      
function GetProduct(Currentid)
{                
    return Promise.resolve(
      fetch("http://localhost:3000/api/products/" + Currentid)
      .then(response =>  response.json())  
      .then(function (product) {
        // console.log(product);          
        return product                      
      })
    );
};

//EMPLACEMENT DU HTML
let cart__items = document.getElementById("cart__items");

//BOUCLE SUR LE PANIER
panier.forEach((canap, i) => {

    GetProduct(canap._id).then( ApiCanap => {

        cart__items.innerHTML += `
                <article class="cart__item" data-id="${canap._id}" data-color="${canap.color}">
                <div class="cart__item__img">
                <img src="${ApiCanap.imageUrl}" alt="${ApiCanap.altTxt}">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${ApiCanap.name}</h2>
                    <p>Couleur : ${canap.color}</p>
                    <p>Prix : ${ApiCanap.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canap.quantity}">
                    <p>&nbsp; = Total : ${ApiCanap.price * canap.quantity } €</p>
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
                </div>
            </article>`;

//// Étape 9 : Gérer la modification et la suppression de produits dans la page Panier ////
            
            // console.log(document.querySelectorAll(".deleteItem"))

            // Ajouter Evenement click sur tous les Btn "suppression"
            document.querySelectorAll(".deleteItem").forEach((delBtn,index) => { 
                delBtn.addEventListener('click', () => {supprimeCanap(index)})
            });

            //// Modification
            //  Ajouter Evenement change sur tout les input qtés
            document.querySelectorAll(".itemQuantity").forEach((inputBtn,index) => {
                inputBtn.addEventListener('change', () => changeQty(index, inputBtn.value));    
                });        
            });

            //Calcul Qté et prix
            QteTotal = QteTotal + Number(canap.quantity);              

            //Affichage Qté et Prix total
            document.getElementById('totalQuantity').innerHTML = QteTotal;
            document.getElementById('totalPrice').innerHTML = PrixTotal;
});

// fonction : SUPPRIMER 1 PRODUIT DU PANIER
 function supprimeCanap(index) {
    if (confirm("êtes vous sûr de cette action !") == true) {
        panier.splice(index, 1);    
        localStorage.setItem('panierStorage', JSON.stringify(panier));
        window.location.reload();
    } 
}

function changeQty(index,newVal) {
        console.log()
        panier[index].quantity= newVal;
        localStorage.setItem('panierStorage', JSON.stringify(panier)); // mise à jour du LocalStorage
        window.location.reload();
   
}