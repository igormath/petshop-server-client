from flask import Flask, request, render_template, jsonify
from data import produtos

app = Flask(__name__)

@app.route('/produtos_get', methods=['GET'])
def read():
    return produtos

@app.route('/produtos_post', methods=['POST'])
def create():
    produto = request.json
    idNumber = len(produtos) + 1
    produto['id'] = idNumber
    produtos.append(produto)
    return jsonify({"mensagem": "Produto adicionado com sucesso!", "produtos": produtos}), 201

@app.route('/produtos_delete/<int:id>', methods=['DELETE'])
def delete(id):
    for i in range(len(produtos)):
        if produtos[i]["id"] == id:
            produtos.pop(i)
            return jsonify({"mensagem": "Produto removido com sucesso!", "produtos": produtos}), 200
    return jsonify({"mensagem": "Produto não encontrado!"}), 404

@app.route('/produtos_update/<int:id>', methods=['PUT'])
def update(id):
    for i in range(len(produtos)):
        if produtos[i]["id"] == id:
            produtoNew = request.json
            produtos[i]["name"] = produtoNew['name']
            produtos[i]["price"] = produtoNew['price']
            return jsonify({"mensagem": "Produto atualizado com sucesso!", "produtos": produtos}), 200
    return jsonify({"mensagem": "Produto não encontrado!"}), 404

app.run(debug=True)

