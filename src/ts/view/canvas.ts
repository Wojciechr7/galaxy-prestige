import '../../img/ship.png';

export class Canvas {

    private ctx: CanvasRenderingContext2D;

    constructor() {
        const canvas = <HTMLCanvasElement>document.getElementById("canvas-board");
        this.ctx = canvas.getContext("2d");
    }




    public drawPlayers(players: any, emit: any) {
        const spaceShip = new Image();
        spaceShip.src = 'img/ship.png';

        const paintLoop = () => {
            this.ctx.clearRect(0, 0, 700, 700);
            for (const item of players) {

                this.ctx.save();
                this.ctx.translate(item[1], item[2]);

                this.ctx.rotate(item[3] * Math.PI / 180);
                this.ctx.drawImage(spaceShip, -20, -13);
                this.ctx.restore();

            }
            emit();
            //console.log('siema');


            //console.log(this.players);
            requestAnimationFrame(paintLoop);
            //setTimeout(paintLoop, 1000);
        };

        paintLoop();
    }
}