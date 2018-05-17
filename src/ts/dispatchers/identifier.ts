import {Canvas} from "../view/canvas";
import Socket = SocketIOClient.Socket;


export class Identifier {

    private canvas: Canvas;
    private socket: Socket;
    private isIdSet: boolean;
    private myId: number;



    get MyId() {
        if (this.isIdSet) {
            return this.myId;
        }
    }


    constructor(socket: Socket, canvas: Canvas) {
        this.canvas = canvas;
        this.socket = socket;
        this.isIdSet = false;
    }

    public listen(): any {
        this.socket.on('new player', (data: any) => {
            if (!this.isIdSet) {
                this.isIdSet = true;
                this.myId = data.id;
            }
        });
    }
}