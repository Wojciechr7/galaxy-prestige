export class Receiver {

    private socket: any;

    constructor(s: any) {
        this.socket = s;
    }

    public listen(): void {

        this.socket.on('new player', (data: any) => {
            console.log(data.id);
        });
        this.socket.on('online', (data: any) => {
            console.log(data.online);
        });
        this.socket.on('players', (data: any) => {
            console.log(data.players);
        });
        this.socket.on('shoot', (data: any) => {
            console.log(data.shoot);
        });

    }

}