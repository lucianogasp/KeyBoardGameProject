
import { CatsCrandle } from './Modules/catsCrandle.js';
import { KeyBoard } from './Modules/keyBoard.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Declarando e definindo parâmetros
const _wdt = 75;
const _hgt = 75;
const horizontalGap = 5;
const verticalGap = 5;

const keysLine0 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const keysLine1 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const keysLine2 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const keysLine3 = [' '];

const keysMatrixValues = [];
keysMatrixValues.push(keysLine0, keysLine1, keysLine2, keysLine3);

const keysMatrix = [];
keysMatrixValues.forEach( line => {
    var rowArray = [];
    line.forEach( el => {
        var object = {name: el, width: _wdt, height: _hgt};
        rowArray.push(object);
    })
    keysMatrix.push(rowArray);
});

const keysArray = keysMatrix.flat(Infinity);
const keysColumn = keysMatrix.map(array => array[0]);

const keyboard = new KeyBoard(canvas, ctx, horizontalGap, verticalGap);
keyboard.startPositionY(keysColumn);
keyboard.matrixForEach(keysMatrix);

canvas.setAttribute('tabindex', '0');

const cat = new CatsCrandle(ctx);
canvas.addEventListener("keydown", event => {

    const key = cat.findKey(keysArray, event);
    const verifyKey = cat.verifyKey(key, event);
    if (!verifyKey) {
        return;
    }
    const verifyBackspace = cat.verifyBackspace(key);
    if (verifyBackspace) {
        return;
    }
    cat.setCurrentPosition(key);
    cat.strokeLines();

});
