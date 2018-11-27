from flask import Flask, session, redirect, url_for, escape, request, render_template

app = Flask(__name__)

app.secret_key = b'secretkey'

@app.route('/')
def index():
    if 'username' in session:
        return render_template("index.html", username=escape(session['username']))
    return redirect(url_for("login"))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        return redirect(url_for('index'))

    return render_template("login.html")

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))
