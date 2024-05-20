import { products } from "./db-products.js";

const productsContainer = document.querySelector('.products');
const cartNumber = document.querySelector(".cart__number");

const productIdLocalStorage = localStorage.getItem('product-id');
const productQuantLocalStorage = localStorage.getItem('product-quant');

const productId = products[productIdLocalStorage - 1];

window.onload=renderJSON(productId, productQuantLocalStorage);

function renderJSON(jsonInput, quant){
    cartNumber.textContent = 1;
    productsContainer.textContent = '';
    productsContainer.insertAdjacentHTML("afterbegin", 
    (`<section class="product card">
    <img class="product__image" src="./assets/produtos/produto${jsonInput.id}.png" alt="Produto ${jsonInput.id}">
    <h3 class="product__name">${jsonInput.name}</h3>
    <p class="product__price">Preço unitário: R$${(jsonInput.price).toFixed(2)}</p>
    <p class="product__quant">Quantidade: <span class="product__quant--number">${quant}</span></p>
    <p class="product__total-price">Preço total: <span class="product__price-total">${(jsonInput.price * quant).toFixed(2)}</span></p>
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

    productBtnAdd.addEventListener('click', function(){
        const quant = Number(productQuant.textContent);
        renderJSON(productId, quant + 1);
    });

    productBtnRemove.addEventListener('click', function(){
        const quant = Number(productQuant.textContent);
        if (quant > 1){
            renderJSON(productId, quant - 1);
        }
    });


}
