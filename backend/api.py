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
@app.post('/boards/store_board/<int:board_id>')
def store_board(board_id):
    # Grab the board numbers from request body
    board_numbers = request.json.get('board_numbers')
    if board_numbers:
        # Convert the list of numbers back to a string
        board_numbers = ' '.join(str(num) for num in board_numbers)
        # Create a new instance of the board
        sudoku_board = SudokuBoard(id=board_id, board=board_numbers)
        # Store it in the database
        db.session.add(sudoku_board)
        db.session.commit()
        return f'Sudoku Board (id: {board_id}) Stored Successfully!'
    else:
        return 'Board Numbers Not Provided: Bad Board Request', 400

if __name__ == '__main__':
    app.run(debug=True)