const selectProducts = document.querySelector(".select__products");
const form = document.querySelector("#product-remove");
const mainElement = document.querySelector(".main__remove");

window.onload=pageFirstLoad;

function pageFirstLoad(){
    fetch('http://localhost:5000/produtos')
    .then(res => res.json())
    .then(data => {
        renderSelect(data);
    })
    .catch(err => console.log(err));
}

function renderSelect(jsonInput){
    selectProducts.innerHTML = '';
    selectProducts.insertAdjacentHTML("afterbegin", jsonInput.map(product => 
        `<option value="${product.id}">${product.name}</option>`
    ).join(''));
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedProductId = selectProducts.value;
    
    fetch(`http://localhost:5000/produtos/${selectedProductId}`, {
        method: 'DELETE',
    })
    .then(res => {
        if (!res.ok){
            mainElement.insertAdjacentHTML('beforeend', `<h3 class="remove__success">Ocorreu um erro ao remover o produto</h3>`);
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
        
    })
    .then(data => {
        console.log('Produto removido com sucesso: ', data);
        mainElement.insertAdjacentHTML('beforeend', `<h3 class="remove__success">Produto removido com sucesso!</h3>`)
        pageFirstLoad();
    })
    .catch(err => console.error('Erro ao remover o produto: ', err));
});
