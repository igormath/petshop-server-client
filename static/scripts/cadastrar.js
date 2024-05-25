const form = document.querySelector("#product-add");
const mainElement = document.querySelector(".main__cadastro");
const addStatusElement = document.querySelector(".add_status");

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const inputName = document.querySelector('.input__name');
    const inputPrice = document.querySelector('.input__price');

    addStatusElement.textContent = '';

    fetch(`http://localhost:5000/produtos`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": inputName.value,
            "price": inputPrice.value,
        })
    })
    .then(res => {
        if (!res.ok) {
            addStatusElement.textContent = 'Ocorreu um erro ao cadastrar o produto!';
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        addStatusElement.textContent = 'Produto cadastrado com sucesso!';
        console.log('Produto adicionado com sucesso: ', data);
    })
    .catch(err => {
        console.error('Erro ao adicionar o produto: ', err);
        addStatusElement.textContent = `Erro ao adicionar o produto: ${err.message}`;
    });
});
