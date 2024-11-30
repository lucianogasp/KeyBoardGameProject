
export class CatsCrandle {

    constructor (ctx) {
        this.ctx = ctx
        this._position = {
            currentX: undefined,
            currentY: undefined,
            previousX: undefined,
            previousY: undefined
        }
        this.backspaceFlag = true;
        this.counterChain = 0;
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

    verifyKey(key) {
        if (key) {
            return true;
        } else {
            // alert(`the key '${event.key}' is not availeble`);
            return false;
        }
    }

    verifyBackspace(key) {
        if (key.name === ' ') {
            this._updatePreviousPosition(undefined, undefined);
            this._updateCurrentPosition(undefined, undefined);
            this._switchBackspaceFlag(true);
            this.counterChain = 0;
            return true;
        }
    }

    setCurrentPosition(key) {
        if (this.backspaceFlag) {
            this._updateCurrentPosition(key.x_position, key.y_position);
            this._updatePreviousPosition(this.currentX, this.currentY);
            this._switchBackspaceFlag(false);
        } else {
            this._updateCurrentPosition(key.x_position, key.y_position);
        }
        this.counterChain++;
    }

    strokeLines(color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(this.previousX, this.previousY);
        this.ctx.lineTo(this.currentX, this.currentY);
        this.ctx.closePath();
        this.ctx.stroke();
        this._updatePreviousPosition(this.currentX, this.currentY);
    }

    _switchBackspaceFlag(condition) {
        this.backspaceFlag = condition;
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

export class StyleCrandle {

    constructor () {
        this.styleColor = 'black';
        this.counter = 0;
        this.index = 0;
    }

    styleStrokeColor (counterChain, condition, ...color) {
        const colors = color.length === 0 ? [this.styleColor] : color;
        if (typeof condition === 'number' && condition > 0) {
            if (this.counter === condition) {
                this.index = (this.index + 1) % colors.length;
                this.counter = 0;
            }
            this.counter++;
            return colors[this.index];
        } else if (typeof condition === 'string') { 
            console.log(`counterChain: ${counterChain}`);           
            if (counterChain === 1) {
                this.index = (this.index + 1) % colors.length;
            }
            console.log(`index: ${this.index}`);
            return colors[this.index];
        }
    }
}
