let localCart = [];
let productById = 0;
let cart = JSON.parse(localStorage.getItem("cart"));

async function getProductById() {
console.log(cart)
    if (cart) {
        for (localCart of cart) {
            await fetch(`http://localhost:3000/api/products/${localCart.id}`)
                .then((res) => res.json())
                .then((data) => (productById = data))
                .catch(err => console.log("erreur lors du chargement du produit", err));
                console.log(productById)
            //displayingProducts();
            //calc();
        }
    } else {
        alert("votre panier est vide");
    }
}

async function main(){
    getProductById();
}

main();
