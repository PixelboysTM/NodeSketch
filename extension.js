function getViewport() {

    var viewPortWidth;
    var viewPortHeight;

    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined') {
        viewPortWidth = window.innerWidth,
            viewPortHeight = window.innerHeight
    }

    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (typeof document.documentElement != 'undefined' &&
        typeof document.documentElement.clientWidth !=
        'undefined' && document.documentElement.clientWidth != 0) {
        viewPortWidth = document.documentElement.clientWidth,
            viewPortHeight = document.documentElement.clientHeight
    }

    // older versions of IE
    else {
        viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
            viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
    }
    return [viewPortWidth, viewPortHeight];
}

function getRaw(o,c) {
    var os = o;
    if (o > 0){
    while (os > c) {
        os -= c;
    }
}else{
    while (os < c) {
        os += c;
    }
}
    return os;
}
function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

class Rect{
    constructor(x,y,w,h){
        this.x =x;
        this.y =y;
        this.w =w;
        this.h =h;
    }
    contains(x,y){
        if (x >= this.x &&        // right of the left edge AND
      x <= this.x + this.w &&   // left of the right edge AND
      y >= this.y &&        // below the top AND
      y <= this.y + this.h) {   // above the bottom
        return true;
    }
    return false;
    }
}

function OverOne(s,x,y,ox,oy,sc) {
    var is = false;
    s.forEach(n => {
        if(n.getRect(ox,oy,sc).contains(x,y)){
            is = true;
        }
    });
    print(is);
    return is;
}