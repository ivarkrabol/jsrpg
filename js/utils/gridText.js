function gridText (gridText) {
    var grid = gridText.split("\n");
    for (var i = 0; i < grid.length; i++) {
        grid[i] = grid[i].split("");
    }
    return grid;
}