class Node{
    constructor(sx,sy,px,py, name){
        this.x = px;
        this.y = py;
        this.w = sx;
        this.h = sy;
        this.name = name;
        this.ID = genID();
        this.connected = false;
        this.handles = [
            new Handle(HandleType.Flow, HandleIO.Input),
            new Handle(HandleType.Flow, HandleIO.Output),
            new Handle(HandleType.Flow, HandleIO.Input),
            new Handle(HandleType.Flow, HandleIO.Output),
        ]
    }
    getRect(ofx,ofy,scroll){
        return new Rect(this.x * scroll + ofx,this.y * scroll + ofy,this.w * scroll,this.h * scroll)
    }
    move(dx,dy){
        this.x += dx;
        this.y += dy;
    }

    draw(ofx,ofy, scroll, sel,mx,my) {
        push();
        fill(50);
        stroke(50,100,255,255);
        if (sel){
            strokeWeight(2*scroll);
        }else if(this.getRect(ofx,ofy,scroll).contains(mx,my)){
            smooth()
            strokeWeight(3*scroll);
        }
        else{
            strokeWeight(1*scroll);
        }
        var r = 10 * scroll;
        rect(this.x * scroll + ofx,this.y * scroll + ofy,this.w * scroll,this.h * scroll,r,r,r,r);
        fill(255)
        textSize(12*scroll)
        line(this.x*scroll +ofx, (this.y + 20)* scroll + ofy, (this.x + this.w) * scroll + ofx, (this.y + 20)* scroll + ofy)
        noStroke()
        text(this.name + " " + sel, this.x * scroll + ofx + 5 * scroll, this.y * scroll + ofy + 15 * scroll);

        var siy = (this.y + 35)*scroll + ofy;
        var soy = siy; 
        var o = false;
        for (let i = 0; i < this.handles.length; i++) {
            var h = this.handles[i];
            var over;
            if (h.io == HandleIO.Input ) {
                over = h.draw((this.x + 10) * scroll + ofx, siy, scroll,mx,my );
                siy += over.count
            }else if (h.io == HandleIO.Output){
                over = h.draw((this.x + this.w - 10) * scroll + ofx, soy, scroll,mx,my );
                soy += over.count;
            }
            if(over.over){
                this.hoveredHandle = h;
                o = true;
            }
        }
        pop();
        return {is : o, handle : this.hoveredHandle};
    }

    overUI(x,y,ox,oy,sc){
        var is = false;
        var siy = (this.y + 35)*sc + oy;
        var soy = siy; 
        for (let i = 0; i < this.handles.length; i++) {
            var h = this.handles[i];
            if (h.io == HandleIO.Input ) {
                siy += h.drawP((this.x + 10) * sc + ox, siy, sc );
                if(h.getRect((this.x + 10) * sc + ox, siy, sc).contains(x,y)){
                    is = true;
                }
            }else if (h.io == HandleIO.Output){
                soy += h.drawP((this.x + this.w - 10) * sc + ox, soy, sc );
                if(h.getRect((this.x + this.w - 10) * sc + ox, soy, sc).contains(x,y)){
                    is = true;
                }
            }
        }
        return is;
    }
}