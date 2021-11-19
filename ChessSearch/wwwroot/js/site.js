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

var board1 = Chessboard('board1', 'start')
//let results;
const chess = new Chess()
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

function getGame(play = "", ratings = '1600,1800,2000,2200,2500', speeds = 'blitz,rapid,classical') {
    fetch(`https://explorer.lichess.ovh/lichess?variant=standard&speeds=${speeds}&play=${play}&ratings=${ratings}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            //return data;

            let chessData = new ChessData([...data.recentGames], data.moves.map(x => x.san), data.moves.map(x => x.white + x.draws + x.black))


            if (play !== '') {
                document.getElementById('results').value = JSON.stringify(data);
            }
            if (play == '') {
                document.getElementById('opening').innerText = 'Starting Position'
            } else {
                document.getElementById('opening').innerText = results.opening.name;
            }
            displayPosition();
            displayLinks(chessData.links);

            updateGraph(chessData);

        })
        .catch((error) => {
            document.getElementById('results').value = 'Error ' + error.toString() + '\n\n Check if your input was correct.';
            chess.reset();
            board1.position(chess.fen());
            document.getElementById('opening').innerText = '(None)';

        });
};

function displayPosition() {
    chess.reset()
    for (let move of document.getElementById("moves").value.split(",")) {
        chess.move(move, { sloppy: true });
        console.log(move);

    }
    board1.position(chess.fen());
}

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

function updateGraph(chessData) {
    myChart.data.labels = chessData.moves;
    myChart.data.datasets[0].data = chessData.moveData;
    myChart.update();
}

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