WebGL2RenderingContext
var runStatus = false;
var linesTrue = false;
var pa = (3.2);
var fullDir = 2 * Math.PI;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var keyStates = ['false', 'false', 'false', 'false'];
var px=490, py=334;

var threeDimcanv = document.getElementById("canvas2");
var ctxTwo = threeDimcanv.getContext("2d");



function drawPlayer(x,y) {
    let deltaX = Math.cos(pa)*2; let deltaY = Math.sin(pa)*2;
    let fspx = Math.floor((px+(deltaX*10))/64); let fspy = Math.floor((py-(deltaY*10))/64);
    let spxNeg = Math.floor((px-(deltaX*4))/64); let spyNeg = Math.floor((py+(deltaY*4))/64);
    let intX = Math.floor(px/64); let intY = Math.floor(py/64);
    switch (String(keyStates[0] + keyStates[1] + keyStates[2] + keyStates[3] + x + y + pa)) {
        case String("truefalsefalsefalse" + x + y + pa) : if (premapBits[(mapX*intY) + fspx] == 0){px+=deltaX}; if (premapBits[((fspy)*mapX) + intX] == 0){py-=deltaY}; break;
        case String("falsetruefalsefalse" + x + y + pa) : if (premapBits[(mapX*intY) + spxNeg] == 0){px-=deltaX}; if (premapBits[((spyNeg)*mapX) + intX] == 0){py+=deltaY}; break;
        case String("falsefalsetruefalse" + x + y + pa) : pa+=.075; if(pa>2*pi){pa -= 2*pi}; break;
        case String("falsefalsefalsetrue" + x + y + pa) : pa-=.075; if(pa<0)   {pa += 2*pi}; break;
        case String("truefalsetruefalse" + x + y + pa) : pa+=.075; if(pa>2*pi){pa -= 2*pi}; if (premapBits[(mapX*intY) + fspx] == 0){px+=deltaX}; if (premapBits[((fspy)*mapX) + intX] == 0){py-=deltaY}; break;
        case String("truefalsefalsetrue" + x + y + pa) : pa-=.075; if(pa<0)   {pa += 2*pi}; if (premapBits[(mapX*intY) + fspx] == 0){px+=deltaX}; if (premapBits[((fspy)*mapX) + intX] == 0){py-=deltaY}; break;
    }
    
    drawMap();
    ctxTwo.fillStyle = "#000";
    ctxTwo.fillRect(0, 0, canvas.width, canvas.height);
    
    document.getElementById('playerStats').innerHTML = String(Math.round(px)+"<br>"+Math.round(640-py)+"<br>"+pa.toFixed(2)+"<br>"+String((mapX*intY) + fspx)+"<br>"+String((fspy*mapX) + intX));

}
function loadTick() {
    console.log('hit');
    document.addEventListener('keydown', function(event) {
        if (event.code == 'KeyW') {console.log(); keyStates[0] = 'true'}
        else if (event.code == 'KeyS') {console.log(); keyStates[1] = 'true'}
        else if (event.code == 'KeyA') {console.log(); keyStates[2] = 'true'}
        else if (event.code == 'KeyD') {console.log(); keyStates[3] = 'true'}});

    document.addEventListener('keyup', function(event) {
        if (event.code == 'KeyW') {console.log(); keyStates[0] = 'false'}
        else if (event.code == 'KeyS') {console.log(); keyStates[1] = 'false'}
        else if (event.code == 'KeyA') {console.log(); keyStates[2] = 'false'}
        else if (event.code == 'KeyD') {console.log(); keyStates[3] = 'false'}});
    
    if (runStatus == false) {
        setInterval(advanceTick , 33);
    }
    runStatus = true;
}

var frame = 0;
function advanceTick() {
    frame++
    if (frame==30 || frame > 30){frame=0};
    drawPlayer(px, py);
    lines();
}