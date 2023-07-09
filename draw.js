WebGL2RenderingContext

const mapX = 10, mapY = 10, mapA = 100;
const pi = Math.PI;
const rad = (Math.PI*2);
var fulldist = 0;

var map_rays = [];
var mpY=0;
var mpX=0;
var sequence = [];
var vFour = 0;

var pix = [];
var pix_count = 0;

const MAP = [
    1,1,1,1,1,1,1,1,1,1,
    1,0,0,1,0,0,0,0,0,1,
    1,0,0,1,0,0,0,0,0,1,
    1,0,0,1,0,0,0,0,0,1,
    1,0,0,1,0,0,0,0,0,1,
    1,0,0,1,0,0,0,0,0,1,
    1,0,0,1,0,0,0,0,0,1,
    1,0,0,1,0,1,0,0,0,1,
    1,0,0,0,0,1,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1
]


function genMap(map) {
    let mapYflip = [];
    let mapexport = [];
    for (n=100; n>0; n--){
        mapYflip.push(map[n-1]);
    }
    for (r=0; r<10; r++){
        n=0
        while(n<10){
            mapexport.push(mapYflip[((r+1)*10)-(n+1)]);
            n+=1;
        }
    }
    return(mapexport);
}

function drawMap() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f00"
    ctx.fillRect(px, py, 9, 9);

    ctx.fillStyle = "#fff";
    let x = 0, y = 0, n =0;
    
    for (y=0; y<mapY; y++) {
        for (x=0; x<mapX; x++) {
            if (genMap(MAP)[n] == 1) {
                ctx.fillRect((64*x),(64*y), 64, 64);
            }
            n+=1;
        }
    }
    for (y=0; y<mapY-1; y++) {
        ctx.fillStyle = "#888";
        ctx.fillRect(0, (64*(y+1)), 640, 1);
        for (x=0; x<mapX-1; x++) {
            ctx.fillStyle = "#888";
            ctx.fillRect((64*(x+1)),0, 1, 640);
        
        }
    }

}

function distance(ax, ay, bx, by, ang){
    return( Math.sqrt((bx-ax)*(bx-ax) + (by-ay)*(by-ay)));
}

function lines(){
    sequence = [];
    let x = px+4, y = py+4, a = pa, degree = 0.0174533;
    let rae = pa-(30*(degree)), r=0, rx = .0, ry = .0, yo = 0, xo = 0, mx=0, my=0, mp=0, dof=0;
    if (rae<0){rae+=2*pi} if (rae>2*pi){rae-=2*pi}
    let yinv = (640-y);
    let Xendpoint = 0;
    let Yendpoint = 0;

    lineIt();

    function lineIt(){
        ctx.strokeStyle = "#f0f";
        
        ctx.beginPath();
        ctx.moveTo(x, py+4);
        ctx.lineTo(x + Math.cos(pa)*25, (py+4) - (Math.sin(pa)*25));
        ctx.stroke();
    }
    for (r=0; r<60; r++){
        //horizontal line scan |
        //                     v
        let horizondist = 1000000, hx = x, hy = y;
        dof=0;
        let atan = -1/(Math.tan(rae))
        let ntan = -(Math.tan(rae));
        let halfpi = Math.PI/2;
        let threequartpi = (3*Math.PI/2);
        if (rae>pi) {ry =((Math.floor(yinv)>>6)<<6)-0.0001; rx=(yinv-ry)*atan+x; yo=-64, xo=-yo*atan}
        if (rae<pi) {ry =((Math.floor(yinv)>>6)<<6)+64;     rx=(yinv-ry)*atan+x; yo= 64, xo=-yo*atan}
        if (rae==0 || rae==pi) {rx=x; ry=py; dof=8}
        
        while (dof<8){
            mx = Math.floor(rx)>>6; my= Math.floor(ry)>>6; mp = my*mapX+mx;
            if (mp>0 && mp<mapX*mapY && MAP[(mp)]==1){hx=rx; hy=ry; horizondist=distance(x, yinv, hx, hy, rae);dof=8;}
            else {rx+=xo; ry+=yo; dof+=1;};
        }
        mpY = mp;
        //vertical line scan |
        //                   v

        let vertdist = 1000000, vx = x, vy = y;
        dof=0;

        if (rae>halfpi && rae<threequartpi){rx =((Math.floor(x)>>6)<<6)-0.0001; ry=(x-rx)*ntan+yinv; xo=-64, yo=-xo*ntan}
        if (rae<halfpi || rae>threequartpi){rx =((Math.floor(x)>>6)<<6)    +64; ry=(x-rx)*ntan+yinv; xo= 64, yo=-xo*ntan}
        if (rae==0 || rae==pi) {rx=x; ry=py; dof=8}

        while (dof<8){
            mx = Math.floor(rx)>>6; my= Math.floor(ry)>>6; mp = my*mapX+mx;
            if (mp>0 && mp<mapX*mapY && MAP[(mp)]==1){vx=rx; vy=ry; vertdist=distance(x, yinv, vx, vy, rae); dof=8;}
            else {rx+=xo; ry+=yo; dof+=1;};
        }
        mpX = mp;
        //draw correct ray |
        //                 v
        if (vertdist<horizondist) {rx=vx; ry=vy; fulldist=vertdist;    mp = mpX; ctxTwo.fillStyle = "#f00";}
        if (horizondist<vertdist) {rx=hx; ry=hy; fulldist=horizondist; mp = mpY; ctxTwo.fillStyle = "#800";}
        
        map_rays.push([r, mp]);

        ctx.strokeStyle = "#f00";
        ctx.beginPath();
        ctx.moveTo(x, py+4);
        ctx.lineTo(rx, 640-ry);
        ctx.stroke();

        
        let fixedAng   = a - rae; if (fixedAng<0){fixedAng+=2*pi} if (fixedAng>2*pi){fixedAng-=2*pi}
        fulldist= (fulldist*Math.cos(fixedAng));
        var rectHeight = (mapA*480)/fulldist; if(rectHeight>480){rectHeight=480}
        var vertOffset = 240-rectHeight/2
        
        
        let ty = 0, ty_step = (rectHeight/32);
        if(r==59){
            mpState = 1;
            for (v=0; v<60; v++){
                if (v == 59){}
                else {if (map_rays[v][1] != map_rays[v+1][1]){sequence.push(v+1)}}
            }

            map_rays = [];

            let seq_length = sequence.length;
            for (v=0; v<seq_length; v++){
                if(v<sequence.length-1) {sequence[sequence.length-(v+1)] =  sequence[sequence.length-(v+1)]-sequence[sequence.length-(v+2)]};
                vFour+=sequence[sequence.length-(v+1)]
                if (v==sequence.length-1){sequence.push(60-vFour)}
            }

            bit_textures(sequence,rectHeight,vertOffset,seq_length);
            vFour=0;
        }
        for (v=0; v<32; v++){
            if (pix.length == 0) {ctxTwo.fillStyle = "#fff";}
            else {ctxTwo.fillStyle = "#" + String(pix[((v+1)*(r+1))-1]) + String(pix[((v+1)*(r+1))-1]) + String(pix[((v+1)*(r+1))-1]);}
            ctxTwo.fillRect((480-r*8)-8, vertOffset+ty, 8, rectHeight/32);
            ty+=ty_step
        }

        rae += degree; if (rae<0){rae+=2*pi} if (rae>2*pi){rae-=2*pi}
    }
}