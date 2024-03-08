from typing import List, Dict
from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

@app.route('/') 
def setup():
    connection = mysql.connector.connect(
        user='root', 
        password='password',
        host='db',
        port='3306',
        database='TEST_DB'
    )

    cursor = connection.cursor()
    cursor.execute('USE TEST_DB')
    cursor.execute('SELECT * FROM Board')
    result = cursor.fetchall()  # Fetch all rows from the cursor
    connection.close()
    
    # Convert result to a list of dictionaries for JSON serialization
    data = [{'board_id': row[0], 'board_contents': row[1]} for row in result]
    
    # Return the data as JSON response
    return data


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)