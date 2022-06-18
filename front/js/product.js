let productById = [];
let id = '';
let href = window.location.href;
let url = new URL(href);
let searchId = new URLSearchParams(url.search);
products = [];
let productToCart = {
    id : "",
    quantity : 0,
    color : ""
}

// recup id produit dans URL de la page
if(searchId.has("id")) {
    id = searchId.get("id");
  }

async function getProductById() {
    await fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => (productById = data))
        .catch(err => console.log('erreur lors du chargement des produits', err));
}

//afficher l'image
async function displayProductById(){
    await getProductById();
    const itemImg = document.querySelector("div.item__img");
    const productImg = document.createElement("img");
    productImg.setAttribute("src", productById.imageUrl);
    productImg.setAttribute("alt", `${productById.altTxt}`);
    itemImg.appendChild(productImg);

    const productTitle = document.getElementById("title");
    productTitle.innerText = productById.name;

    const productPrice = document.getElementById("price");
    productPrice.innerText = productById.price;

    const productDescription = document.getElementById("description");
    productDescription.innerText = productById.description;

    const productColors = document.getElementById("colors")
    for (let i = 0; i < productById.colors.length; i++){
        let newColor = document.createElement("option");
        newColor.setAttribute("value", `${productById.colors[i]}`);
        newColor.innerText = productById.colors[i];
        productColors.appendChild(newColor);
    }

    //console.log(products)
}

function addToCart(){
    const addToCartButton = document.getElementById("addToCart");
    const quantityInput = document.getElementById("quantity");
    const productColors = document.getElementById("colors"); 

    quantityInput.addEventListener("input", function(event){
        productToCart.quantity = parseInt(event.target.value)
    })

    productColors.addEventListener("input", function(event){
        productToCart.color = event.target.value;
    })

    productToCart.id = productToCart._id;

    addToCartButton.addEventListener("click", function(event){
        if(productToCart.color == ""){
            alert('Veuillez choisir une couleur')
        }else if ((productToCart.quantity < 1) || (productToCart.quantity == "") || (productToCart.quantity > 100)){
            alert('Veuillez choisir une quantité comprise en tre 1 et 100')
        }else{
            setToLocalStorage();
        }
    })

}

 function setToLocalStorage() {
     
 }


async function main() {
    await displayProductById();
    addToCart();

}

main();