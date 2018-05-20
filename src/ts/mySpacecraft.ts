import Socket = SocketIOClient.Socket;
import {Identifier} from "./dispatchers/identifier";


export class MySpacecraft {

    public myPlayerSet: boolean;
    public myPlayer: any;
    public mouse: Array<number>;
    private acceleration: number;
    private socket: Socket;



    constructor(m: Array<number>, socket: Socket) {
        this.mouse = m;
        this.acceleration = 4;
        this.socket = socket;

    }


    set Accelerate(val: number) {
        this.acceleration = val;
    }

    set StopAccelerate(val: number) {
        this.acceleration = val;
    }


    public setMyPosition() {
        const acc = this.countAcceleration();

        if (this.myPlayer[1] + acc[0] < 700 && this.myPlayer[1] + acc[0] > 0) {
            if (Math.abs(this.mouse[0] - this.myPlayer[1]) > 15) {
                this.myPlayer[1] = this.myPlayer[1] + acc[0];
            }

            if (this.myPlayer[2] + acc[1] < 700 && this.myPlayer[2] + acc[1] > 0) {
                if (Math.abs(this.mouse[1] - this.myPlayer[2]) > 15) {
                    this.myPlayer[2] = this.myPlayer[2] + acc[1];
                }
            }
        }
        this.myPlayer[3] = this.setAngle();
    }

    private countAcceleration() {
        const total = Math.abs(this.mouse[0] - this.myPlayer[1]) + Math.abs(this.mouse[1] - this.myPlayer[2]);

        return [
            (this.mouse[0] - this.myPlayer[1]) / total * this.acceleration,
            (this.mouse[1] - this.myPlayer[2]) / total * this.acceleration
        ];

    }

    private setAngle() {
        let sight = -1;
        if (this.mouse[0] > this.myPlayer[1]) {
            sight = 1;
        }
        return Math.atan((this.myPlayer[2] - this.mouse[1]) / (this.myPlayer[1] - this.mouse[0])) * 180 / Math.PI + 90 * sight;
    }


    public shoot(identifier: Identifier) {
            const start = [this.myPlayer[1], this.myPlayer[2]];

            const total = Math.abs(this.mouse[0] - start[0]) + Math.abs(this.mouse[1] - start[1]);

            const acceleration = [(this.mouse[0] - start[0]) / total * 25, (this.mouse[1] - start[1]) / total * 25];

            this.socket
                .emit('shoot from', [identifier.MyId, start, acceleration]);
    }



}