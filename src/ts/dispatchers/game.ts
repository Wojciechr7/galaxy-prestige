import {Canvas} from "../view/canvas";
import Socket = SocketIOClient.Socket;
import {Identifier} from "./identifier";
import {MyPlayer} from "../myPlayer";


export class Game {

    private canvas: Canvas;
    private socket: Socket;
    private MP: MyPlayer;


    private players: any;

    constructor(socket: Socket, canvas: Canvas, mp: MyPlayer) {
        this.canvas = canvas;
        this.socket = socket;
        this.MP = mp;
    }

    get Players() {
        return this.players;
    }

    public listen(identifier: Identifier): void {
        this.socket.on('players', (data: any) => {



            for (let i in data.players) {
                this.players[i] = data.players[i];
            }

            //console.log('get players: ', this.players);

            this.setupMyPlayer(data.players, identifier);

        });
    }

    private setupMyPlayer(players: any, identifier: Identifier) {
        if (!this.MP.myPlayerSet) {
            for (const p of players) {
                if (p[0] === identifier.MyId) {
                    this.MP.myPlayer = p;
                    this.MP.myPlayerSet = true;
                    this.canvas.drawPlayers(this.players, this.emitMyPlayer);
                }
            }
        }
    }


    private emitMyPlayer = () => {
        if (this.MP.myPlayerSet) {
            //console.log('emiting my player', this.MP.myPlayer);
            // TODO 2 methods
            this.MP.setMyPosition();
            this.socket
                .emit('player', this.MP.myPlayer);
        }
    }
}
