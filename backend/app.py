import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate 


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://root:{os.getenv('MYSQL_ROOT_PASSWORD')}@localhost:53316/team24db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(255))

class Board(db.Model):
    board_id = db.Column(db.Integer, primary_key=True)
    board_contents = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    user = db.relationship('User', backref='boards')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

