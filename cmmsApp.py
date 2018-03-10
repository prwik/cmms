from flask import Flask
from sqlalchemy import create_engine
from config import con_string
import json
from flask import request

engine = create_engine(con_string)



app = Flask(__name__)

@app.route("/")
def hello():
    return "Flask Index Page"

@app.route("/equipment")
def equipment():
    site_id = request.args.get('id')
    sql = "select name, description from prod.equipment where site_id={0}".format(site_id)
    res = engine.execute(sql).fetchall()
    response = []
    for row in res:
        response.append({'name': row[0], 'description': row[1]})
    return json.dumps(response)

@app.route("/test")
def test():
    site_id = request.args.get('id')
    sql = "select name, description, serial_number, make from test.equipment where site_id={0}".format(site_id)
    res = engine.execute(sql).fetchall()
    response = []
    for row in res:
        response.append({'name': row[0], 'description': row[1], 'serial_number': row[2], 'manufacturer': row[3]})
    return json.dumps(response)

if __name__ == "__main__":
    app.run()
