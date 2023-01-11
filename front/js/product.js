

     const displayProduct = (product) => {      
        

        const title = document.getElementById("title");
        title.textContent = product.name;
      
        const price = document.getElementById("price");
        price.textContent = product.price;
      
        const description = document.getElementById("description");
        description.textContent = product.description;
      
        const colors = document.getElementById("colors");
        for (let color of product.colors) {
          const option = document.createElement("option");
          option.value = color;
          option.textContent = color;
          colors.appendChild(option);
        }
      };
      
      const fetchProduct = (productId) => {
        fetch(`http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926`)
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
  

      /*const confirmOrder = () => {
        // récupération des éléments du formulaire
        const form = document.getElementById("order-form");
        const formData = new FormData(form);
    
        // envoi de la demande de confirmation de commande au serveur
        fetch("http://localhost:3000/api/orders/confirm", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // vérification de la réponse du serveur
            if (data.success) {
                // mise à jour de la page pour afficher un message de succès
                const confirmationMessage = document.getElementById("confirmation-message");
                confirmationMessage.textContent = "Votre commande a été confirmée avec succès ! Votre numéro de commande est : " + data.orderId;
                confirmationMessage.style.display = "block";
            } else {
                // affichage d'un message d'erreur
                alert("Une erreur est survenue lors de la confirmation de votre commande. Veuillez réessayer plus tard.");
            }
        })
        .catch(error => {
            console.error(error);
            alert("Une erreur est survenue lors de la confirmation de votre commande. Veuillez réessayer plus tard.");
        });
    };
    
    // ajout d'un écouteur d'événement pour l'envoi du formulaire
    const form = document.getElementById("order-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        confirmOrder();
    });
    Il faudra ajouter un formulaire HTML pour recupérer les données, et un bouton ou un élément HTML qui écoutera l'événement submit pour ensuite appeler la fonction confirmOrder() pour envoyer les données. Il faudrait également un élément pour afficher un message de confirmation de la commande.
    
    
    
    
    