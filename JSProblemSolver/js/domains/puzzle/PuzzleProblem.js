var pName = "puzzle Problem";  // You provide problem name

var pIntro = "You are Given a Puzzle in which numbered Tils can slide around.\n\
There is one blank space that holds no tile. A legal Move consists of\n\
sliding a tile into the blank space if the tile is adjacent to it. The goal\n\
is to move tiles around until they are arranged in numerical order\n\
clockwise from the upper left."; // Introductory text

var pInit = new PuzzleState([[2, 8, 3], [1, 6, 4], [7, 0, 5]]) ;  // Initial state

var pGoal = new PuzzleState([[1, 2, 3], [8, 0, 4], [7, 6, 5]]);  // Goal state

var pMvr = new PuzzleMover();   // Mover object

function PuzzleProblem() { }

PuzzleProblem.prototype =
    new Problem(pName, pIntro, pInit, pGoal, pMvr);