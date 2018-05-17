

export class MyPlayer {

    public myPlayerSet: boolean;
    public myPlayer: any;
    public mouse: Array<number>;
    public acceleration: number;


    constructor(m: Array<number>) {
        this.mouse = m;
        this.acceleration = 4;
    }



    public setMyPosition() {
        const acc = this.countAcceleration();
        //console.log(this.mouse);

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
    }

    private countAcceleration() {
        const total = Math.abs(this.mouse[0] - this.myPlayer[1]) + Math.abs(this.mouse[1] - this.myPlayer[2]);

        return [
            (this.mouse[0] - this.myPlayer[1]) / total * this.acceleration,
            (this.mouse[1] - this.myPlayer[2]) / total * this.acceleration
        ];

    }
}