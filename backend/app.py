# app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:team24db@db_mysql:53316/t24_db'
db = SQLAlchemy(app)

from database.models import Base

@app.before_first_request
def create_tables():
    Base.metadata.create_all(db.engine)

if __name__ == '__main__':
    app.run(host='localhost', port=5000)