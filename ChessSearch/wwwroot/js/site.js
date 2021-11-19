// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//function getGame(play = "", ratings = '1600,1800,2000,2200,2500', speeds = 'blitz,rapid,classical') {
//    fetch(`https://explorer.lichess.ovh/lichess?variant=standard&speeds=${speeds}&play=${play}&ratings=${ratings}`)
//        .then(response => response.json())
//        .then((data) => {
//            console.log(data);
//            return data;
//        });
//};

//getGame();

class ChessData {
    constructor(links, moves, moveData) {
        this.links = links;
        this.moves = moves;
        this.moveData = moveData;
    }
}

var board1 = Chessboard('board1', 'start');
const chess = new Chess();
let data;

let labels;
let config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
};

// Makes an API call with the chosen inputs
function getGame(play = "", ratings = '1600,1800,2000,2200,2500', speeds = 'blitz,rapid,classical') {
    fetch(`https://explorer.lichess.ovh/lichess?variant=standard&speeds=${speeds}&play=${play}&ratings=${ratings}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            
            // Parse the data into a ChessData object to make it easier to manage
            let chessData = new ChessData([...data.recentGames], data.moves.map(x => x.san), data.moves.map(x => x.white + x.draws + x.black))
            console.log(chessData);

            // Case handling for the starting position
            if (play !== '') {
                document.getElementById('results').value = JSON.stringify(data);
            }
            if (play == '') {
                document.getElementById('opening').innerText = 'Starting Position'
            } else {
                document.getElementById('opening').innerText = data.opening.name;
            }

            displayPosition(play);
            displayLinks(chessData.links);
            updateGraph(chessData);

            return data;

        })
        .catch((error) => {
            document.getElementById('results').value = 'Error ' + error.toString() + '\n\n Check if your input was correct.';
            chess.reset();
            board1.position(chess.fen());
            document.getElementById('opening').innerText = '(None)';
        });
};

// Displays an opening on the chessboard, given the user input of moves
function displayPosition(moves) {
    chess.reset()
    for (let move of moves.split(",")) {
        chess.move(move, { sloppy: true });
        console.log(move);

    }
    board1.position(chess.fen());
}

// Displays recent games taken from the API call
function displayLinks(links) {
    let games = [...links];
    document.getElementById('games').innerHTML = '';
    for (let game of games) {
        document.getElementById('games').innerHTML += `<p><a href='${makeLichessLink(game.id)}'>${makeLichessLink(game.id)}</a></p>`;
    };
}

function makeLichessLink(id) {
    return 'https://lichess.org/' + id;
}

// Updates labels and data for chart.js 
function updateGraph(chessData) {
    myChart.data.labels = chessData.moves;
    myChart.data.datasets[0].data = chessData.moveData;
    myChart.update();
}

// Stuff needed for chart.js to work
const ctx = document.getElementById('myChart');
let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
            ]
        }],
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Most Common Moves in This Position'
            },
            legend: {
                display: false
            },
        },
        
        scales: {
            y: {
                beginAtZero: true,
                text: 'Number of Games',
            },
            x: {
                text: 'Moves',
            }
        }
    },
});


getGame();

// Setting initial value for input fields
document.getElementById("moves").value = 'e2e4,e7e5,g1f3,b8c6,f1b5';
document.getElementById("ratings").value = '1600,1800,2000';