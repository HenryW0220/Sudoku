import copy
import random
#import "../app/app.py"
import argparse
## Class influenced by example found here https://medium.com/codex/building-a-sudoku-solver-and-generator-in-python-1-3-f29d3ede6b23
## How the board generation works:
## 1) create 3 randomized valid 3x3 squares and assign to the upper left square, the middle, and bottem left square (generateRandomCompleteBoard)
## 2) Finish the board generation by iteratively assigning a random number to a spot and checking for validity, if valid move on (finishBoardGen)
## 3) Based on difficulty remove squares checking each time if there is only 1 solution, the higher the difficulty the longer this will take
## Usage for generation: 
# Call = Board.generateQuestionBoardCode(difficulty) , where "Board" is board object and "difficulty" is a number 1-3 (easy, medium, hard)
# return = [question_board, answer_board] 
# format of question_board, answer_board = numbers [1-9] or 0 for blank spots, in the form of a string separated by spaces
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
    
    def createBlankBoard(self): # resets the board to an empty state
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
    
    def findSpaces(self): # finds the first empty space in the board, which is represented by a 0
        for row in range(len(self.board)):
            for col in range(len(self.board[0])):
                if self.board[row][col] == 0:
                    return (row, col)

        return False
    
    def checkSpace(self, num, space): #checks to see if a number can be fitted into a specifc space; row, col
        if not self.board[space[0]][space[1]] == 0: # check to see if space is a number already
            return False

        for col in self.board[space[0]]: # check to see if number is already in row
            if col == num:
                return False

        for row in range(len(self.board)): # check to see if number is already in column
            if self.board[row][space[1]] == num:
                return False

        boxRow = space[0] // 3
        boxCol = space[1] // 3

        for i in range(3): # check to see if internal box already has number
            for j in range(3):
                if self.board[i + (boxRow * 3)][j + (boxCol * 3)] == num:
                    return False
        
        return True
    
    def boardToCode(self, input_board=None): # turn a pre-existing board into a boardCode
        if input_board:
            inputBoardCode = ''.join([str(i) for j in input_board for i in j])
            return inputBoardCode
        else:
            self.boardCode = ''.join([str(i) for j in self.board for i in j])
            return self.boardCode
        
    def solve(self): # solves a board using recursion
        spacesAvailable = self.findSpaces()

        if not spacesAvailable:
            return True
        else:
            row, col = spacesAvailable

        for n in range(1, 10):
            if self.checkSpace(n, (row, col)):
                self.board[row][col] = n
                
                if self.solve():
                    return self.board

                self.board[row][col] = 0

        return False

    def solveForCode(self): # solves a board and returns the code of the solved board
        return self.boardToCode(self.solve())

    def generateRandomCompleteBoard(self): # generates a brand new completely random board full of numbers
        self.createBlankBoard()

        possibleNums = list(range(1, 10))
        for row in range(3):
            for col in range(3):
                choiceNum = random.choice(possibleNums)
                self.board[row][col] = choiceNum
                possibleNums.remove(choiceNum)

        possibleNums = list(range(1, 10))
        for row in range(3, 6):
            for col in range(3, 6):
                choiceNum = random.choice(possibleNums)
                self.board[row][col] = choiceNum
                possibleNums.remove(choiceNum)

        possibleNums = list(range(1, 10))
        for row in range(6, 9):
            for col in range(6, 9):
                choiceNum = random.choice(possibleNums)
                self.board[row][col] = choiceNum
                possibleNums.remove(choiceNum)

        return self.finishBoardGen()
        
    def finishBoardGen(self): # uses recursion to finish generating a random board
        for row in range(len(self.board)):
            for col in range(len(self.board[row])):
                if self.board[row][col] == 0:
                    randNum = random.randint(1, 9)

                    if self.checkSpace(randNum, (row, col)):
                        self.board[row][col] = randNum

                        if self.solve():
                            self.finishBoardGen()
                            return self.board

                        self.board[row][col] = 0

        return False
    
    def solveToFindNumberOfSolutions(self, row, col): # solves the board using recursion, is used within the findNumberOfSolutions method
        for n in range(1, 10):
            if self.checkSpace(n, (row, col)):
                self.board[row][col] = n

                if self.solve():
                    return self.board

                self.board[row][col] = 0

        return False
    
    def findSpacesToFindNumberOfSolutions(self, board, h): # finds the first empty space it comes across, is used within the findNumberOfSolutions method
        k = 1
        for row in range(len(board)):
            for col in range(len(board[row])):
                if board[row][col] == 0:
                    if k == h:
                        return (row, col)

                    k += 1

        return False
    
    def findNumberOfSolutions(self): # finds the number of solutions to a board and returns the list of solutions
        z = 0
        list_of_solutions = []

        for row in range(len(self.board)):
            for col in range(len(self.board[row])):
                if self.board[row][col] == 0:
                    z += 1

        for i in range(1, z+1):
            board_copy = copy.deepcopy(self)

            row, col = self.findSpacesToFindNumberOfSolutions(board_copy.board, i)
            board_copy_solution = board_copy.solveToFindNumberOfSolutions(row, col)

            list_of_solutions.append(self.boardToCode(input_board=board_copy_solution))

        return list(set(list_of_solutions))
    
    def generateQuestionBoard(self, fullBoard, difficulty): # generates a question board with a certain number of cells removed depending on the chosen difficulty
        self.board = copy.deepcopy(fullBoard)
        
        if difficulty == 1:
            squares_to_remove = 27
        elif difficulty == 2:
            squares_to_remove = 33
        elif difficulty == 3:
            squares_to_remove = 46
        else:
            return

        counter = 0
        while counter < 4:
            rRow = random.randint(0, 2)
            rCol = random.randint(0, 2)
            if self.board[rRow][rCol] != 0:
                self.board[rRow][rCol] = 0
                counter += 1

        counter = 0
        while counter < 4:
            rRow = random.randint(3, 5)
            rCol = random.randint(3, 5)
            if self.board[rRow][rCol] != 0:
                self.board[rRow][rCol] = 0
                counter += 1

        counter = 0
        while counter < 4:
            rRow = random.randint(6, 8)
            rCol = random.randint(6, 8)
            if self.board[rRow][rCol] != 0:
                self.board[rRow][rCol] = 0
                counter += 1

        squares_to_remove -= 12
        counter = 0
        while counter < squares_to_remove:
            row = random.randint(0, 8)
            col = random.randint(0, 8)

            if self.board[row][col] != 0:
                n = self.board[row][col]
                self.board[row][col] = 0

                if len(self.findNumberOfSolutions()) != 1:
                    self.board[row][col] = n
                    continue

                counter += 1

        return self.board, fullBoard
    
    def generateQuestionBoardCode(self, difficulty): # generates a new random board and its board code depending on the difficulty
        # TODO add spaces to completed board
        self.board, solution_board = self.generateQuestionBoard(self.generateRandomCompleteBoard(), difficulty)
        return ' '.join(self.boardToCode()), ' '.join(self.boardToCode(solution_board))
    
if __name__ == '__main__':
    # Usage example
    board = Board()

    question_board = board.generateQuestionBoardCode(2) # generates a medium level sudoku
    print(question_board[0])
    print (question_board[1])
    