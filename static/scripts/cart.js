const productsContainer = document.querySelector('.products');
const cartNumber = document.querySelector(".cart__number");

const productIdLocalStorage = localStorage.getItem('product-id');

window.onload=pageFirstLoad();

function pageFirstLoad(){
    fetch('http://localhost:5000/produtos')
    .then(res => res.json())
    .then(data => {
        data.forEach(value => {
            if (value.id === Number(productIdLocalStorage)){
                console.log(value.id);
                renderJSON(value)
            }
        });
    })
    .catch(err => console.log(err));
}

function renderJSON(jsonInput){
    let priceFloat = parseFloat(jsonInput.price);
    cartNumber.textContent = 1;
    productsContainer.textContent = '';
    productsContainer.insertAdjacentHTML("afterbegin", 
    (`<section class="product card">
    <img class="product__image" src="static/images/produtos/produto${jsonInput.id}.png" alt="Produto ${jsonInput.id}">
    <h3 class="product__name">${jsonInput.name}</h3>
    <p class="product__price">Preço unitário: R$${priceFloat.toFixed(2)}</p>
    <p class="product__quant">Quantidade: <span class="product__quant--number">1</span></p>
    <p class="product__total-price">Preço total: <span class="product__price-total">${jsonInput.price}</span></p>
    <div class="product__btn__container">
        <a class="product__btn remove" data-product-id=${jsonInput.id}>-</a>
        <a class="product__btn add" data-product-id=${jsonInput.id}>+</a>
    </div>
    <button class="product__btn finish">Finalizar compra</button>
    </section>`
    ));

    const productBtnAdd = document.querySelector(".add");
    const productBtnRemove = document.querySelector(".remove");
    const productQuant = document.querySelector(".product__quant--number");
    const productPrice = document.querySelector(".product__price-total");
    let quantity = Number(productQuant.textContent);

    productBtnAdd.addEventListener('click', function(){
        quantity += 1;
        productQuant.textContent = quantity;
        productPrice.textContent = (jsonInput.price * quantity).toFixed(2);
    });

    productBtnRemove.addEventListener('click', function(){
        if (quantity > 1){
            quantity -= 1;
            productQuant.textContent = quantity;
            productPrice.textContent = (jsonInput.price * quantity).toFixed(2);
        }
    });
}
