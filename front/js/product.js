

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
  

      
    
    
    
    
    