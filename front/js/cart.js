let QteTotal = 0; // variable récupère la qté total des article à commader 
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

            // Étape 9 : Gérer la modification et la suppression de produits dans la page Panier
            
            // console.log(document.querySelectorAll(".deleteItem"))

            // Ajouter Evenement clik sur tout les Btn suppression
            document.querySelectorAll(".deleteItem").forEach((delBtn,index) => { 
                delBtn.addEventListener('click', () => {supprimeCanap(index)})
            });

            //// Modification
            //  Ajouter Evenement change sur tout les input qtés
            document.querySelectorAll(".itemQuantity").forEach((inputBtn,index) => {
                inputBtn.addEventListener('change', () => changeQty(index, inputBtn.value));    
                });          
         
                //Calcule Qte et du prix
                //QteTotal = QteTotal + Number(canap.quantity);
                QteTotal += Number(canap.quantity);              
                PrixTotal +=  canap.quantity * ApiCanap.price ;
                
                //Affichage Qte et PRix Total
               document.getElementById('totalQuantity').innerHTML = QteTotal;
               document.getElementById('totalPrice').innerHTML = PrixTotal;
            })

});

// fonction de SUPPRIMER 1 PRODUIT DU PANIER
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

///// Étape 10 : Passer la commande
//// GESTION DU FORMULAIRE ////
/* Envoi du formulaire */

const btnCommander = document.getElementById('order');
btnCommander.addEventListener('click', function(event) {
    event.preventDefault(); // retir le comportement par defaut du bouton submit
    sendOrder();
})


const sendOrder = () => {
  
    let form = document.querySelector("form");
    
    if ( form.reportValidity() == true ) {
    
      let contact = {
        'firstName': document.getElementById("firstName").value,
        'lastName': document.getElementById("lastName").value,
        'address': document.getElementById("address").value,
        'city': document.getElementById("city").value,
        'email': document.getElementById("email").value
      };
   
      
      let products  = [];
      
      for ( let i = 0; i < panier.length ; i++){
        
        products.push(panier[i]._id)
    }
  
  
      let formulaireClient = JSON.stringify({
        contact,
        products ,
      });
  
      
  
      // APEL API AVEC FETCH // ENVOIE DES DONNEES AVEC POST 
      fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
          'content-type': "application/json"
        },
        mode: "cors",
        body: formulaireClient
        })
        .then(function (response) {
          return response.json()
        })
        .then(function (rep) {
                // console.log(rep.orderId)
                // localStorage.setItem("contact", JSON.stringify(rep.contact));
                // localStorage.setItem("produits ", JSON.stringify(rep.products )); 

          window.location.assign("confirmation.html?orderId=" + rep.orderId);
        })
        //SI PROBLEME API
        .catch(function (err) {
          console.log("fetch Error");
        });
    }

    else{
      if(document.getElementById("email").reportValidity()== false)
        {
          document.getElementById('emailErrorMsg').innerHTML=" Email Non Valide !"
        }
      else
        {
        alert(" Une erreur est survenue votre panier est  peut être vide ou le formulaire n'a pas été correctement rempli!");
        }
    };
  }