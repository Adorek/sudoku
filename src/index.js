module.exports = function solveSudoku(matrix) {

  function saveEmptyValues(matrix) {
    var emptyValues = [];
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 0) {
          emptyValues.push([i, j]);
        }
      }
    }
    return emptyValues;
  };

  function checkRow(matrix, row, value) {
    for (var i = 0; i < matrix[row].length; i++) {
      if (matrix[row][i] === value) {
        return false;
      }
    }
    return true;
  };

  function checkColumn(matrix, column, value) {
    for (var i = 0; i < matrix.length; i++) {
      if (matrix[i][column] === value) {
        return false;
      }
    }
    return true;
  };

  function checkSquare(matrix, column, row, value) {

    var firstCorner = 0,
      rowCorner = 0,
      squareSize = 3;

    while (column >= firstCorner + squareSize) {
      firstCorner += squareSize;
    }

    while (row >= rowCorner + squareSize) {
      rowCorner += squareSize;
    }

    for (var i = rowCorner; i < rowCorner + squareSize; i++) {
      for (var j = firstCorner; j < firstCorner + squareSize; j++) {
        if (matrix[i][j] === value) {
          return false;
        }
      }
    }
    return true;
  };

  function checkValue(matrix, column, row, value) {
    if (checkRow(matrix, row, value) &&
      checkColumn(matrix, column, value) &&
      checkSquare(matrix, column, row, value)) {
      return true;
    } else {
      return false;
    }
  };

  function solveBoard(matrix, emptyValues) {
    var limit = 9,
      i, row, column, value, found;
    for (i = 0; i < emptyValues.length;) {
      row = emptyValues[i][0];
      column = emptyValues[i][1];
      value = matrix[row][column] + 1;
      found = false;
      while (!found && value <= limit) {
        if (checkValue(matrix, column, row, value)) {
          found = true;
          matrix[row][column] = value;
          i++;
        }
        else {
          value++;
        }
      }
      if (!found) {
        matrix[row][column] = 0;
        i--;
      }
    }
    return matrix;
  };
  var emptyValues = saveEmptyValues(matrix);
  return solveBoard(matrix, emptyValues);
};
