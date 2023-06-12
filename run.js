WebGL2RenderingContext
var runStatus = false;
var linesTrue = false;
var pa = (4);
var fullDir = 2 * Math.PI;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var keyStates = ['false', 'false', 'false', 'false'];
var px=100, py=200;

var threeDimcanv = document.getElementById("canvas2");
var ctxTwo = threeDimcanv.getContext("2d");



function drawPlayer(x,y) {
    let pi = Math.PI;
    switch (String(keyStates[0] + keyStates[1] + keyStates[2] + keyStates[3] + x + y + pa)) {
        case String("truefalsefalsefalse" + x + y + pa) : px+=Math.cos(pa)*2, py-=Math.sin(pa)*2; break;
        case String("falsetruefalsefalse" + x + y + pa) : px-=Math.cos(pa)*2, py+=Math.sin(pa)*2; break;
        case String("falsefalsetruefalse" + x + y + pa) : pa+=.05; if(pa>2*pi){pa -= 2*pi}; break;
        case String("falsefalsefalsetrue" + x + y + pa) : pa-=.05; if(pa<0)   {pa += 2*pi}; break;
        case String("truefalsetruefalse" + x + y + pa) : pa+=.05; if(pa>2*pi){pa -= 2*pi}; px+=Math.cos(pa)*2, py-=Math.sin(pa)*2; break;
        case String("truefalsefalsetrue" + x + y + pa) : pa-=.05; if(pa<0)   {pa += 2*pi}; px+=Math.cos(pa)*2, py-=Math.sin(pa)*2; break;

    }
    
    drawMap();
    ctxTwo.fillStyle = "#000";
    ctxTwo.fillRect(0, 0, canvas.width, canvas.height);
    //console.log(px+'\n'+py+'\n'+pa);

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
        setInterval(advanceTick ,33);
    }
    runStatus = true;
}


function advanceTick() {
    //console.log(String(keyStates[0] + keyStates[1] + keyStates[2] + keyStates[3]))
    drawPlayer(px, py);
}
// console.log(String(godSpeed + '\n' + 'sec: ' + (Math.floor(godSpeed/30)) + ' | ' + Math.floor(godSpeed / (godSpeed/30)) + '\n' + ctx));