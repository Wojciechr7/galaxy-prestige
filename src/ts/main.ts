import Socket = SocketIOClient.Socket;
import {Fleet} from "./dispatchers/fleet";
import {Canvas} from "./view/canvas";
import {Identifier} from "./dispatchers/identifier";
import {Online} from "./dispatchers/online";
import {MySpacecraft} from "./mySpacecraft";
import {Control} from "./control";
import {Shot} from "./dispatchers/shot";


export class Main {

    private socket: Socket;
    private identifier: Identifier;
    private fleet: Fleet;
    private canvas: Canvas;
    private MP: MySpacecraft;
    private mousePosition: Array<number>;
    private shot: Shot;


    constructor() {
        this.mousePosition = [200, 200];
        this.socket = io('http://localhost:3000/');
        this.canvas = new Canvas();

        this.identifier = new Identifier(this.socket, this.canvas);

        this.identifier.listen();

        this.MP = new MySpacecraft(this.mousePosition, this.socket);

        this.fleet = new Fleet(this.socket, this.canvas, this.MP);

        this.fleet.listen(this.identifier);

        this.shot = new Shot(this.socket);
        this.shot.listen(this.canvas);




        new Online(this.socket).listen();


        new Control().handleEvents(this.mousePosition, this.MP, this.identifier);
    }















}
