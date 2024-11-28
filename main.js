
import { CatsCrandle } from './Modules/catsCrandle.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Declarando e definindo parâmetros
const _wdt = 75;
const _hgt = 75;
const _horizontalGap = 5;
const _verticalGap = 5;

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

// Espaçamento e centralização do Keyboard
const keysColumn = keysMatrix.map(array => array[0]);
const totalHeight = keysColumn.reduce((sum, k) => sum + k.height, 0) + (keysMatrix.length - 1) * _verticalGap;
var startY = (canvas.height - totalHeight) / 2;

keysMatrix.forEach( keysLine => {
    const totalWidth = keysLine.reduce((sum, k) => sum + k.width, 0) + (keysLine.length - 1) * _horizontalGap;
    var startX = (canvas.width - totalWidth) / 2;
    keysLine.forEach( k => {
        // Definindo a centralização do texto do elemento
        let centerX = startX + k.width / 2;
        let centerY = startY + k.height / 2;

        // Desenhar o retângulo das letras
        ctx.strokeRect(startX, startY, k.width, k.height);
    
        // Adicionar o texto centralizado
        ctx.fillStyle = "black";
        ctx.font = '30px Arial'
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(k.name.toUpperCase(), centerX, centerY);
        
        // Armazenar posições X e Y do elemento
        k['x_position'] = centerX;
        k['y_position'] = centerY;

        // Atualizar posição X para o próximo elemento
        startX += k.width + _horizontalGap;
    });
    // Atualizar a posição Y para a próximo linha de elementos
    startY += keysLine[0].height + _verticalGap;
});

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
