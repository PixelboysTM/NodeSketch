function drawGrid(x, y, w, h, c, ofx,ofy, scroll){
    push();
    stroke(0)
    strokeWeight(2*scroll)
    for (let ix = 0; ix < w / (c * scroll) + 2 * (c * scroll); ix++) {
        line(ix * (c * scroll) + ofx - (c * scroll) , x, ix * (c * scroll) + ofx - (c * scroll), h)
    }
    for (let iy = 0; iy < h / (c * scroll) + 2 * (c * scroll); iy++) {
        line(y, iy * (c * scroll) + ofy - (c * scroll), w, iy * (c * scroll) + ofy - (c * scroll))
    }
    stroke(10)
    strokeWeight(1*scroll)
    c /= 2
    for (let ix = 0; ix < w / (c * scroll) + 2 * (c * scroll); ix++) {
        line(ix * (c * scroll) + ofx - (c * scroll) , x, ix * (c * scroll) + ofx - (c * scroll), h)
    }
    for (let iy = 0; iy < h / (c * scroll) + 2 * (c * scroll); iy++) {
        line(y, iy * (c * scroll) + ofy - (c * scroll), w, iy * (c * scroll) + ofy - (c * scroll))
    }
    stroke(15)
    strokeWeight(0.2*scroll)
    c /= 2
    for (let ix = 0; ix < w / (c * scroll) + 2 * (c * scroll); ix++) {
        line(ix * (c * scroll) + ofx - (c * scroll) , x, ix * (c * scroll) + ofx - (c * scroll), h)
    }
    for (let iy = 0; iy < h / (c * scroll) + 2 * c; iy++) {
        line(y, iy * (c * scroll) + ofy - (c * scroll), w, iy * (c * scroll) + ofy - (c * scroll))
    }
    pop()
}