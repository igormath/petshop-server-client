from flask import Flask, request, render_template, jsonify
from data import produtos

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True

@app.route('/main')
def index():
    return render_template('index.html')

@app.route('/')
def crud():
    return render_template('crud.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/cadastrar')
def cadastrar():
    return render_template('cadastrar.html')

@app.route('/remover')
def remover():
    return render_template('remover.html')

@app.route('/atualizar')
def atualizar():
    return render_template('atualizar.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/produtos', methods=['GET'])
def read():
    nome = request.args.get('name')
    if nome:
        produtosEncontrados = [produto for produto in produtos if nome.lower() in produto['name'].lower()]
        return produtosEncontrados, 200
    return produtos, 200

@app.route('/produtos', methods=['POST'])
def create():
    produto = request.json
    idNumber = len(produtos) + 1
    produto['id'] = idNumber
    produtos.append(produto)
    return jsonify({"mensagem": "Produto adicionado com sucesso!", "produtos": produtos}), 201

@app.route('/produtos/<int:id>', methods=['DELETE'])
def delete(id):
    for i in range(len(produtos)):
        if produtos[i]["id"] == id:
            produtos.pop(i)
            return jsonify({"mensagem": "Produto removido com sucesso!", "produtos": produtos}), 200
    return jsonify({"mensagem": "Produto não encontrado!"}), 404

@app.route('/produtos/<int:id>', methods=['PUT'])
def update(id):
    for i in range(len(produtos)):
        if produtos[i]["id"] == id:
            produtoNew = request.json
            produtos[i]["name"] = produtoNew['name']
            produtos[i]["price"] = produtoNew['price']
            return jsonify({"mensagem": "Produto atualizado com sucesso!", "produtos": produtos}), 200
    return jsonify({"mensagem": "Produto não encontrado!"}), 404

app.run(debug=True)

