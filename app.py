import os
from flask import Flask, render_template
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/health")
def health():
    return {"status": "ok", "project": "AdalHelp AI Global"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
