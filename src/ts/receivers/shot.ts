import Socket = SocketIOClient.Socket;


export class Shot {

    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public listen(): any {
        this.socket.on('shoot', (data: any) => {
            console.log(data.shoot);
        });
    }
}