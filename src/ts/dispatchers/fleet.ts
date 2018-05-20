import {Canvas} from "../view/canvas";
import Socket = SocketIOClient.Socket;
import {Identifier} from "./identifier";
import {MySpacecraft} from "../mySpacecraft";


export class Fleet {

    private canvas: Canvas;
    private socket: Socket;
    private MP: MySpacecraft;


    private fleet: any;

    constructor(socket: Socket, canvas: Canvas, mp: MySpacecraft) {
        this.canvas = canvas;
        this.socket = socket;
        this.MP = mp;
        this.fleet = [];
    }

    get Players() {
        return this.fleet;
    }

    public listen(identifier: Identifier): void {
        this.socket.on('players', (data: any) => {

            for (let i in data.players) {
                this.fleet[i] = data.players[i];
            }
            this.fleet.push([99999, 400, 400, 30, 'fdhdfh']);
            this.fleet.length = data.players.length + 1;

            this.setFirstPlayer(data.players, identifier);

        });
    }


    private setFirstPlayer(players: any, identifier: Identifier) {
            for (const p of players) {
                if (p[0] === identifier.MyId) {
                    this.MP.myPlayer = p;
                    this.MP.myPlayerSet = true;
                    this.canvas.drawPlayers(this.fleet, this.emitMyPlayer);
            }
        }
    }

    private emitMyPlayer = () => {
        if (this.MP.myPlayerSet) {
            this.MP.setMyPosition();
                this.socket
                    .emit('player', this.MP.myPlayer);
        }
    }
}
