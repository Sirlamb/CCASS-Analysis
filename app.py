from flask import Flask, render_template, request, jsonify
import json
import sharehold
from datetime import datetime, timedelta, timezone
import re
from flask_cors import CORS  # Import CORS

today = format(datetime.now(timezone.utc) + timedelta(hours=8), '%Y%m%d')

app = Flask(__name__, template_folder='template')
CORS(app)  # Enable CORS for all routes

headings = ("id", "name", "start", "start-display", "end", "end-display", "change", "change-percent", "change-display")
# mydata = (
#     ("001", "ABC Company", "1000", "1,000", "1200", "1,200", "200", "20%", "+200 (+20%)"),
#     ("002", "XYZ Corporation", "500", "500", "450", "450", "-50", "-10%", "-50 (-10%)")    
# )

@app.route("/")
def searchbar():
    """
    Displays the homepage and search bar of the search engine.
    """
    # history = json.loads(request.cookies.get('history', default="{}"))
    # return render_template("index.html",HISTORY=history)
    return render_template("index.html")


@app.route('/search', methods=['POST'])
def submit_search():
    """
    Performs the search and displays the results in the webpage.
    """

    # Get query from search bar
    stock = request.form.get('searchbar')

    startDate = request.form.get('start-date')
    startDate = sharehold.convert_date_format(startDate) 

    endDate = request.form.get('end-date')
    endDate = sharehold.convert_date_format(endDate) 

    stock = sharehold.validate_arg_code(stock)
    startDate = sharehold.validate_arg_date(startDate)
    endDate = sharehold.validate_arg_date(endDate)

    start_json = sharehold.searchsdw(today, startDate, stock)
    end_json = sharehold.searchsdw(today, endDate, stock)

    data = sharehold.merge_data(start_json, end_json)

    print(data[0])

    return jsonify(data)
    # return render_template("result.html", heading = headings, data=data) 

if __name__ == '__main__':
    app.run(debug=True)