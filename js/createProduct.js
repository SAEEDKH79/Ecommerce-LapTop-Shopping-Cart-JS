// Varlables

let productName = document.getElementById("product-name");
let productDesc = document.getElementById("product-desc");
let productSizeSelect = document.getElementById("product-size");
let createform = document.getElementById("create-form");
let inputfile = document.getElementById("upload-image-file");
let productSizeValue;
let productImage;

// Events
productSizeSelect.addEventListener("change" , getproductSizeValue);
createform.addEventListener("submit" , createproductfun);
inputfile.addEventListener("change", uploadImage);

// function
function getproductSizeValue(e) {
 productSizeValue = e.target.value;
}

function createproductfun(e) {
 e.preventDefault();
 let allproducts = JSON.parse(localStorage.getItem("products")) || productsDB;
 let nameValue = productName.value;
 let descValue = productDesc.value;

 if(nameValue && descValue) {
    let obj = {
        id: allproducts ? allproducts.length + 1 : 1,
        qty: 1,
        imageUrl: productImage,
        size: productSizeValue,
        title: nameValue,
        desc: descValue,
        isMe: "Y",
     };
     let newproducts = allproducts ? [...allproducts, obj] : [obj];
     localStorage.setItem("products", JSON.stringify(newproducts));

     productName.value = "";
     productDesc.value = "";
     productSizeSelect.Value = "";
     
     setTimeout(() => {
       window.location = "index.html";
     } , 500)
 } else {
    alert("Enter Data ..");
 }
}

// UploadImage

let preview;
function uploadImage() {
let file = this.files[0];

let type = ["image/jpeg", "image/png"];
if(type.indexOf(file.type) == -1) {
    alert("Type Not Supported");
    return;
}
if(file.size > 2 * 1024 * 1024) {
    alert("Image Not Exced 2MG");  
    return;
}
getImageBase64(file);
//  productImage = URL.createObjectURL(file);
}
function getImageBase64(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
     productImage = reader.result;
    };
    reader.onerror = function () {
    alert("Error !!");   
    }
}
