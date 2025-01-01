var game_table = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]

var colors = {
    0: 'gray',
    1: 'red',
    2: 'blue',
}

var player = true

var player_won = 0

var players_moves = {
    1: [],
    2: []
}

function starter(){
    const board_pieces = document.getElementById('playingField').getElementsByTagName('div')
    for(let row = 0; row < game_table.length; row++){
        for(let col = 0; col < game_table[row].length; col++){
            board_pieces[game_table[row].length*row+col].addEventListener('click', function(){write_board(row, col)})
        }
    }
    redraw_board()
}

function redraw_board(){
    const board_pieces = document.getElementById('playingField').getElementsByTagName('div')
    for(let row = 0; row < game_table.length; row++){
        for(let col = 0; col < game_table[row].length; col++){
            board_pieces[game_table[row].length*row+col].style.background = colors[String(game_table[row][col])]
        }
    }
}

function write_board(row, col){
    if(game_table[row][col] === 0 && player_won === 0){
        game_table[row][col] = player?1:2
        players_moves[player?'1':'2'].push({
            row: row,
            col: col
        })
        player = !player
        redraw_board()
        extension()
        won()
    }
}

function won(){
    for(let row = 0; row < game_table.length; row++){
        for(let col = 0; col < game_table[row].length; col++){
            try{
                if(game_table[row][col+1] === game_table[row][col] && game_table[row][col] !== 0){
                    if(game_table[row][col+2] === game_table[row][col] && game_table[row][col] !== 0){
                        player_won = game_table[row][col]
                    }
                }            
                if(game_table[row+1][col] === game_table[row][col] && game_table[row][col] !== 0){
                    if(game_table[row+2][col] === game_table[row][col] && game_table[row][col] !== 0){
                        player_won = game_table[row][col]
                    }
                }
                if(game_table[row+1][col+1] === game_table[row][col] && game_table[row][col] !== 0){
                    if(game_table[row+2][col+2] === game_table[row][col] && game_table[row][col] !== 0){
                        player_won = game_table[row][col]
                    }
                }
                if(game_table[row+1][col-1] === game_table[row][col] && game_table[row][col] !== 0){
                    if(game_table[row+2][col-2] === game_table[row][col] && game_table[row][col] !== 0){
                        player_won = game_table[row][col]
                    }
                }
            }catch{}
            document.getElementById('winner').innerText = player_won
            if(player_won !== 0){
                document.getElementById('again').style.display = 'block'
            }
        }
    }
}

function extension(){
    let moves = [
        0,
        0
    ]
    for(let row = 0; row < game_table.length; row++){
        for(let col = 0; col < game_table[row].length; col++){
            if(game_table[row][col] === 1){
                moves[0]++
            }
            else if(game_table[row][col] === 2){
                moves[1]++
            }
        }
    }
    if(moves[0] > 3){
        game_table[players_moves['1'][0]['row']][players_moves['1'][0]['col']] = 0
        players_moves['1'].splice(0, 1)
    }
    if(moves[1] > 3){
        game_table[players_moves['2'][0]['row']][players_moves['2'][0]['col']] = 0
        players_moves['2'].splice(0, 1)
    }
    redraw_board()
}

function reset_board(){
    game_table = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
    player_won = 0
    player = true
    players_moves = {
        1: [],
        2: []
    }
    document.getElementById('again').style.display = 'none'
    redraw_board()
}