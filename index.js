
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

class CatsCrandle {

    constructor () {
        this.backspaceSkip = true;
        this._position = {
            currentX: undefined,
            currentY: undefined,
            previousX: undefined,
            previousY: undefined
        }
    }

    get objectPosition() {
        return this._position;
    }

    set objectPosition(newObject) {
        this._position = newObject;
    }

    get(prop) {
        if (prop in this._position) {
            return this._position[prop];
        } else {
            console.error(`A propriedade '${prop}' não existe`);
            return undefined;
        }
    }

    set(prop, newValue) {
        if (prop in this._position) {
            this._position[prop] = newValue;
        } else {
            console.error(`A propriedade '${prop}' não existe`);
        }
    }

    findKey(keysArray, event) {
        const key = keysArray.find( k => k.name === event.key );
        return key;
    }

    verifyKey(key, event) {
        if (key) {
            return true;
        } else {
            alert(`the key '${event.key}' is not availeble`);
            return false;
        }
    }

    verifyKeyValue (key) {
        if (key.name === ' ') {
            // backspace case
            this._updateCurrentPosition(undefined, undefined);
            this._updatePreviousPosition(undefined, undefined);
            this.backspaceSkip = true;
        } else if (this.backspaceSkip) {
            this._updateCurrentPosition(key.x_position, key.y_position);
            this._updatePreviousPosition(this.currentX, this.currentY);
            this.backspaceSkip = false;
            this._strokeLines();
        } else {
            this._updateCurrentPosition(key.x_position, key.y_position);
            this._strokeLines();
        }
    }

    _strokeLines() {
        ctx.beginPath();
        ctx.moveTo(this.previousX, this.previousY);
        ctx.lineTo(this.currentX, this.currentY);
        ctx.closePath();
        ctx.stroke();
        this._updatePreviousPosition(this.currentX, this.currentY);
    }

    _updateCurrentPosition(previousX, previousY) {
        this.currentX = previousX;
        this.currentY = previousY;
    }

    _updatePreviousPosition(currentX, currentY) {
        this.previousX = currentX;
        this.previousY = currentY;
    }
}

const cat = new CatsCrandle();
canvas.addEventListener("keydown", event => {

    const key = cat.findKey(keysArray, event);
    const verify = cat.verifyKey(key, event);
    if (verify) {
        cat.verifyKeyValue(key);
    } else {
        return;
    }

});
