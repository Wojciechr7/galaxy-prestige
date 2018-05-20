import {MySpacecraft} from "./mySpacecraft";
import {Identifier} from "./dispatchers/identifier";


export class Control {

    public handleEvents(m: Array<number>, mp: MySpacecraft, identifier: Identifier) {

        $('#canvas-board').mousemove(e => {

            m[0] = e.offsetX;
            m[1] = e.offsetY;
        });
        $('#canvas-board').click(() => {
            mp.shoot(identifier);
        });

        $(document).keydown( e => {
            if (e.keyCode === 32) {
                mp.Accelerate = 14;
            }
        });
        $(document).keyup( e => {
            if (e.keyCode === 32) {
                mp.StopAccelerate = 4;
            }
        });

    }
}