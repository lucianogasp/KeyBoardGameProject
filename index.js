
let abc = 'qwertyuiopasdfghjklzxcvbnm';
for (let i = 0; i < abc.length; i++) {

    if (i < abc.indexOf('a')) {
        document.getElementById('firstLine').innerHTML += '<div class="keys" id="' + abc[i] + '"><h2>' + abc[i] + '</h2></div>';
    } else if (i < abc.indexOf('z')) {
        document.getElementById('secondLine').innerHTML += '<div class="keys" id="' + abc[i] + '"><h2>' + abc[i] + '</h2></div>';
    } else {
        document.getElementById('thirdLine').innerHTML += '<div class="keys" id="' + abc[i] + '"><h2>' + abc[i] + '</h2></div>';
        
    };
};


// '<div class="keys"><h2>' + abc[i] + '</h2></div>'
