import os
import requests
from flask import Flask, request, render_template, send_from_directory
from flask import redirect, url_for
import psycopg2
import records

app = Flask(__name__)

def get_data_from_db(query):
    try:
        conn = psycopg2.connect(
            user="ramibr01", host="knuth.luther.edu", port=5432, dbname="world"
        )
    except:
        raise ConnectionError("Could not connect to the database")
    cur = conn.cursor()
    cur.execute(query)
    rows = cur.fetchall()
    return rows

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "GET":
        return render_template("index.html")

    if request.form.get("country"):
        # print("form all",request.form)
        country = request.form.get("country")
        # print("COUNTRY", country)
        query = f"select * from country where code='{country}';"
        result = get_data_from_db(query)
        # print("RESULT", result)
        return render_template("country_result.html", rows=result)
    
    if request.form.get("region"):
        # print("form regions",request.form)
        region = request.form.get("region")
        # print("REGION", region)
        query = f"select * from country where region='{region}';"
        result = get_data_from_db(query)
        # print("RESULT", result)
        return render_template("regions_result.html", rows=result)
    
    if request.form.get("continent"):
        # print("form continents",request.form)
        continent = request.form.get("continent")
        # print("COUNTRY", continent)
        query = f"select * from country where continent='{continent}';"
        result = get_data_from_db(query)
        # print("RESULT", result)
        return render_template("continents_result.html", rows=result)

    result = get_data_from_db(query)
    # print("RESULT", result)
    return render_template("country_result.html", rows=result)

@app.route("/country", methods=["GET"])
def country():
    all_countries = get_data_from_db("select code, name from country;")
    # print('countries',all_countries)
    return render_template("country.html", options=all_countries)

@app.route("/region", methods=["GET"])
def region():
    all_regions = get_data_from_db("select region from country;")
    # print('regions',all_regions)
    region_list = []
    for r in all_regions:
        if r not in region_lst:
            region_lst.append(r)
    return render_template("regions.html", options=region_lst)

@app.route("/continent", methods=["GET"])
def continent():
    all_continents = get_data_from_db("select continent from country;")
    # print('continents',all_continents)
    continent_list = []
    for c in all_continents:
        if c not in continent_list:
            continent_list.append(c)
    return render_template("continents.html", options=continent_list)

if __name__ == "__main__":
    app.run(host="0.0.0.0")