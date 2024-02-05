
//Define Product

let productsDom = document.querySelector(".products");
let cartproductMenu = document.querySelector(".carts-products");
let cartproductDivDom = document.querySelector(".carts-products div");
let shoppingCartIcon = document.querySelector(".shoppingcart");
let badgeDom = document.querySelector(".badge");
let products = productsDB;

//Open Cart Menu
 shoppingCartIcon.addEventListener('click', opencartMenu)

 //Display Products

 let drawProductsUI;
 (drawProductsUI = function (products = []) {
    let productsUI = products.map((item) => {
      console.log("eee", item);
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
            
            ${
              item.isMe === "Y" &&
             "<button class='edit-product' onclick='editproduct(" +
             item.id +
             " )'> Edit product </button>"
            }
        </div>
        <div class="product-item-actions">
          <button class="add-to-cart" onclick="addedToCart(${item.id})">Add To Cart</button>
            <i class="favorite far fa-heart" style="color: ${
              item.liked == true ? "red" : ""
            }"onclick="addToFavorite(${item.id})"></i>
         </div>
        </div>
      `;
    });

    productsDom.innerHTML = productsUI.join("");
   })(JSON.parse(localStorage.getItem("products")) || products);

//Check If There is in LocalStorage
let addedItem = localStorage.getItem("productsInCart") 
? JSON.parse(localStorage.getItem("productsInCart")) 
: [];

if(addedItem) {
addedItem.map(item => {
  cartproductDivDom.innerHTML += `<p>${item.title} ${item.qty}</p>`;
});
badgeDom.style.display= "block";
badgeDom.innerHTML += addedItem.length;
}
   //Add To Cart

   function addedToCart(id) {
    if (localStorage.getItem("username")) {
    let products = JSON.parse(localStorage.getItem("products")) || products;
    let product = products.find((item) => item.id === id);
    let isProductInCart = addedItem.some((i) => i.id === product.id);

    if(isProductInCart) {
      addedItem = addedItem.map(p => {
        if(p.id === product.id) p.qty +=1;
        return p;
      })
    } else {
      addedItem.push(product);
    }

    // Ui

    cartproductDivDom.innerHTML = "";
    addedItem.forEach(item => {
    cartproductDivDom.innerHTML += `<p>${item.title} ${item.qty}</p>`;
    });

    // Save Data

    localStorage.setItem("productsInCart", JSON.stringify(addedItem));

    // Add Counter of Items 

    let cartproductItems = document.querySelectorAll(" .carts-products div p");
    badgeDom.style.display= "block";
    badgeDom.innerHTML = cartproductItems.length;
     } else {
       window.location = "login.html";
     }
   }
   function getUniqueArr(arr , filterType) {
    let unique = arr
    .map(item => item[filterType])
    .map((item , i, final) =>final.indexOf(item) === i && i)
    .filter(item => arr[item])
    .map((item) => arr[item]);

    return unique;
   }

   //Open Cart Menu
    function opencartMenu ( ) {
      if (cartproductDivDom.innerHTML != "") {
         if (cartproductMenu.style.display == "block") {
          cartproductMenu.style.display = "none";
         } else {
          cartproductMenu.style.display = "block";
         }
       }
     }

     function saveItemData(id) {
      localStorage.setItem("productId", id);
      window.location = "cartDetails.html";
     }
     // search Function  
     let input = document.getElementById("search");
     input.addEventListener("keyup", function (e) {
        search(e.target.value, JSON.parse(localStorage.getItem("products")));
     
      if(e.target.value.trim() === "")
      drawProductsUI(JSON.parse(localStorage.getItem("products")));
     });
     function search(title, myArray) {
    //   for(var i = 0; i < myArray.length; i++) {
    //     if (myArray[i].title === title) {
    //       console.log(myArray[i]);
    //     }
    //   }
    let arr = myArray.filter((item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
    );
    drawProductsUI(arr);

     }

    //Add To Favorite
    let favoritesItems = localStorage.getItem("productsfavorite") 
    ? JSON.parse(localStorage.getItem("productsfavorite")) 
    : [];
  function addToFavorite(id) {
    if (localStorage.getItem("username")) {
    let choosenItem = products.find((item) => item.id === id);
    choosenItem.liked = true;
    favoritesItems = [...favoritesItems, choosenItem];
    let uniqueproducts = getUniqueArr(favoritesItems, "id");
    localStorage.setItem("productsFavorite", JSON.stringify(uniqueproducts));
    products.map(item => {
      if(item.id === choosenItem.id) {
        item.liked = true
      }
    })
    localStorage.setItem("products", JSON.stringify(products));
    drawProductsUI(products)
     } else {
       window.location = "login.html";
     }
   }

    //Function Filter Products By Size

    let sizefiler = document.getElementById("size-filter");

    sizefiler.addEventListener("change", getproductsFilteredBySize)
    function getproductsFilteredBySize(e) {
      let val = e.target.value;
      let products = JSON.parse(localStorage.getItem("products")) || products;

      if(val === "all") {
        drawProductsUI(products);
      } else {
        products = products.filter(i => i.size === val);
        drawProductsUI(products);
      }
    }


        //Edit Products
        function editproduct(id) {
          localStorage.setItem("editproduct", id);
          window.location = "editproduct.html";
        }




