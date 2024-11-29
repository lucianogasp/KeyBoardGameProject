
export class KeyBoard {

    constructor (canvas, ctx, horizontalGap, verticalGap) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.horizontalGap = horizontalGap;
        this.verticalGap = verticalGap;
        this.startX = undefined;
        this.startY = undefined;
    }

    startPositionX(array) {
        const total = array.reduce((sum, k) => sum + k.width, 0) + (array.length - 1) * this.horizontalGap;
        this.startX = (this.canvas.width - total) / 2;
    }

    startPositionY(array) {
        const total = array.reduce((sum, k) => sum + k.height, 0) + (array.length - 1) * this.verticalGap;
        this.startY = (this.canvas.height - total) / 2;
    }

    matrixForEach (matrix) {
        matrix.forEach( (keysLine) => {
            this.startPositionX(keysLine);
            keysLine.forEach( object => {
                this.setKeyboard(object);
            })
            this.startY += keysLine[0].height + this.verticalGap;
        });
    }

    setKeyboard (object) {
        // Definindo a centralização do texto do elemento
        let centerX = this.startX + object.width / 2;
        let centerY = this.startY + object.height / 2;
        // Desenhar o retâncgulo das letras
        this.ctx.strokeRect(this.startX, this.startY, object.width, object.height);
        // Adicionar o texto centralizado
        this.ctx.fillStyle = "black";
        this.ctx.font = '30px Arial'
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(object.name.toUpperCase(), centerX, centerY);
        // Armazenar posições X e Y do elemento
        object['x_position'] = centerX;
        object['y_position'] = centerY;
        // Atualizar posição X para o próximo elemento
        this.startX += object.width + this.horizontalGap;
    }
}
