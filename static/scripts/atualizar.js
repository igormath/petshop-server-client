const selectProducts = document.querySelector(".select__products");
const form = document.querySelector("#product-att");
const inputName = document.querySelector('.input__name');
const inputPrice = document.querySelector('.input__price');
const mainElement = document.querySelector(".main__att");

window.onload=pageFirstLoad;

function pageFirstLoad(){
    fetch('http://localhost:5000/produtos')
    .then(res => res.json())
    .then(data => {
        selectProducts.innerHTML = '';
        renderSelect(data);
        selectProducts.addEventListener('change', function() {
            updateFormFields(data, selectProducts.value);
        });
    })
    .catch(err => console.log(err));
}

function renderSelect(jsonInput){
    selectProducts.innerHTML = '<option value=""></option>'
    selectProducts.insertAdjacentHTML("beforeend", jsonInput.map(product => 
        `<option value="${product.id}">${product.name}</option>`
    ).join(''));
}

function updateFormFields(products, selectedProductId) {
    const selectedProduct = products.find(product => product.id == selectedProductId);
    if (selectedProduct) {
        inputName.value = selectedProduct.name;
        inputPrice.value = selectedProduct.price;
    }
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedProductId = parseInt(selectProducts.value);
    const updatedName = inputName.value;
    const updatedPrice = parseFloat(inputPrice.value);
    
    fetch(`http://localhost:5000/produtos/${selectedProductId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: updatedName,
            price: updatedPrice
        }),
    })
    .then(res => {
        if (!res.ok){
            mainElement.insertAdjacentHTML('beforeend', `<h3 class="remove__success">Ocorreu um erro ao atualizar o produto</h3>`)
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json();
    })
    .then(data => {
        console.log('Produto atualizado com sucesso: ', data);
        mainElement.insertAdjacentHTML('beforeend', `<h3 class="remove__success">Produto atualizado com sucesso!</h3>`)
        pageFirstLoad();
    })
    .catch(err => console.error('Erro ao atualizar o produto: ', err));
});
