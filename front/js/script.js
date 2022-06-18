// initialisation variable
let products = []

//function pour call api

async function getProducts() {
    await fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((data) => (products = data))
        .catch(err => console.log('erreur lors du chargement des produits', err));
}

// afficher les produits
async function displayProducts() {
    await getProducts();
    let itemsId = document.getElementById('items');
    for(i = 0; i< products.length; i++){
        //creation des produits
        let link = document.createElement('a');
        link.setAttribute("href", `./product.html?id=${products[i]._id}`);
        link.setAttribute("title", `${products[i].name}`);
        itemsId.appendChild(link);

        let article = document.createElement("article");
        link.appendChild(article);

        let imgProduct = document.createElement("img");
        imgProduct.setAttribute("src", `../../back/images/kanap0${i+1}.jpeg`);
        imgProduct.setAttribute("alt", `${products[i].altTxt}`);
        article.appendChild(imgProduct);

        let titleProduct = document.createElement("h3");
        titleProduct.classList.add("productname");
        titleProduct.innerText = products[i].name;
        article.appendChild(titleProduct);

        let descriptionProduct = document.createElement("p");
        descriptionProduct.classList.add("productDescription");
        descriptionProduct.innerText = products[i].description;
        article.appendChild(descriptionProduct);
    }
}

async function main() {
    await displayProducts();
}

main();