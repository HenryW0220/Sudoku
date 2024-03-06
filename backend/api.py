from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
import numpy as np

app = Flask(__name__)

#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/db_name'

#db = SQLAlchemy(app)

# GET endpoint to retrieve a user's Sudoku board from the MySQL database.
@app.get('/boards/retrieve_board')
def retrieve_board():
    # Get the board using the board ID (it will be the first number in the list)
    # Will get a list of numbers from the database
    board_id = request.args.get('board_id')
    # board column, starts with board_id followed by a comma, deliminators?
    sudoku_board = SudokuBoard.query.filter(SudokuBoard.board.startswith(f"{board_id},")).first()
        # id column?
        #sudoku_board = SudokuBoard.query.filter_by(id=board_id).first()
    # Parse the list of numbers into an array
    board_numbers = [int(num) for num in sudoku_board.board]
        #board_array = np.array(board_list)
    # Return the array of numbers
    return board_numbers

# POST endpoint to store a user's Sudoku board in the MySQL database.
@app.post('/boards/store_board')
def store_board():
    # Given a list of numbers
    # Convert to a string of numbers
    # Store with unique board ID
    pass

# if __name__ == '__main__':
#     app.run(debug=True)