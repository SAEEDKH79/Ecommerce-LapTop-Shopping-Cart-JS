let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noProducts");

//Display Products

let drawProductsUI;
(drawProductsUI = function (products = []) {
let myproducts = products.filter(item => item.isMe === "Y");
if(myproducts.length != 0) {
    console.log("yes");
    let productsUI = myproducts.map((item) => {
   
return `
    <div class="product-item" style="border: ${item.isMe === "Y" ? "2px solid green" : ""
}">
    <img 
    src="${item.imageUrl}" 
    class="product-item-img"
    alt="image"
    />

    <div class="product-item-desc">
    <a onclick="saveItemData(${item.id})">${item.title}</a>
    <p>${item.desc}</p>
    <span> size: ${item.size} </span>   
    
    <button class='edit-product' onclick='editproduct(${
    item.id
    })'> Edit product </button>
    <br>
    <button class='edit-product' onclick='deleteproduct(${
    item.id
    })'> Delete product </button>
       </div>
    </div>

    `;
});

productsDom.innerHTML = productsUI.join("");
}
else{
    console.log("no");
    noProducts.innerHTML = "No Products !!";
}
  })(JSON.parse(localStorage.getItem("products")) || productsDB);

  //Edit Products
  function deleteproduct(id) {
    localStorage.setItem("editproduct", id);
    window.location = "editproduct.html";
  }
  function deleteproduct(id) {
    let products = JSON.parse(localStorage.getItem("products")) ||  productsDB;
    let myproducts = products.filter(item => item.isMe === "Y");
    let filtered = myproducts.filter(i => i.id !== id);
    
    let clickedItem = myproducts.find((i) => i.id === id);
    products = products.filter((i) => i.id !== clickedItem.id);
    localStorage.setItem("products", JSON.stringify(products));   
    drawProductsUI(filtered);
  }
