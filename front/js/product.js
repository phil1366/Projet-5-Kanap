/*let section = document.getElementByid('item');

let params = new URL (document.location).searchParams;
let id = params.get('id')

console.log(id);

const display = (produit) => {


let article = document.createElement('article');

let img = document.createElement('img'); 
img.setAttribute('src',`${produit.imageUrl}`);
img.setAttribute('alt',`${produit.altTxt}`);
}

let h3 = document.createElement('h1');
     h3.textContent =`${produit.name}`;
     h3.classList.add("productName"); */

     /*let img = document.createElement('img'); 
        img.setAttribute('src',`${produit.imageUrl}`);
        img.setAttribute('alt',`${produit.altTxt}`);*/

     const displayProduct = (product) => {      
        
        /*let image = document.querySelector(".item__img img");
        image.setAttribute("src", product.imageUrl);
        image.setAttribute("alt", product.altTxt);*/

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
  