
let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noProducts");
function drawfavoritesProductsUI(allproducts = []) {
  if(JSON.parse(localStorage.getItem("productsFavorite")).length === 0)
  noProductsDom.innerHTML = "There No Items !!"

  let products = 
      JSON.parse(localStorage.getItem("productsFavorite")) || allproducts;
    let productsUI = products.map((item) => {
    return `
      <div class="product-item">
        <img 
        src="${item.imageUrl}" 
        class="product-item-img"
        alt="image"
        />

        <div class="product-item-desc">
            <h2>${item.title}</h2>
            <p>${item.desc}</p>
            <span> size: ${item.size} </span> <br>
            <span> Quantity: ${item.qty} </span>             
        </div>

        <div class="product-item-actions">
            <button class="add-to-cart" onclick="removeItemFromCart(${item.id})">Remove From Favorite</button>
         </div>
        </div>
      `;
    });

    productsDom.innerHTML = productsUI.join("");
   }
   drawfavoritesProductsUI();
   function removeItemFromCart (id) {
    let productsFavorite = localStorage.getItem("productsFavorite");
    if (productsFavorite) {
        let items = JSON.parse(productsFavorite);
        let filteredItems = items.filter((item) => item.id !== id);
        localStorage.setItem("productsFavorite", JSON.stringify(filteredItems));
        drawfavoritesProductsUI(filteredItems);
    }
   }