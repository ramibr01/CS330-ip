from flask import Flask, request, render_template, url_for, redirect, make_response
import json

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    print("IN INDEX", request.method)
    if request.data:
        return redirect(url_for('save'))

    return render_template('shopping_v3.html')

@app.route("/save", methods=["GET", 'POST'])
def save():
    print("IN SAVE",request.method)

    if request.data:
        data = request.data
        print(data)
        d = json.loads(data)

        print(d)
        for dct in d:
            for k,v in dct.items():
                print(k,v)

        return render_template("shopping_v3.html", data=d)

    return redirect(url_for("index"))

@app.route("/get", methods=['GET','POST'])
def get():
    print("IN GET", request.method)
    if request.data:
        return render_template("shopping_v3.html")
    
    return render_template("shopping_v3.html")