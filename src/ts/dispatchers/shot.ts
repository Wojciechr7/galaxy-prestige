import Socket = SocketIOClient.Socket;
import {Canvas} from "../view/canvas";


export class Shot {

    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public listen(canvas: Canvas): any {
        this.socket.on('shoot', (data: any) => {
            canvas.drawBullet(data.shoot);
        });
    }





}