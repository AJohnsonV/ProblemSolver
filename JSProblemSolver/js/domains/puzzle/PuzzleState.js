
function PuzzleState(tiles) {

    this.tiles = tiles;

    this.toString = function() {
        var buf= "";
        //Horizontal Divider
        for (var i=0;i<3;i++)  {
            //Horizontal Divider
            for(var t=0;t<3;t++){
                buf += "+---";
            }
            buf += "+";
            buf += "\n";
            //Horizontalrow
            for(var l=0; l<3 ;l++){

                buf += "|";
                var a = this.tiles[i][l];
                buf += this.tileString(a);
            }
            buf += "|";
            buf += "\n";
        }
        for(var v=0;v<3;v++){
                buf += "+---";
            }
            buf+= "+";
        return buf;
    };

    this.tileString=function(tile) {
      if (tile ===0) return "   ";
      if(tile/10 ===0) return " " + tile + " ";
      return " " + tile + " ";
    };
    

    this.equals = function(other) {
	// You provide
        for (var r = 0; r < 3; r++) {
            for (var c = 0; c < 3; c++) {
                var tt = this.tiles[r][c];
                var ot = other.tiles[r][c];
                if(ot !== tt){
                    return false;
                }
            }
        }
    
    return true;
    
    };

    // Other properties and methods here
    this.getLocation = function(tile){
        for (var r = 0; r < 3; r++) {
            for (var c = 0; c < 3; c++) {
                if(this.tiles[r][c] === tile){
                 return {row: r, column: c};
                }
            }
        }
    };
    
    this.makeCanvas = function() {
        return this.makeDefaultCanvas(this);
    };
   
}

PuzzleState.prototype = STATE_PROTO;

// Helper functions here