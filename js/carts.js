
let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noProducts");
function drawCartProductsUI(allproducts = []) {
  if(JSON.parse(localStorage.getItem("productsInCart")).length === 0)
  noProductsDom.innerHTML = "There No Items !!"

  let products = 
      JSON.parse(localStorage.getItem("productsInCart")) || allproducts;
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
            <button class="add-to-cart" onclick="removeItemFromCart(${item.id})">Remove From Cart</button>
         </div>
        </div>
      `;
    });

    productsDom.innerHTML = productsUI.join("");
   }
    drawCartProductsUI()
   function removeItemFromCart (id) {
    let productsInCart = localStorage.getItem("productsInCart");
    if (productsInCart) {
        let items = JSON.parse(productsInCart);
        let filteredItems = items.filter((item) => item.id !== id);
        localStorage.setItem("productsInCart", JSON.stringify(filteredItems));
        drawCartProductsUI(filteredItems);
    }
   }