
const sidebar = document.getElementById("sidebar");
const title = document.getElementById("OBJ_Name");
const region = document.getElementById("OBJ_region")

function UpdatePropertyPanel(sel){
    if (sel.length == 1){
        title.innerHTML = sel[0].name;
        region.innerHTML = `<p>Inspecting Object with IdLength:\n ${sel[0].ID.length}</p>`;
    }else{
        title.innerHTML = "N/A"
        region.innerHTML = "<p>Please select <b>ONE</B> Object to edit its properties.</p>"
    }
}