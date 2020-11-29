class Connection{
    constructor(_hFrom, _hTo) {
        this.from = _hFrom;
        this.to = _hTo;
        this.ID = genID();
        _hTo.connected = true;
    }

    draw(sc){
        push()
        stroke(255)
        strokeWeight(4*sc);
        line(this.from.lx,this.from.ly,this.from.lx + 20 * sc,this.from.ly)
        line(this.from.lx + 20 * sc,this.from.ly,this.to.lx - 20*sc,this.to.ly);
        line(this.to.lx - 20*sc,this.to.ly,this.to.lx,this.to.ly)
        pop()
    }
    drawF(sc){
        push()
        stroke(255)
        strokeWeight(4*sc);
        line(this.from.lx,this.from.ly,this.from.lx + 20 * sc,this.from.ly)
        //line(this.from.lx + 20 * sc,this.from.ly,this.to.lx - 20*sc,this.to.ly);
        line(this.to.lx - 20*sc,this.to.ly,this.to.lx,this.to.ly)
        pop()
    }
}