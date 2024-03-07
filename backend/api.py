from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/db_name'

db = SQLAlchemy(app)

class SudokuBoard(db.Model):
    __tablename__ = 'sudoku_boards'

    id = db.Column(db.Integer, primary_key=True)
    board = db.Column(db.String)

# GET endpoint to retrieve a user's Sudoku board from the MySQL database.
@app.get('/boards/retrieve_board/<int:board_id>')
def retrieve_board(board_id):
    # Retrieve row of DB whose id is equal to that of board_id
    sudoku_board = SudokuBoard.query.filter_by(id=board_id).first()

    if sudoku_board:
        # Access board column of that row to split string of numbers and convert to ints all into a list
        board_numbers = [int(num) for num in sudoku_board.board.split()]
        # Return tuple of board id and list of board numbers
        return board_id, board_numbers
    else:
        return 'Invalid Board ID: Board Not Found', 404

# POST endpoint to store a user's Sudoku board in the MySQL database.
@app.post('/boards/store_board')
def store_board():
    # Given a list of numbers (from the request body?)
    board_numbers = request.json.get('numbers')
    # Generate a board ID? or is it given?

    # Convert to a string of numbers

    # Create a new instance of the board
    # Store it in the database
    return 'Board stored successfully with id _'

# if __name__ == '__main__':
#     app.run(debug=True)