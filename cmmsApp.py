from flask import Flask
from sqlalchemy import create_engine
from config import con_string

engine = create_engine(con_string)



app = Flask(__name__)

@app.route("/")
def hello():
    res = engine.execute('desc prod.sites').fetchall()
    print res
    return "Flask Index Page"

@app.route("/test")
def deploy():
    return "success"

if __name__ == "__main__":
    app.run()
