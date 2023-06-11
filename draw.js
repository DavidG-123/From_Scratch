WebGL2RenderingContext

const mapX = 10, mapY = 10, mapA = 100;
const pi = Math.PI;
const rad = (Math.PI*2);

function drawLines(){
    setInterval(lines, 33)
};
const MAP = [
    1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,
    1,0,0,0,1,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1
]
function drawMap() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f00"
    ctx.fillRect(px, py, 9, 9);

    ctx.fillStyle = "#fff";
    let x = 0, y = 0, n =0;
    
    for (y=0; y<mapY; y++) {
        for (x=0; x<mapX; x++) {
            //console.log(String(n) + " - " + String(MAP[n]));
            if (MAP[n] == 1) {
    
                ctx.fillRect((64*x),(64*y), 64, 64);
            }
            n+=1;
        }
    }
    for (y=0; y<mapY-1; y++) {
        ctx.fillStyle = "#888";
        ctx.fillRect(0, (64*(y+1)), 640, 1);
        for (x=0; x<mapX-1; x++) {
            //console.log(String(n) + " - " + String(MAP[n]));
        
            ctx.fillStyle = "#888";
            ctx.fillRect((64*(x+1)),0, 1, 640);
        
        }
    }

}

function lines(){
    let x = 0, y = 0, a = pa;
    let rae = pa, r=0, rx = .0, ry = .0, yo = 0, xo = 0, mx=0, my=0, mp=0, dof=0;
    x = px+4, y = 640-(py+4);
    let invY = 640-y;
    let Xendpoint = 0;
    let Yendpoint = 0;

    lineIt();
    if (pa < 0){pa = pi*2-0.02} else if (pa > pi*2) {pa = 0.02}

    function lineIt(){
        ctx.strokeStyle = "#f0f";
        
        ctx.beginPath();
        ctx.moveTo(x, py+4);
        ctx.lineTo(x + Math.cos(pa)*100, (py+4) - (Math.sin(pa)*100));
        ctx.stroke();        
    }
    for (r=0; r<1; r++){
        let atan = -1/(Math.tan(rae))
        if (rae>pi) {ry =((Math.floor(y)>>6)<<6)-0.0001; rx=(y-ry)*atan+x; yo=-64, xo=-yo*atan}
        if (rae<pi) {ry =((Math.floor(y)>>6)<<6)+64; rx=(y-ry)*atan+x; yo=64, xo=-yo*atan}
        if (rae==0 || rae==pi) {rx=px; ry=py; dof=8}
        
        while (dof<8){
            mx = Math.floor(rx)>>6; my= Math.floor(ry)>>6; mp = my*mapX+mx;
            if (mp<mapX*mapY && MAP[mp]==1){dof=8}
            else {rx+=xo; ry+=yo; dof+=1;};
        }


        ctx.beginPath();
        ctx.moveTo(x, py+4);
        ctx.lineTo(rx, 640-ry);
        ctx.stroke();
        
        console.log(String(mp) + "\n" + String(ry) +", "+ String(rx));
    }
    //if (a < (pi*.5)) {}  //{if (((-(x-640))* Math.tan(a)) + (-(y-480)) < 480) {Xendpoint = ((-(x-640))* Math.tan(a)) + (-(y-480)), Yendpoint = 640} else{Xendpoint = 480, Yendpoint = (y / Math.tan(a)) + x } ; }
    //else if (a < (pi) && a > (pi*.5)){}
    //else if (a < (pi*1.5) && a > (pi)){}
    //else if (a < (pi*2) && a > (pi*1.5)){}
    
    //console.log("("+x+", "+y+")"+"\n"+ Yendpoint + ", " + Xendpoint);
};