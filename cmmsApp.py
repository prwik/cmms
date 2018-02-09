from flask import Flask
import subprocess

app = Flask(__name__)

@app.route("/")
def hello():
    return "Flask Index Page"

@app.route("/deploy")
def deploy():
    subprocess.Popen('git pull')
    return "success"

if __name__ == "__main__":
    app.run()
