import '../../img/ship.png';

export class Canvas {

    private ctx: CanvasRenderingContext2D;
    private fleet: Array<any>;


    constructor() {
        const canvas = <HTMLCanvasElement>document.getElementById("canvas-board");
        this.ctx = canvas.getContext("2d");
    }




    public drawPlayers(players: Array<any>, emit: any) {
        //console.log(players);
        let cos, sin, x, y;
        let corners: Array<any>;
        const polygon = [{x: -20, y: 0}, {x: -5, y: 0}, {x: 0, y: -9}, {x: 5, y: 0}, {x: 20, y: 0}, {x: 20, y: 17}, {x: -20, y: 17}, {x: -20, y: 0}];
        this.fleet = players;
        const spaceShip = new Image();
        spaceShip.src = 'img/ship.png';
        //console.log('start painting');
        const paintLoop = () => {
            //console.log(fleet);
            this.ctx.clearRect(0, 0, 700, 700);
            for (const item of this.fleet) {
                corners = [];
                cos = Math.cos(item[3] * Math.PI / 180);
                sin = Math.sin(item[3] * Math.PI / 180);

                this.ctx.save();
                this.ctx.translate(item[1], item[2]);

                this.ctx.rotate(item[3] * Math.PI / 180);
                /*this.ctx.beginPath();
                this.ctx.rect(-20,-7,40,20);



                this.ctx.stroke();*/
                this.ctx.drawImage(spaceShip, -20, -7);

                this.ctx.restore();


                this.ctx.beginPath();
                for (let i in polygon) {
                    x = polygon[i].x * cos - polygon[i].y * sin + item[1];
                    y = polygon[i].x * sin + polygon[i].y * cos + item[2];
                    corners[i] = [x, y];
                    this.ctx.lineTo(corners[i][0], corners[i][1]);
                }
                this.ctx.stroke();
                    
                item[5] = new SAT.Polygon(new SAT.Vector(), [
                    new SAT.Vector(corners[0][0], corners[0][1]),
                    new SAT.Vector(corners[1][0], corners[1][1]),
                    new SAT.Vector(corners[2][0], corners[2][1]),
                    new SAT.Vector(corners[3][0], corners[3][1]),
                    new SAT.Vector(corners[4][0], corners[4][1]),
                    new SAT.Vector(corners[5][0], corners[5][1]),
                    new SAT.Vector(corners[6][0], corners[6][1])
                ]);
                
                //console.log(item);

            }
            emit();


            //console.log(fleet);
            requestAnimationFrame(paintLoop);
            //setTimeout(paintLoop, 1000);
        };

        paintLoop();
    }


    public drawBullet(shoot: Array<any>) {
        let V = SAT.Vector;
        let req: any;
        console.log(this.fleet);
        const paintLoop = () => {
            this.ctx.beginPath();
            this.ctx.arc(shoot[1][0] += shoot[2][0], shoot[1][1] += shoot[2][1], 2, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.stroke();


            if (shoot[1][0] < 700 && shoot[1][0] > 0) {
                if (shoot[1][1] < 700 && shoot[1][1] > 0) {
                    req = requestAnimationFrame(paintLoop);
                    //setTimeout(paintLoop, 1000);
                }

            }
            for (const ship of this.fleet) {
                if (ship[5]) {
                    if (SAT.pointInPolygon(new V(shoot[1][0], shoot[1][1]), ship[5])) {
                        cancelAnimationFrame(req);
                    }
                }
            }
        };


        paintLoop();
    }


}