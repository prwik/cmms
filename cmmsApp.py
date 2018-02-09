from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Flask Index Page"

@app.route("/deploy")
def deploy():
    return "success"

if __name__ == "__main__":
    app.run()
