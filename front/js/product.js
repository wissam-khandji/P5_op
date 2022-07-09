//déclaration des variables globales
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


// fonction qui récupère le produit sélectionné en fonction de son id grace à un fetch
  async function getProductById() {
    console.log(id)
    await fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => (productById = data))
        .catch(err => console.log('erreur lors du chargement des produits', err)); 
}

//fonction d'affichage des informations du produit
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
}

//fonction qui écoute les événements sur les inputs couleur et quantité et sur le bouton d'ajout au panier
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

    productToCart.id = productById._id;

//une fois le bouton cliqué on vérifie la couleur et la quantité
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

//fonction qui insère l'élémént choisi dans un array dans le local storage
 function setToLocalStorage() {
     let storageString = localStorage.getItem('cart');
     let storage = JSON.parse(storageString);
console.log(productToCart)

     //si le stockage n'est pas vide
     if(storage){
        //on recherche un élément qui a le même id et la même couleur
        let getProduct = storage.find((item) => item.id == productToCart.id && item.color == productToCart.color);
        //si on en trouve un on ajoute la nouvelle quantité désirée
        if (getProduct){
            getProduct.quantity += productToCart.quantity;
            localStorage.setItem("cart", JSON.stringify(storage));
            alert ('Quantité mise a jour');
            //sinon on ajoute un nouvel élément à l'array du localstorage
        }else{
            storage.push(productToCart);
            localStorage.setItem('cart', JSON.stringify(storage));
            alert ('Le panier a été mis a jour')
        }
        //si le local storage est vide on crée le premier élément
     }else{
        const cart = []
        cart.push(productToCart);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert ('Panier mis a jour');
     }
}

//fonction main qui appelle les fonction d'affichage et d'ajout des produits
async function main() {
    await displayProductById();
    addToCart();

}

main();