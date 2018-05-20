var http = require('http');
var path = require('path');
var express = require('express');
var port = 3000;
var app = express();



app.use(express.static(path.join(__dirname, "/dist")));

app.get('/', function(req, res, next) {
    res.sendFile(__dirname+"/dist/index.html");
});

console.log('server is running on port:', port);


var allClients = [];
var players = [];
var playerFound;
var currentId = 0;

var server = http.createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(socket){
    console.log('websocket connected');

    allClients.push(socket);
    currentId++;
    // index, x, y, axis, id
    players.push([currentId, 200, 200, 0, socket.id]);
    io.emit('new player', {id: currentId});
    io.emit('online', {online : allClients.length});
    io.emit('players', {players : players});


    socket.on('disconnect', function() {
        for (var i in players) {
            if (players[i][4] === socket.id) {
                console.log('removing', players[i][4]);
                players.splice(i, 1);
            }
        }
        var i = allClients.indexOf(socket);
        allClients.splice(i, 1);
        io.emit('online', {online : allClients.length});
        io.emit('players', {players : players});
    });

    socket.on('player', function(player){
        //console.log(players[0][4]);
        player.push(socket.id);
        playerFound = false;
        if (!players[0]) {
            players.push(player);
        } else {
            for (var p of players) {
                if (p[0] === player[0]) {
                    p[1] = player[1];
                    p[2] = player[2];
                    p[3] = player[3];
                    break;
                }
            }
        }
        //console.log(players);
        io.emit('players', {players : players});
    });
    socket.on('shoot from', function(shoot) {
       // console.log(shoot);
        // id, start[x,y], accel[x,y]

        io.emit('shoot', {shoot : shoot});

    });
});

server.listen(process.env.PORT || port);

