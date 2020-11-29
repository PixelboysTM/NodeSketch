class EditorHolder {
    constructor(nodes, connections) {
        this.nodes = nodes;
        this.connections = connections;
    }
}


const cellSize = 50;
let leftMouseDown = false;
let middleMouseDown = false;
let rightMouseDown = false;
var offsetX = 0;
var offsetY = 0;
var editorHolder;
var scrollLocation = 1;
var selection = [];
var keyDict = {};
var hHandle;
var currConnection = -1;


function setup() {
    // var c = createCanvas(windowWidth, windowHeight);
    var clientWidth = document.getElementById('canvasHolder').clientWidth;
    var clientHeight = document.getElementById('canvasHolder').clientHeight;
    var c = createCanvas(clientWidth, clientHeight);
    c.parent("canvasHolder");
    
    editorHolder = new EditorHolder(
        [
            new Node(120, 72, 150, 150, "Test Node 1"),
            new Node(120, 72, 400, 150, "Test Node 2")
        ], [

        ]
    );
    //editorHolder = new EditorHolder(getItem("lastEditorNodes"), getItem("lastEditorConns"));
}

function updateInput() {
    if (currConnection != -1) {
        return;
    }

    if (middleMouseDown) {
        offsetX += mouseX - pmouseX;
        offsetY += mouseY - pmouseY;
    }
    if (leftMouseDown) {
        var dx = mouseX - pmouseX;
        var dy = mouseY - pmouseY;
        selection.forEach(e => {
            e.move(dx, dy);
        })
    }
}
//#region Draw
function draw() {
    updateInput();
    UpdatePropertyPanel(selection);
    background(50)

    text(scrollLocation, 20, 10)

    drawGrid(0, 0, width, height, cellSize,
        getRaw(offsetX, cellSize * scrollLocation), getRaw(offsetY, cellSize * scrollLocation),
        scrollLocation);

    editorHolder.connections?.forEach(c => {
        c.draw(scrollLocation);
    })

    hHandle = -1;
    editorHolder.nodes?.forEach(n => {
        var r = n.draw(
            offsetX,
            offsetY,
            scrollLocation,
            containsObject(n, selection),
            mouseX,
            mouseY
        );
        if (r.is) {
            hHandle = r.handle;
        }
    });

    editorHolder.connections?.forEach(c => {
        c.drawF(scrollLocation);
    })

    if (currConnection != -1) {
        push()
        stroke(255); //TODO: GetFromHandle;
        strokeWeight(4 * scrollLocation);
        var h = currConnection.from;
        line(h.lx, h.ly, mouseX, mouseY);

        pop()
    }

    push();
    noFill();
    stroke(0);
    strokeWeight(2);
    rect(1, 1, width - 2, height - 2);
    pop();

    storeItem("lastEditorNodes", editorHolder.nodes);
    storeItem("lastEditorConns", editorHolder.connections);
}
//#endregion

function selectNodes() {
    if (!keyDict["ctrl"]) {
        if (!OverOne(selection, mouseX, mouseY, offsetX, offsetY, scrollLocation)) {
            selection = []
        }
    }
    editorHolder.nodes.forEach(n => {
        if (n.getRect(offsetX, offsetY, scrollLocation).contains(mouseX, mouseY) && !n.overUI(mouseX, mouseY, offsetX, offsetY, scrollLocation)) {
            selection.push(n);
        }
    });
}

function mousePressed(event) {
    if (event.button == 0) {
        leftMouseDown = true;
        if (hHandle == -1) {
            selectNodes();
        } else if (hHandle.io == HandleIO.Output) {
            selection = []
            currConnection = {
                from: hHandle,
                to: -1
            }
            hHandle = -1;
        }
    }
    if (event.button == 1) {
        middleMouseDown = true;
    }
    if (event.button == 2) {
        rightMouseDown = true;
    }
}

function mouseReleased(event) {
    if (event.button == 0) {
        leftMouseDown = false;
        if (currConnection != -1) {
            if (hHandle == -1) {
                //TODO: OpenInserter;
            } else {
                if (hHandle != -1 &&
                    hHandle != currConnection.from &&
                    hHandle.io == HandleIO.Input &&
                    !hHandle.connected) {
                    currConnection.to = hHandle;
                    editorHolder.connections.push(new Connection(currConnection.from, currConnection.to));
                }
                //TODO: MakeConection;
            }
            currConnection = -1;
        }
    }
    if (event.button == 1) {
        middleMouseDown = false;
    }
    if (event.button == 2) {
        rightMouseDown = false;
    }
}

function mouseWheel(event) {
    scrollLocation += event.delta / 100;
    if (scrollLocation < 0.1) {
        scrollLocation = 0.1;
    }
    if (scrollLocation > 2) {
        scrollLocation = 2;
    }
}

function keyPressed(event) {

    if (event.keyCode == 17) {
        keyDict["ctrl"] = true;
    }
}

function keyReleased(event) {
    if (event.keyCode == 17) {
        keyDict["ctrl"] = false;
    }
}