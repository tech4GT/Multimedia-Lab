
(function main() {
    let board =
        [
            [3, 0, 6, 5, 0, 8, 4, 0, 0],
            [5, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 8, 7, 0, 0, 0, 0, 3, 1],
            [0, 0, 3, 0, 1, 0, 0, 8, 0],
            [9, 0, 0, 8, 6, 3, 0, 0, 5],
            [0, 5, 0, 0, 9, 0, 6, 0, 0],
            [1, 3, 0, 0, 0, 0, 2, 5, 0],
            [0, 0, 0, 0, 0, 0, 0, 7, 4],
            [0, 0, 5, 2, 0, 6, 3, 0, 0]
        ];
    let N = board.length;

    if (solveSudoku(board, N)) {
        console.log("yes");
    }
    else {
        System.out.println("No solution");
    }
})()



function solveSudoku(board, n) {
    let row = -1,
        col = -1,
        isEmpty = true;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] == 0) {
                row = i;
                col = j;

                isEmpty = false;
                break;
            }
        }
        if (!isEmpty) {
            break;
        }
    }

    // no empty space left
    if (isEmpty) {
        return true;
    }

    for (let num = 1; num <= n; num++) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board, n)) {
                return true;
            }
            else {
                board[row][col] = 0;
            }
        }
    }
    return false;
}

function isSafe(board,
    row, col,
    num) {

    for (let d = 0; d < board.length; d++) {
        if (board[row][d] == num) {
            return false;
        }
    }

    for (let r = 0; r < board.length; r++) {

        if (board[r][col] == num) {
            return false;
        }
    }

    let sqrt = Math.sqrt(board.length)
        , boxRowStart = row - row % sqrt
        , boxColStart = col - col % sqrt;

    for (let r = boxRowStart;
        r < boxRowStart + sqrt; r++) {
        for (let d = boxColStart;
            d < boxColStart + sqrt; d++) {
            if (board[r][d] == num) {
                return false;
            }
        }
    }

    return true;
}