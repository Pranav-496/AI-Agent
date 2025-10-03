from flask import Flask, render_template, request
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html", snapshot=None)

@app.route("/fetch", methods=["POST"])
def fetch():
    url = request.form["url"]  # take input from user form
    res = requests.get(url)
    soup = BeautifulSoup(res.text, "html.parser")
    text = " ".join([p.get_text() for p in soup.find_all("p")])
    return render_template("index.html", snapshot=text)

if __name__ == "__main__":
    app.run(debug=True)
