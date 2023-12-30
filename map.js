const mapX = 10, mapY = 10, mapA = 100;

function preMap(bits) {
    let ySeq = [];
    let bitString = "";
    for (v=0; v<bits.length; v++){
        bitString += bits[v];
        if (Number.isInteger((v+1)/Math.sqrt(bits.length))){
            ySeq.push(bitString);
            bitString = ""
        }
    }
    let yInvert = [];
    for (v=0; v<ySeq.length; v++){
        for (b=0; b<ySeq.length; b++){
            yInvert.push(ySeq[(ySeq.length-1)-v][b])
        }
    }
    return(yInvert);
}
