let QteTotal = 0; // variable récupère la qté totale des article à commander
let PrixTotal = 0;

////  Étape 8 : Affiche un tableau récapitulatif des achats dans le Panier ////

// RECUPERATION DU PANIER DANS LE LOCAL STORAGE
let panier = localStorage.getItem("panierStorage")
  ? JSON.parse(localStorage.getItem("panierStorage"))
  : [];

// Récupere les données du produit via l'API
function GetProduct(Currentid) {
  return Promise.resolve(
    fetch("http://localhost:3000/api/products/" + Currentid)
      .then((response) => response.json())
      .then(function (product) {
        return product;
      })
  );
}

// EMPLACEMENT DU HTML
let cart__items = document.getElementById("cart__items");

// BOUCLE SUR LE PANIER
panier.forEach((canap, i) => {
  GetProduct(canap._id).then((ApiCanap) => {
    cart__items.innerHTML += `
                <article class="cart__item" data-id="${
                  canap._id
                }" data-color="${canap.color}">
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
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
                      canap.quantity
                    }">
                    <p>&nbsp; = Total : ${ApiCanap.price * canap.quantity} €</p>
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
                </div>
            </article>`;

    // Étape 9 : Gérer la modification et la suppression de produits dans la page Panier

    // Ajouter Evenement click sur tout les Btn suppression
    document.querySelectorAll(".deleteItem").forEach((delBtn, index) => {
      delBtn.addEventListener("click", () => {
        supprimeCanap(index);
      });
    });

    // Modification Ajouter 'Evenement change' sur tout les input qtés
    document.querySelectorAll(".itemQuantity").forEach((inputBtn, index) => {
      inputBtn.addEventListener("change", () =>
        changeQty(index, inputBtn.value)
      );
    });

    // Calcul Qté et prix
    QteTotal += Number(canap.quantity);
    PrixTotal += canap.quantity * ApiCanap.price;

    // Affichage Qté et Prix total
    document.getElementById("totalQuantity").innerHTML = QteTotal;
    document.getElementById("totalPrice").innerHTML = PrixTotal;
  });
});

// fonction de SUPPRIMER 1 PRODUIT DU PANIER
function supprimeCanap(index) {
  if (confirm("êtes vous sûr de cette action !") == true) {
    panier.splice(index, 1);
    localStorage.setItem("panierStorage", JSON.stringify(panier));
    window.location.reload();
  }
}

function changeQty(index, newVal) {
  console.log();
  panier[index].quantity = newVal;
  localStorage.setItem("panierStorage", JSON.stringify(panier)); // mise à jour du LocalStorage
  window.location.reload();
}

///// Étape 10 : Passer la commande
//// Gestion et envoi du formulaire ////

const btnCommander = document.getElementById("order");
btnCommander.addEventListener("click", function (event) {
  event.preventDefault(); // retire le comportement par defaut du bouton submit
  sendOrder();
});

const formValidator = () => {
  document.getElementById("firstNameErrorMsg").innerHTML = "";
  document.getElementById("lastNameErrorMsg").innerHTML = "";
  document.getElementById("addressErrorMsg").innerHTML = "";
  document.getElementById("cityErrorMsg").innerHTML = "";
  document.getElementById("emailErrorMsg").innerHTML = "";

  if (!document.getElementById("firstName").value.match(/^[a-zA-Z]{3,}$/)) {
    document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez entrer 3 caractères minimum !";
    return false;
  }

  if (!document.getElementById("lastName").value.match(/^[a-zA-Z]{3,}$/)) {
    document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez entrer 3 caractères minimum !";
    return false;
  }

  if (!document.getElementById("address").value.match(/^[a-zA-Z]{3,}$/)) {
    document.getElementById("addressErrorMsg").innerHTML = "Veuillez entrer 3 caractères minimum !";
    return false;
  }

  if (!document.getElementById("city").value.match(/^[a-zA-Z]{3,}$/)) {
    document.getElementById("cityErrorMsg").innerHTML = "Veuillez entrer 3 caractères minimum !";
    return false;
  }

  if (
    !document
      .getElementById("email")
      .value.match(
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      )
  ) {
    document.getElementById("emailErrorMsg").innerHTML = " Email Non Valide !";
    return false;
  }

  return true;
};

const sendOrder = () => {
  if (panier.length == 0) {
    alert("Votre Panier est vide ! ");
    return;
  }

  if (formValidator()) {
    let contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    let products = [];

    for (let i = 0; i < panier.length; i++) {
      products.push(panier[i]._id);
    }

    let formulaireClient = JSON.stringify({
      contact,
      products,
    });

    // APEL API AVEC FETCH // ENVOIE DES DONNEES AVEC POST
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      mode: "cors",
      body: formulaireClient,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (rep) {
        window.location.assign("confirmation.html?orderId=" + rep.orderId);
      })
      // SI PROBLEME API
      .catch(function (err) {
        console.log("fetch Error");
      });
  }
};
