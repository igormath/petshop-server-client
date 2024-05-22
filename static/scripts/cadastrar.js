const form = document.querySelector("#product-add");

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const inputName = document.querySelector('.input__name');
    const inputPrice = document.querySelector('.input__price');
    console.log("Input name: ", inputName.value);
    console.log("Input price: ", inputPrice.value);
    
    fetch(`http://localhost:5000/produtos`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(
            {
                "name": inputName.value,
                "price": inputPrice.value,
            }
        )
    })
    .then(res => {
        if (!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json();
    })
    .then(data => {
        console.log('Produto adicionado com sucesso: ', data);
    })
    .catch(err => console.error('Erro ao adicionar o produto: ', err));
});