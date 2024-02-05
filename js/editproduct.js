
// Varlables

let products = JSON.parse(localStorage.getItem("products")) || productsDB;
let productId = JSON.parse(localStorage.getItem("editproduct"));
let getproduct = products.find((i) => i.id === productId);

console.log("befor update", getproduct);

let productName = document.getElementById("product-name");
let productDesc = document.getElementById("product-desc");
let productSizeSelect = document.getElementById("product-size");
let updateform = document.getElementById("update-form");
let inputfile = document.getElementById("upload-image-file");
let productSizeValue;
let productImage;

productName.value = getproduct.title;
productDesc.value = getproduct.desc;
productSizeSelect.value = getproduct.size;
productImage = getproduct.imageUrl;

// Events
productSizeSelect.addEventListener("change" , getproductSizeValue);
updateform.addEventListener("submit" , updateProductFun);
inputfile.addEventListener("change", uploadImage);

// function
function getproductSizeValue(e) {
 productSizeValue = e.target.value;
}

function updateProductFun(e) {
 e.preventDefault();
getproduct.title = productName.value;
getproduct.desc = productDesc.value;
getproduct.size = productSizeValue;
getproduct.imageUrl = productImage;

console.log("after update", getproduct);

localStorage.setItem("products", JSON.stringify(products));

setTimeout(() => {
    window.location = "index.html";
}, 500)


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
    };
}
