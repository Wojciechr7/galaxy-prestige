// LIBRARIES
import 'jquery';
import 'socket.io-client';

// SCSS LOADER
import './style.scss';

// TYPESCRIPT LOADER
import './ts/canvas';

// MODULES
import {Receiver} from "./ts/receiver";


class Main {
    static initialize() {

        new Receiver(io('http://localhost:3000/')).listen();










    }
} Main.initialize();





