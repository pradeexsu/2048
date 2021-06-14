board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]
const n = 4

let _2048 = () => {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    let x = getRandFromZeroToN(n);
    let y = getRandFromZeroToN(n);

    board[x][y] = getRandomOf2OR4()
    let pos = getIndexOfAllEmptyPos(board)
    pos = getRandomPos(pos)
    board[pos[0]][pos[1]] = getRandomOf2OR4()
    print(board)
}

let print = (board) => {
    board.map(function(row) {
        console.log(row)
    })
    console.log();
}

function getIndexOfAllEmptyPos(board) {
    emptyPos = []
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 0)
                emptyPos.push([i, j])
        }
    }
    return emptyPos
}

function getRandFromZeroToN(n) {
    return Math.floor(Math.random() * n)
}

function getRandomPos(posList) {
    return posList[getRandFromZeroToN(posList.length)]
}

function getRandomOf2OR4() {
    return Math.random() > .5 ? 2 : 4
}

function tiltLeft(board) {
    let n = board[0].length
    board.map(swipe)
}

function tiltRight(board) {
    let n = board[0].length
    board.map(function(row) {
        row.reverse()
        row = swipe(row)
        row.reverse(row)
    })
}

function tiltUp(board) {
    let n = board.length
    transpose(board)
    board.map(function(row) {
        row = swipe(row)
    })
    transpose(board)
}

function tiltDown(board) {
    let n = board.length
    transpose(board)
    board.map(function(row) {
        row.reverse()
        row = swipe(row)
        row.reverse(row)
    })
    transpose(board)

}

// this function is transpose along principal digonal of the matrix
function transpose(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < i; j++) {
            const tmp = board[i][j];
            board[i][j] = board[j][i];
            board[j][i] = tmp;
        }
    }
}

// this function is transpose along other then principal digonal of the matrix

function transpose2(board) {
    let n = board.length
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            const tmp = board[i][j];
            board[i][j] = board[n - j - 1][n - 1 - i];
            board[n - j - 1][n - 1 - i] = tmp;
        }
    }
}

// pick first non empty
// iterate from leftside pick first non-empty site and put in first empty tile or last un-used tile in same row



let swipe = (row) => {
    let n = row.length
    let last_merge = -1
    for (let left = 1; left < n; left++) {

        if (row[left] === 0)
            continue
        else {
            // non zero value in iteration ...
            for (let i = left - 1; i > last_merge; i--) {
                if (row[i] === row[left]) {
                    row[i] *= 2;
                    row[left] = 0
                    last_merge = i
                    break
                } else if (i === 0 && row[i] === 0) {
                    row[i] = row[left]
                    row[left] = 0;
                } else if (row[i] !== 0) {
                    row[i + 1] = row[left];
                    if (i + 1 != left) {
                        row[left] = 0
                    }
                    // last_merge = i
                    break
                } else if (last_merge + 1 == i) {
                    row[i] = row[left];
                    // if (i + 1 != left) {
                    row[left] = 0
                        // }
                        // last_merge = i
                    break
                }
            }
        }
        // console.log(left);
        // console.log(row);
    }
    return row
}

// console.log(swipe([0, 1, 2, 8, 8, 0, 2, 1, 0, 0, 0, 1, 2, 0, 256, 256]))
// console.log(swipe([2, 2, 2, 2]))

// _2045()
// c = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
// ]
// transpose(c)
// print(c)


document.onkeydown = function(event) {
    let prev = JSON.stringify(board)
    switch (event.keyCode) {
        case 37:
            // console.log("<");
            tiltLeft(board)
            break;
        case 38:
            // console.log("^");
            tiltUp(board)
            break;
        case 39:
            // console.log(">");
            tiltRight(board)
            break;
        case 40:
            // console.log("v");
            tiltDown(board)
            break;
    }

    let emptypos = getIndexOfAllEmptyPos(board)
    if (emptypos.length === 0) {
        console.log("game over");
        alert("Game Over")
        _2048()
    } else if (JSON.stringify(board) !== prev) {
        let pos = getRandomPos(emptypos)
        board[pos[0]][pos[1]] = getRandomOf2OR4()
        renderDisplay({ 'i': pos[0], 'j': pos[1] })
    }

    // console.table(board)
    // print(board)
};

function renderDisplay(just) {
    let boardx = document.querySelector('#boardx')
    let htmlTemplate = ''
    for (let i = 0; i < n; i++) {
        htmlTemplate += ` <tr class="rowx">`
        for (let j = 0; j < n; j++) {
            htmlTemplate += `<td class="blockx c${board[i][j]} ${just.i==i && just.j==j?'cur':''}">${  board[i][j]===0? ' ' : board[i][j] }</td>`
        }
        htmlTemplate += `</tr>`
    }
    boardx.innerHTML = htmlTemplate

}

_2048()