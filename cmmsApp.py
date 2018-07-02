from flask import Flask, jsonify
from sqlalchemy import create_engine
from config import con_string
import json
from flask import request

engine = create_engine(con_string)



app = Flask(__name__)

@app.route("/")
def hello():
    return "Flask Index Page"

@app.route("/check_lists", methods=['POST'])
def check_lists():
    data = request.values
    print data
    return jsonify(data)

@app.route("/equipment")
def equipment():
    site_id = request.args.get('id')
    sql = "select name, description from prod.equipment where site_id={0}".format(site_id)
    res = engine.execute(sql).fetchall()
    response = []
    for row in res:
        response.append({'name': row[0], 'description': row[1]})
    return json.dumps(response)

@app.route("/test_equipment")
def test_equipment():
    site_id = request.args.get('id')
    sql = "select name, description, serial_number, make from test.equipment where site_id={0}".format(site_id)
    res = engine.execute(sql).fetchall()
    response = []
    for row in res:
        response.append({'name': row[0], 'description': row[1], 'serial_number': row[2], 'manufacturer': row[3]})
    return json.dumps(response)

@app.route("/test_sites")
def test_sites():
    sql = "select name, street, city, state, zip from test.sites"
    res = engine.execute(sql).fetchall()
    response = []
    for row in res:
        response.append({'name': row[0], 'street': row[1], 'city': row[2], 'state': row[3], 'zip': row[4]})
    return json.dumps(response)

if __name__ == "__main__":
    app.run()
