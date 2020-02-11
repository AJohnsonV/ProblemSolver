const SLIDE_1 = "Slide 1";
const SLIDE_2 = "Slide 2";
const SLIDE_3 = "Slide 3";
const SLIDE_4 = "Slide 4";
const SLIDE_5 = "Slide 5";
const SLIDE_6 = "Slide 6";
const SLIDE_7 = "Slide 7";
const SLIDE_8 = "Slide 8";

var puzzleMover = new Mover();

puzzleMover.addMove(SLIDE_1, (s) => tryMove(1,s)); // You provide move functions
puzzleMover.addMove(SLIDE_2, (s) => tryMove(2,s));
puzzleMover.addMove(SLIDE_3, (s) => tryMove(3,s));
puzzleMover.addMove(SLIDE_4, (s) => tryMove(4,s));
puzzleMover.addMove(SLIDE_5, (s) => tryMove(5,s));
puzzleMover.addMove(SLIDE_6, (s) => tryMove(6,s));
puzzleMover.addMove(SLIDE_7, (s) => tryMove(7,s));
puzzleMover.addMove(SLIDE_8, (s) => tryMove(8,s));

function PuzzleMover() { }

PuzzleMover.prototype = puzzleMover;

// Helper functions here
function tryMove(tile, state){
    
    var tileLoc = state.getLocation(tile);
    var blankLoc = state.getLocation(0);
    
    var tileRow = tileLoc.row;
    var tileColumn = tileLoc.column;
    var blankRow = blankLoc.row;
    var blankColumn = blankLoc.column;
    
    if (tileRow !== blankRow && tileColumn !== blankColumn) {
      return null;
    }
    
    if (tileRow !== blankRow + 1 && tileRow !== blankRow - 1 && tileColumn !== blankColumn + 1 && tileColumn !== blankColumn - 1)
    {
      return null;
    }
    //return swap(blankLoc, tileLoc);
    var newTiles = swap(blankLoc, tileLoc,state);
    return new PuzzleState(newTiles);
}
function swap(loc1,loc2,state){
    var copy = state.tiles.slice();   // copies the array's top level
    copy[0] = state.tiles[0].slice(); // copies the array's first row
    copy[1] = state.tiles[1].slice(); // etc.
    copy[2] = state.tiles[2].slice();
    var r = loc1.row;
    var c = loc1.column;
    var nr = loc2.row;
    var nc = loc2.column;
    copy[r][c]=state.tiles[nr][nc];
    copy[nr][nc]=state.tiles[r][c];
    return copy;
}