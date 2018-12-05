#===========================================================================================================
# Brian Ramirez
# CS-330 Internet Programming
# Final Project - Option B
#===========================================================================================================

import psycopg2
from flask import Flask, request, jsonify, render_template, redirect, url_for, Response, make_response, json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='/static')

#===========================================================================================================
# Connection to database is established
#===========================================================================================================
conn = psycopg2.connect(user="ramibr01", host="knuth.luther.edu", port=5432, dbname="ramibr01")
cur = conn.cursor()

#===========================================================================================================
# HOME PAGE
#===========================================================================================================
@app.route("/")
def index():
    # return render_template("homepage.html")
    return "HOME PAGE"

#===========================================================================================================
# All data from table is displayed in a HTML table
#===========================================================================================================
@app.route("/table")
def table():
    cur.execute("SELECT * FROM MOVIES")

    rows = cur.fetchall()
    movie_info = []
    for row in rows:
        print(row)
        movie_info.append(row)
    print(movie_info)

    conn.commit()

    return render_template("displaydata.html", movie_info=movie_info)

#===========================================================================================================
# Returns all data from table in JSON format
#===========================================================================================================
@app.route("/getall")
def get_all():
    cur.execute("SELECT * FROM MOVIES")

    rows = cur.fetchall()

    lst = []
    for row in rows:
        newDict = {}
        newDict["id"] = row[0]
        newDict["title"] = row[1]
        newDict["director"] = row[2]
        newDict["released"] = row[3]
        lst.append(newDict)

    # return  jsonify(lst)

    response = Response(json.dumps(lst))
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Content-Type'] = 'application/json'

    return response

#===========================================================================================================
# Deletes current table and allows to start over with new table by visiting /add/form route
#===========================================================================================================
@app.route("/deletetable")
def delete_table():
    cur.execute("DROP TABLE IF EXISTS MOVIES")
    conn.commit()

    print("Table deleted, redirecting to /add/form")

    return redirect(url_for("add_movie_form"))

#===========================================================================================================
# Returns data from specific movie from table in JSON format using id number as search query
#===========================================================================================================
@app.route("/get/<id_>")
def get_by_id(id_):
    cur.execute("SELECT * FROM MOVIES WHERE id='{}'".format(id_))
    lst = []
    for row in cur:
        print(row)
        for i in row:
            lst.append(i)
    
    # return jsonify({'id':lst[0], 'title': lst[1], 'director': lst[2], 'released': lst[3]})

    response = Response(json.dumps({'id': lst[0], "title": lst[1], "director": lst[2], "released": lst[3]}))
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Content-Type'] = 'application/json'

    return response

#============================================================================================================
# New table is created if none exists and movie info is inserted into table by gathering input from user
#============================================================================================================
@app.route("/add/form",methods=['GET', 'POST'])
def add_movie_form():
    if request.method == 'POST':
        print("Checking for user input data")
        title = request.form.get('title')
        director = request.form.get('director')
        released = request.form.get('released')
        print("User input data retrieved")

        print("Creating new table if none exists")
        cur.execute('''CREATE TABLE IF NOT EXISTS MOVIES
           (id SERIAL PRIMARY KEY,
            TITLE VARCHAR NOT NULL,
            DIRECTOR VARCHAR NOT NULL,
            RELEASED VARCHAR NOT NULL);''')
        
        print("Table created successfully/Table exists")

        print("Commencing movie data insertion")
        cur.execute("INSERT INTO MOVIES (id,TITLE,DIRECTOR,RELEASED) \
            VALUES(DEFAULT, '{}', '{}', '{}')".format(title,director,released));
        
        print("Movie info inserted successfully")
        
        print("Checking inserted data: ")
        cur.execute("SELECT * FROM MOVIES")

        rows = cur.fetchall()

        for row in rows:
            print(row)

        conn.commit()

        return redirect(url_for("index"))

    return render_template("getdata.html")

if __name__ == '__main__':
    app.run()