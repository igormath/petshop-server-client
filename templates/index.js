import { products } from "./db-products.js";

const productsList = document.querySelector(".products__list");
const productsSubtitle = document.querySelector(".products__subtitle");
const inputSearch = document.querySelector(".products__search");
const cartNumber = document.querySelector(".cart__number");

window.onload=renderJSON(products);

function renderJSON(jsonInput){
    productsList.textContent = '';
    productsList.insertAdjacentHTML("afterbegin", jsonInput.map((product) => 
        `<li class="product">
    <img class="product__image" src="./assets/produtos/produto${product.id}.png" alt="Produto ${product.id}">
    <h3 class="product__name">${product.name}</h3>
    <p class="product__price">R$${(product.price).toFixed(2)}</p>
    <a href="./cart.html" class="product__btn" data-product-id=${product.id}>Comprar</a>
    </li>`
).join(''))
}

const productBtn = document.querySelectorAll(".product__btn");

function productNotFind(){
    productsList.textContent = '';
    productsList.insertAdjacentHTML("afterbegin", `<p class="products__notfind">Produto não encontrado!</p>`)
}


const inputHandler = function(e) {
    let searchProduct = e.target.value;
    let searchResult = search(searchProduct);

    if (searchResult.length >= 1){
        productsList.className = "products__list";
        productsSubtitle.className = "products__subtitle";
        renderJSON(searchResult);
    } else if (searchProduct.length >= 1){
        productsList.className = "products__list notfind";
        productsSubtitle.className = "products__subtitle hide";
        productNotFind();
    } else{
        productsList.className = "products__list";
        productsSubtitle.className = "products__subtitle";
        renderJSON(products);
    }
}

function search(searchString){
    if (typeof searchString !== 'string' || searchString.length === 0){
        return products;
    }
    
    let searchLower = searchString.toLowerCase();
    let filtered = products.filter(product => {
        if (product.name.toLowerCase().includes(searchLower)){
            return true;
        }
    })
    
    return filtered;
}

productBtn.forEach(button => {
    button.addEventListener('click', function(){
        const productId = this.getAttribute('data-product-id');
        localStorage.setItem('product-id', productId);
        localStorage.setItem('product-quant', 1);
        localStorage.setItem('product-price', products[productId - 1].price);
    }
    )
})

inputSearch.addEventListener('input', inputHandler);
