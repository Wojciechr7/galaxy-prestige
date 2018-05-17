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

            this.players = data.players;
            //console.log('get players: ', this.players);

            if (!this.MP.myPlayerSet) {
                for (const p of data.players) {
                    if (p[0] === identifier.MyId) {
                        this.MP.myPlayer = p;
                        this.MP.myPlayerSet = true;

                        console.log('player 1 has been set', p);
                        this.canvas.drawPlayers(this.players, this.emitMyPlayer);
                    }
                }
            }
        });
    }

    private emitMyPlayer = () => {
        if (this.MP.myPlayerSet) {
            //console.log('emiting my player', this.MP.myPlayer);
            // TODO 2 methods
            this.MP.setMyPosition();
            //this.myPlayer[3] = this.setAngle();
            this.socket
                .emit('player', this.MP.myPlayer);
        }
    }
}
