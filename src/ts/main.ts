import Socket = SocketIOClient.Socket;
import {Game} from "./receivers/game";
import {Canvas} from "./view/canvas";
import {Identifier} from "./receivers/identifier";
import {Online} from "./receivers/online";
import {MyPlayer} from "./myPlayer";


export class Main {

    private socket: Socket;
    private identifier: Identifier;
    private game: Game;
    private canvas: Canvas;
    private MP: MyPlayer;
    private mousePosition: Array<number>;


    constructor() {
        this.mousePosition = [0, 0];
        this.socket = io('http://localhost:3000/');
        this.canvas = new Canvas();

        this.identifier = new Identifier(this.socket, this.canvas);

        this.identifier.listen();

        this.MP = new MyPlayer(this.mousePosition);

        this.game = new Game(this.socket, this.canvas, this.MP);

        this.game.listen(this.identifier);




        new Online(this.socket).listen();


        $('#canvas-board').mousemove(e => {
            this.mousePosition[0] = e.offsetX;
            this.mousePosition[1] = e.offsetY;
        });
    }


}