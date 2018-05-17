import {Board} from "../view/board";
import Socket = SocketIOClient.Socket;


export class Online {

    private board: Board;
    private socket: Socket;

    constructor(socket: Socket) {
        this.board = new Board();
        this.socket = socket;
    }

    public listen(): any {
        this.socket.on('online', (data: any) => {
            this.board.setOnline(data.online);
        });
    }
}