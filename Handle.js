class Handle{
    constructor(handleType, ioType) {
        this.hType = handleType;
        this.io = ioType;
        this.ID = genID();
    }

    draw(cx,cy, scroll,mx,my){
        push();

        noFill();
        stroke(255, 255, 255, 255);
        var over = this.getRect(cx,cy,scroll).contains(mx,my);
        if (over){
            strokeWeight(4*scroll)
        }else{
            strokeWeight(2*scroll);
        }
        ellipse(cx, cy, 8*scroll, 8*scroll);

        pop();
        this.lx = cx;
        this.ly = cy;
        return {count : 20*scroll, over : over};
    }


    drawP(cx,cy, scroll){
        return 20*scroll;
    }
    getRect(cx,cy,sc){
        return new Rect(cx - 4*sc, cy - 4 * sc, 8*sc, 8*sc);
    }
}

const HandleType = {
    Flow : 0,
    Number : 1,
    Text : 2
}
const HandleIO = {
    Input : true,
    Output : false
}