function bigText(text) {
    text = text.toUpperCase();
//    var length = [3,2,3,3,2,2,3,3,1,2,2,2,4,4,3,2,3,2,2,2,3,3,4,2,2,2];
    var ref = [
    // A      B     C      D       E     F     G      H       I    J     K      L     M         N         O      P     Q      R      S    T     U       V      W        X     Y     Z   [ ]
      ["   ", "_ ", " _ ", "_  ",  "_ ", "_ ", " _ ", "   ",  " ", "_ ", "  ",  "  ", "    ",   "    ",   " _ ", "_ ", " _ ", "_ ",  "  ","__", "   ",  "   ", "    ",  "  ", "  ", "_ ","  "], 
      [" |\\","\\)","(  ", "\\ \\","\\_","\\_","( _", "\\_\\","\\"," \\","\\|", "\\ ","\\\\|\\","\\\\_\\","( \\","\\)","( \\","\\)", "(_"," \\","\\ \\","\\ |","\\  |", "\\|","\\|"," |","  "],
      ["|~\\","\\)","\\_|","\\/ ", "\\_","\\ ","\\_|","\\ \\","\\","_|", "\\\\","\\_","\\  \\", "\\ \\\\","\\_)","\\ ","\\_X","\\\\"," )"," \\","\\_|", "\\| ","\\\\| ","|\\","\\ ","|_","  "]
    ];
    var lines = ["+ ", "| ", "|  ", "+  "];
    for(var i = 0; i < text.length; i++) {
        var index = text.charCodeAt(i) - 65;
        if(text.charAt(i) == " ") index = 26;
        if(index >= ref[0].length || index < 0) continue;
        lines[0] += ref[0][index] + " ";
        lines[1] += ref[1][index] + " ";
        lines[2] += ref[2][index] + " ";
    }
    lines[0] += " +";
    lines[1] += " |";
    lines[2] += "|";
    while (lines[3].length+1 < lines[2].length) lines[3] += " ";
    lines[3] += "+";
    
    return lines;
}