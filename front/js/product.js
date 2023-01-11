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
    
    
    
      // aassocier un eventlisner pour le bouton Ajouter sur le panier
      
      // losqu on click il doit
    
      //recuper le id Kanape , la coleur et la Quantité
    
      //stocker ces info dans le local storage