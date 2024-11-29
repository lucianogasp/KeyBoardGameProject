
export class CatsCrandle {

    constructor (ctx) {
        this.ctx = ctx
        this.backspaceFlag = true;
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
            // alert(`the key '${event.key}' is not availeble`);
            return false;
        }
    }

    verifyBackspace(key) {
        if (key.name === ' ') {
            this._updatePreviousPosition(undefined, undefined);
            this._updateCurrentPosition(undefined, undefined);
            this._switchBackspaceFlag(true);
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
    }

    strokeLines() {
        this.ctx.beginPath();
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
