from flask import Flask, request, render_template, jsonify
import sqlalchemy as db
from sqlalchemy import create_engine, MetaData, Table, delete, insert, update

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True

db_url = 'postgresql://postgres:teste123@localhost:5432/ki_petshop'
engine = create_engine(db_url)
connection = engine.connect()
metadata = db.MetaData()

Produto = db.Table('product', metadata, autoload_with=engine)

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
def read_product():
    products = []
    query = Produto.select()
    exe = connection.execute(query)
    result = exe.fetchall()

    for x in result:
        x_dict = dict(x._mapping)
        x_dict['price'] = float(x_dict['price'])
        products.append(x_dict)

    nome = request.args.get('name')
    if nome:
        produtosEncontrados = [produto for produto in products if nome.lower() in produto['name'].lower()]
        return produtosEncontrados, 200
    return products, 200

@app.route('/produtos', methods=['POST'])
def create_product():
    produto = request.json
    statement = (
            insert(Produto).
            values(name=produto['name'], price=produto['price'])
        )
    connection.execute(statement)
    connection.commit()
    return jsonify({'message': 'Produto inserido com sucesso!'}), 201

@app.route('/produtos/<int:id>', methods=['DELETE'])
def delete_product(id):
    exists = connection.execute(Produto.select().where(Produto.c.id == id)).fetchone()
    if not exists:
        return jsonify({'message': 'Produto não encontrado'}), 404

    statement = (
        delete(Produto).
        where(Produto.c.id == id)
    )
    connection.execute(statement)
    connection.commit()
    return jsonify({'message': 'Produto removido com sucesso!'}), 200

@app.route('/produtos/<int:id>', methods=['PUT'])
def update_product(id):
    produto = request.json

    exists = connection.execute(Produto.select().where(Produto.c.id == id)).fetchone()
    if not exists:
        return jsonify({'message': 'Produto não encontrado'}), 404

    statement = (
            update(Produto).
            where(Produto.c.id == id).
            values(name=produto['name'], price=produto['price'])
        )
    connection.execute(statement)
    connection.commit()
    return jsonify({'message': 'Produto atualizado com sucesso!'}), 200

app.run(debug=True)

