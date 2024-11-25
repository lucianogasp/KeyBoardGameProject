
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Declarando e definindo parâmetros
const _wdt = 75;
const _hgt = 75;
const _horizontalGap = 5;
const _verticalGap = 5;
const abc = 'qwertyuiopasdfghjklzxcvbnm';

const keysLine0 = [];
const keysLine1 = [];
const keysLine2 = [];
const keysMatrix = [];

// Atribuindo os elementos à cada uma das linhas do Keyboard
function wrapLines(wrap0, wrap1, wrap2) {
    for (let i = 0; i < abc.length; i++) {
        let letter = {name: abc[i], width: _wdt, height: _hgt, x_position: undefined, y_position: undefined};
        if (wrap0.includes(abc[i])) {
            keysLine0.push(letter);
        } else if (wrap1.includes(abc[i])) {
            keysLine1.push(letter);
        } else if (wrap2.includes(abc[i])) {
            keysLine2.push(letter);
        };
    };
    keysMatrix.push(keysLine0, keysLine1, keysLine2);
};

// Chamando wrapLines e definindo as linhas de keys no Keyboard
wrapLines('qwertyuiop', 'asdfghjkl', 'zxcvbnm');

// Espaçamento e centralização do Keyboard
const keysColumn = keysMatrix.map(array => array[0])
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
        k['x_position'] = centerX
        k['y_position'] = centerY

        // Atualizar posição X para o próximo elemento
        startX += k.width + _horizontalGap;
    });
    // Atualizar a posição Y para a próximo linha de elementos
    startY += keysLine[0].height + _verticalGap;
    
});
