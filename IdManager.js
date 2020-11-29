var Ids = []
const ar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.,;:-_!§$%&/()=?+".split('');

function genID(){
    var id = ""
    do {
        for (let i = 0; i < 128; i++) {
        id += ar[Math.floor(Math.random()*ar.length)]
        }
    } while (containsObject(id,Ids));
    Ids.push(id);
    return id;
}