WebGL2RenderingContext
var runStatus = false;
var linesTrue = false;
var pa = (4);
var fullDir = 2 * Math.PI;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, canvas.width, canvas.height);
// ctx.clearColor(0.0, 0.0, 0.0, 1.0);
// ctx.clear(ctx.COLOR_BUFFER_BIT);
var keyStates = ['false', 'false', 'false', 'false'];
var px=200, py=200;



function drawPlayer(x,y) {
    let pi = Math.PI;
    switch (String(keyStates[0] + keyStates[1] + keyStates[2] + keyStates[3] + x + y + pa)) {
        case String("truefalsefalsefalse" + x + y + pa) : px+=Math.cos(pa), py-=Math.sin(pa); break;
        case String("falsetruefalsefalse" + x + y + pa) : px-=Math.cos(pa), py+=Math.sin(pa); break;
        case String("falsefalsetruefalse" + x + y + pa) : pa+=.05; break;
        case String("falsefalsefalsetrue" + x + y + pa) : pa-=.05; break;
        case String("truefalsetruefalse" + x + y + pa) : pa+=.05; px+=Math.cos(pa), py-=Math.sin(pa); break;
        case String("truefalsefalsetrue" + x + y + pa) : pa-=.05; px+=Math.cos(pa), py-=Math.sin(pa); break;

    }
    
    drawMap();
    //console.log(px+'\n'+py+'\n'+pa);

}
let godSpeed = 0;
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
    godSpeed = godSpeed += 1;
    //console.log(String(keyStates[0] + keyStates[1] + keyStates[2] + keyStates[3]))
    drawPlayer(px, py);
}
// console.log(String(godSpeed + '\n' + 'sec: ' + (Math.floor(godSpeed/30)) + ' | ' + Math.floor(godSpeed / (godSpeed/30)) + '\n' + ctx));