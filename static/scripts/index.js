const productsList = document.querySelector(".products__list");
const productsSubtitle = document.querySelector(".products__subtitle");
const inputSearch = document.querySelector(".products__search");
const cartNumber = document.querySelector(".cart__number");

let productBtn = [];

window.onload=pageFirstLoad();

function pageFirstLoad(){
    fetch('http://localhost:5000/produtos')
    .then(res => res.json())
    .then(data => {
        renderJSONArray(data);
    })
    .catch(err => console.log(err));
}

function renderJSONArray(jsonInput){
    productsList.textContent = '';
    productsList.insertAdjacentHTML("afterbegin", jsonInput.map((product) => {
        let priceFloat = parseFloat(product.price);
        return `<li class="product">
        <img class="product__image" src="static/images/produtos/produto${product.id}.png" alt="Produto ${product.id}">
        <h3 class="product__name">${product.name}</h3>
        <p class="product__price">R$${priceFloat.toFixed(2)}</p>
        <a href="http://localhost:5000/cart" class="product__btn" data-product-id=${product.id}>Comprar</a>
        </li>`
    }).join(''))

    productBtn = document.querySelectorAll(".product__btn");

    productBtn.forEach(button => {
        button.addEventListener('click', function(){
            const productId = this.getAttribute('data-product-id');
            localStorage.setItem('product-id', productId);
            console.log("product id botao index: ", productId);
        }
        )
    })
}


function productNotFind(){
    productsList.textContent = '';
    productsList.insertAdjacentHTML("afterbegin", `<p class="products__notfind">Produto não encontrado!</p>`)
}


const inputHandler = function(e) {
    let searchProduct = e.target.value;

    fetch(`http://localhost:5000/produtos?name=${searchProduct}`)
    .then(res => res.json())
    .then(data => {
        if (data.length >= 1){
            productsList.className = "products__list";
            productsSubtitle.className = "products__subtitle";
            renderJSONArray(data);
        } else if (searchProduct.length >= 1){
            productsList.className = "products__list notfind";
            productsSubtitle.className = "products__subtitle hide";
            productNotFind();
        } else{
            productsList.className = "products__list";
            productsSubtitle.className = "products__subtitle";
            fetch('http://localhost:5000/produtos')
            .then(res => res.json())
            .then(data => renderJSONArray(data))
            .catch(err => console.log(err));
        }
    })
    .catch(err => console.log(err));
}

inputSearch.addEventListener('input', inputHandler);
