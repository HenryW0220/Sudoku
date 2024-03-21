import copy
import random
# import "../app/app.py"
import argparse
# Class heavily influenced by example found here https://medium.com/codex/building-a-sudoku-solver-and-generator-in-python-1-3-f29d3ede6b23


class Board:
    def __init__(self, boardCode=None):
        self.createBlankBoard()

        if boardCode:
            self.boardCode = boardCode

            for row in range(9):
                for col in range(9):
                    self.board[row][col] = int(boardCode[0])
                    boardCode = boardCode[1:]
        else:
            self.boardCode = None

    def createBlankBoard(self):  # resets the board to an empty state
        self.board = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]

        return self.board

    def findSpaces(self):  # finds the first empty space in the board, which is represented by a 0
        for row in range(len(self.board)):
            for col in range(len(self.board[0])):
                if self.board[row][col] == 0:
                    return (row, col)

        return False

    # checks to see if a number can be fitted into a specifc space; row, col
    def checkSpace(self, num, space):
        # check to see if space is a number already
        if not self.board[space[0]][space[1]] == 0:
            return False

        for col in self.board[space[0]]:  # check to see if number is already in row
            if col == num:
                return False

        for row in range(len(self.board)):  # check to see if number is already in column
            if self.board[row][space[1]] == num:
                return False

        boxRow = space[0] // 3
        boxCol = space[1] // 3

        for i in range(3):  # check to see if internal box already has number
            for j in range(3):
                if self.board[i + (boxRow * 3)][j + (boxCol * 3)] == num:
                    return False

        return True

    def boardToCode(self, input_board=None):  # turn a pre-existing board into a boardCode
        if input_board:
            _boardCode = ''.join([str(i) for j in input_board for i in j])
            return _boardCode
        else:
            self.boardCode = ''.join([str(i) for j in self.board for i in j])
            return self.boardCode

    def solve(self):  # solves a board using recursion
        _spacesAvailable = self.findSpaces()

        if not _spacesAvailable:
            return True
        else:
            row, col = _spacesAvailable

        for n in range(1, 10):
            if self.checkSpace(n, (row, col)):
                self.board[row][col] = n

                if self.solve():
                    return self.board

                self.board[row][col] = 0

        return False

    def solveForCode(self):  # solves a board and returns the code of the solved board
        return self.boardToCode(self.solve())

    # generates a brand new completely random board full of numbers
    def __generateRandomCompleteBoard(self):
        self.createBlankBoard()

        _l = list(range(1, 10))
        for row in range(3):
            for col in range(3):
                _num = random.choice(_l)
                self.board[row][col] = _num
                _l.remove(_num)

        _l = list(range(1, 10))
        for row in range(3, 6):
            for col in range(3, 6):
                _num = random.choice(_l)
                self.board[row][col] = _num
                _l.remove(_num)

        _l = list(range(1, 10))
        for row in range(6, 9):
            for col in range(6, 9):
                _num = random.choice(_l)
                self.board[row][col] = _num
                _l.remove(_num)

        return self.__generateCont()

    def __generateCont(self):  # uses recursion to finish generating a random board
        for row in range(len(self.board)):
            for col in range(len(self.board[row])):
                if self.board[row][col] == 0:
                    _num = random.randint(1, 9)

                    if self.checkSpace(_num, (row, col)):
                        self.board[row][col] = _num

                        if self.solve():
                            self.__generateCont()
                            return self.board

                        self.board[row][col] = 0

        return False

    # solves the board using recursion, is used within the findNumberOfSolutions method
    def __solveToFindNumberOfSolutions(self, row, col):
        for n in range(1, 10):
            if self.checkSpace(n, (row, col)):
                self.board[row][col] = n

                if self.solve():
                    return self.board

                self.board[row][col] = 0

        return False

    # finds the first empty space it comes across, is used within the findNumberOfSolutions method
    def __findSpacesToFindNumberOfSolutions(self, board, h):
        _k = 1
        for row in range(len(board)):
            for col in range(len(board[row])):
                if board[row][col] == 0:
                    if _k == h:
                        return (row, col)

                    _k += 1

        return False

    # finds the number of solutions to a board and returns the list of solutions
    def findNumberOfSolutions(self):
        _z = 0
        _list_of_solutions = []

        for row in range(len(self.board)):
            for col in range(len(self.board[row])):
                if self.board[row][col] == 0:
                    _z += 1

        for i in range(1, _z+1):
            _board_copy = copy.deepcopy(self)

            _row, _col = self.__findSpacesToFindNumberOfSolutions(
                _board_copy.board, i)
            _board_copy_solution = _board_copy.__solveToFindNumberOfSolutions(
                _row, _col)

            _list_of_solutions.append(self.boardToCode(
                input_board=_board_copy_solution))

        return list(set(_list_of_solutions))

    # generates a question board with a certain number of cells removed depending on the chosen difficulty
    def generateQuestionBoard(self, fullBoard, difficulty):
        self.board = copy.deepcopy(fullBoard)

        if difficulty == 0:
            _squares_to_remove = 36
        elif difficulty == 1:
            _squares_to_remove = 46
        elif difficulty == 2:
            _squares_to_remove = 52
        else:
            return

        _counter = 0
        while _counter < 4:
            _rRow = random.randint(0, 2)
            _rCol = random.randint(0, 2)
            if self.board[_rRow][_rCol] != 0:
                self.board[_rRow][_rCol] = 0
                _counter += 1

        _counter = 0
        while _counter < 4:
            _rRow = random.randint(3, 5)
            _rCol = random.randint(3, 5)
            if self.board[_rRow][_rCol] != 0:
                self.board[_rRow][_rCol] = 0
                _counter += 1

        _counter = 0
        while _counter < 4:
            _rRow = random.randint(6, 8)
            _rCol = random.randint(6, 8)
            if self.board[_rRow][_rCol] != 0:
                self.board[_rRow][_rCol] = 0
                _counter += 1

        _squares_to_remove -= 12
        _counter = 0
        while _counter < _squares_to_remove:
            _row = random.randint(0, 8)
            _col = random.randint(0, 8)

            if self.board[_row][_col] != 0:
                n = self.board[_row][_col]
                self.board[_row][_col] = 0

                if len(self.findNumberOfSolutions()) != 1:
                    self.board[_row][_col] = n
                    continue

                _counter += 1

        return self.board, fullBoard

    # generates a new random board and its board code depending on the difficulty
    def generateQuestionBoardCode(self, difficulty):
        self.board, _solution_board = self.generateQuestionBoard(
            self.__generateRandomCompleteBoard(), difficulty)
        return self.boardToCode(), self.boardToCode(_solution_board)


if __name__ == '__main__':
    # Usage example
    board = Board()

    question_board = board.generateQuestionBoardCode(
        1)  # generates a medium level sudoku
    print(question_board[0])
    print(question_board[1])

    # boardCode = '300105000060200000008090060050000800800007040071009035000900084704006000902048300'
    # solved_board_code = Board(boardCode).solveForCode() # solves a hard level sudoku

    # TODO plug into backend, import backend functionality
    # TODO plug into frontend using correct formatting
