//------
//Oct 30 2021
//Author Dormancy
//------
//Global Varibles
//qvizdraw
//droppablesvar
//draggablesvar
//qubits
//------
//Initialize the Parameter
var qvizdraw = {
    qubits: [],
    operations: [],
};

//Initialize the navigation bar
const getrows = document.getElementById("rowsinput")
const getcols = document.getElementById("colsinput")
const gatesets = document.querySelectorAll(".gatesets")
var droppablesvar = document.querySelectorAll('.droppable')
var draggablesvar = document.querySelectorAll(".draggable")
var qubits = document.querySelectorAll(".qubit")
document.querySelector("#addrow").disabled = true;
document.querySelector("#addcol").disabled = true;
document.querySelector("#deleterow").disabled = true;
document.querySelector("#deletecol").disabled = true;

getrows.onfocus = function () {
    if (this.value == "Rows") {
        this.value = ""
    }
};
getrows.onblur = function () {
    if (this.value == "") {
        this.value = "Rows"
    }
}
getcols.onfocus = function () {
    if (this.value == "Cols") {
        this.value = ""
    }
};

getcols.onblur = function () {
    if (this.value == "") {
        this.value = "Cols"
    }
}

//str[HTML strings]=>append HTML nodes
function parseElement(str) {
    var o = document.createElement("div");
    o.innerHTML = str;
    return o.childNodes;
}
//HTML nodes=>str[HTML strings]
function stringIze(obj) {
    var o = document.createElement("div");
    o.append(obj);
    return o.innerHTML;
}


//BUTTON Start/Restart
btn.onclick = function () {
    var rows = getrows.value
    var cols = getcols.value
    if (rows != "Rows" && cols != "Cols") {
        Initialize(rows, cols)
        var addrow = document.querySelector("#addrow")
        var addcol = document.querySelector("#addcol")
        var deleterow = document.querySelector("#deleterow")
        var deletecol = document.querySelector("#deletecol")
        addrow.disabled = false
        addcol.disabled = false
        deleterow.disabled = false
        deletecol.disabled = false
        getcols.disabled = false
        getrows.disabled = false
    }
}


function restart() {
    var area = document.querySelector("#DrawArea")
    area.innerHTML = '<div class="rows"></div>'
    setTimeout(() => {
        var rows = document.querySelector(".rows")
        rows.innerHTML = '<div class="cols"></div>'
    }, 0);
}

function Initialize(rows, cols) {
    restart()
    qvizdraw = { qubits: [], operations: [] }
    setTimeout(() => {
        var arr1 = [];
        arr1.push()
        for (var i = 0; i < cols; i++) {
            arr1.push(`<div class="droppable row" data-cols = "${i}"></div>`);
        }
        document.querySelector('.cols').innerHTML = arr1.join('');
        var arr2 = [];
        var temp = document.querySelector(".cols").innerHTML
        for (var i = 0; i < rows; i++) {
            arr2.push(`<div class="cols" data-rows = "${i}">` + `<img data-index="0" data-qindex="${i}" class="qubit" src="./images/ket0.svg" alt="\ket{0}" height="50px" width="50px" />` + temp.toString() + '</div>');
            qvizdraw["qubits"].push({ id: i })
        }
        document.querySelector('.rows').innerHTML = arr2.join('');
        setTimeout(() => {
            droppablesvar = document.querySelectorAll('.droppable')//CHANGE THE GLOBAL VARS
            qubits = document.querySelectorAll(".qubit")//CHANGE THE GLOBAL VARS
            droplisten(droppablesvar)
            qubitreverse(qubits)
            totoaldrawqc(totoalqcinfor())
        }, 0);
    }, 0);
}

function addcol() {
    var colslen = document.querySelector(".cols").childElementCount
    if (colslen > 0) {
        document.querySelector("#deletecol").disabled = false;
    }
    var temp = document.getElementsByClassName("cols");
    for (var i = 0; i < temp.length; i++) {
        var o = document.createElement("div");
        o.className = "droppable row";
        o.setAttribute('data-cols', `${colslen - 1}`)
        temp[i].appendChild(o)
    }
    setTimeout(() => {
        droppablesvar = document.querySelectorAll('.droppable')//CHANGE THE GLOBAL VARS
        droplisten(droppablesvar)
        totoaldrawqc(totoalqcinfor())
    }, 0);

}

function addrow() {
    var len = document.getElementsByClassName("cols").length
    if (len > 0) {
        document.querySelector("#deleterow").disabled = false;
    }
    var cols = document.querySelector(".cols").childElementCount
    var arr1 = [];
    var qubitnum = document.querySelectorAll(".qubit")
    arr1.push(`<img data-index="${qubitnum.length}" class="qubit" src="./images/ket0.svg" alt="\ket{0}" height="50px" width="50px" />`)
    for (var i = 0; i < cols - 1; i++) {
        arr1.push(`<div class="droppable row" data-cols = "${i}"></div>`);
    }
    let temp = arr1.join('');
    var o = document.createElement("div");
    o.className = "cols"
    for (var i = 0; i < parseElement(temp).length; i++) {
        var rowindex = document.getElementsByClassName("cols")
        o.setAttribute("data-rows", `${rowindex.length}`)
        o.append(parseElement(temp)[i]);
    }
    document.querySelector(".rows").append(o)
    var qubits = qvizdraw["qubits"]
    var index = qubits[qubits.length - 1]["id"]
    qvizdraw["qubits"].push({ id: index + 1 })
    setTimeout(() => {
        droppablesvar = document.querySelectorAll('.droppable')//CHANGE THE GLOBAL VARS
        qubits = document.querySelectorAll(".qubit")//CHANGE THE GLOBAL VARS
        droplisten(droppablesvar)
        qubitreverse(qubits)
        totoaldrawqc(totoalqcinfor())
    }, 0);
}

function FindCtrlX(x, draggables) {
    for (var i = 0; i < draggables.length; i++) {
        var dragging = draggables[i];
        var pcol = dragging.parentNode;
        var tmpx = pcol.getAttribute("data-cols");
        var gatectrl = dragging.getAttribute("data-control")
        if (x == tmpx || gatectrl == "true") {
            dragging.remove()
        }
    }
}
function CountArray(arr, num) {
    var i = 0;
    arr.find(function (ele) {
        ele === num ? i++ : '';
    })
    return i
}

function DeleteSingleCtrl() {
    var tmp = []
    var draggables = document.querySelectorAll(".draggable")
    for (var i = 0; i < draggables.length; i++) {
        var dragging = draggables[i];
        if (dragging.getAttribute("data-control") == "true") {
            var pcol = dragging.parentNode;
            var x = pcol.getAttribute("data-cols");
            tmp.push(x)
        }
    }
    for (var i of tmp) {
        if (CountArray(tmp, i) < 2)
            FindCtrlX(x, draggables)
    }

}

function deleterow() {
    var len = document.getElementsByClassName("cols").length
    if (len <= 2) {
        document.querySelector("#deleterow").disabled = true;
    }
    var temp = document.querySelectorAll(".cols");
    temp[len - 1].remove()
    var qubits = qvizdraw["qubits"]
    qubits.pop()
    qvizdraw["qubits"] = qubits//CHANGE THE GLOBAL VARS
    setTimeout(() => {
        DeleteSingleCtrl()
        totoaldrawqc(totoalqcinfor())
    }, 0);
}

function deletecol() {
    var colslen = document.querySelector(".cols").childElementCount
    if (colslen <= 3) {
        document.querySelector("#deletecol").disabled = true;
    }
    var temps = document.getElementsByClassName("cols")
    console.log(temps)
    for (var i = 0; i < temps.length; i++) {
        var temp = temps[i].querySelectorAll(".droppable")
        var len = temp.length
        temp[len - 1].remove()
    }
    setTimeout(() => {
        totoaldrawqc(totoalqcinfor())
    }, 0);
}

//CLICK TO REVERSE THE QUBIT
function qubitreverse(qubits) {
    for (var qubit of qubits) {
        qubit.addEventListener('click', qreverse);
    }
}
function qreverse() {
    if (this.getAttribute("data-index") == 0) {
        this.setAttribute("src", "./images/ket1.svg")
        this.setAttribute("data-index", 1)
    }
    else {
        this.setAttribute("src", "./images/ket0.svg")
        this.setAttribute("data-index", 0)
    }
}

function AddL(tmp) {
    tmp.addEventListener('dragover', dragOver);
    tmp.addEventListener('dragleave', dragLeave);
    tmp.addEventListener('dragenter', dragEnter);
    tmp.addEventListener('drop', dragDrop);
}

function RemoveL(tmp) {
    tmp.removeEventListener('dragover', dragOver);
    tmp.removeEventListener('dragleave', dragLeave);
    tmp.removeEventListener('dragenter', dragEnter);
    tmp.removeEventListener('drop', dragDrop);
}

// --------------------------Dragging Function-------------------
// --------------------------------------------------------------
//Add Listener of all drag
draggingall(draggablesvar)//Initize the function
function draggingall(temp) {
    for (var draggable of temp) {
        draggable.addEventListener('dragstart', dragStart);
        draggable.addEventListener('dragend', dragEnd);
    }
}


function dragStart() {
    this.className += ' dragging';
    var temp = this.parentNode;
    var tmp = temp.parentNode;
    if ((this.id == "ctrl" || this.id == "CtrlX") && tmp.className == "ctrlgate") {
        var nos = document.querySelectorAll(".ctrlline")
        for (var no of nos) {
            no.className = "noplacement"
        }
    }
    if (this.id == "ctrl" || this.id == "CtrlX") {
        var nos = document.querySelectorAll(".ctrlline")
        for (var no of nos) {
            AddL(no)
        }
    }
}
function dragEnd() {
    this.className = 'draggable';
    var nos = document.querySelectorAll(".noplacement")
    for (var no of nos) {
        no.className = "ctrlline"
    }
    setTimeout(() => {
        var nos = document.querySelectorAll(".ctrlline")
        for (var no of nos) {
            RemoveL(no)
        }

        draggablesvar = document.querySelectorAll(".draggable")
        draggingall(draggablesvar)
        totoaldrawqc(totoalqcinfor())
    }, 0);
}
//Add Listener of all drop
function droplisten(droppables) {
    for (const droppable of droppables) {
        AddL(droppable)
    }
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' drag-over';
}

function dragLeave(e) {
    e.preventDefault();
    if (this.className != "ctrlline") {
        this.className = 'droppable row';
    }

}

function dragDrop(e) {
    e.preventDefault()
    this.className = 'droppable row';
    var dragitem = document.querySelector(".dragging")
    var gateClass = dragitem.getAttribute("id")
    var wcgate = dragitem.getAttribute("data-control")
    dragitem.className = "draggable"
    if (wcgate == "true") {
        var cgs = document.querySelector("#cnot").querySelectorAll(".gate")
        var c0 = cgs[0].childElementCount
        var c1 = cgs[1].childElementCount
        var check1 = c0 == 1 && c1 == 0
        var check2 = c0 == 0 && c1 == 1
        if (check1 || check2) {
            cgs[0].innerHTML = '<div class="draggable" draggable="true" id="ctrl" data-control="true"></div>'
            cgs[1].innerHTML = '<div class="draggable" draggable="true" id="CtrlX" data-control="true"></div>'
        }
    }
    else {
        var sg = document.querySelector(".singlegate").querySelector("." + gateClass.toString())
        sg.innerHTML = (stringIze(dragitem))
    }
    this.innerHTML = (stringIze(dragitem))
    setTimeout(() => {
        draggablesvar = document.querySelectorAll(".draggable")
        draggingall(draggablesvar)
        totoaldrawqc(totoalqcinfor())
    }, 0);

}



// ----------------Draw The Quantum Circuit with Qviz--------------
// ----------------------------------------------------------------

//USE GLOBAL VAR
function drawQC() {
    if (typeof qviz != 'undefined') {
        var sampleDiv = document.getElementById('qvizdraw');
        qviz.draw(qvizdraw, sampleDiv, qviz.STYLES['Default']);
    }
}



//Draggables List => GateInformation
function GetCoordinates(draggables) {
    var gateinformation = []
    for (var i = 0; i < draggables.length; i++) {
        var dragging = draggables[i]
        var gate = dragging.getAttribute("id")
        if (gate.length > 4) {
            gate = gate[gate.length - 1]
        }
        var pcol = dragging.parentNode;
        var prow = pcol.parentNode;
        var x = pcol.getAttribute("data-cols");
        var y = prow.getAttribute("data-rows");
        var control = dragging.getAttribute("data-control");
        var arr = { xindex: x, yindex: y, gateclass: gate, iscontrol: control };
        if (x != null) {
            gateinformation.push(arr)
        }
    }
    return gateinformation
}


//GateInformation = > DrawQVIZ
function totoaldrawqc(qcinfor) {
    var sgs = qcinfor["sg"]
    var cgs = qcinfor["cg"]
    var inforcontainer = []
    qvizdraw["operations"] = []
    var cols = document.querySelector(".cols").childElementCount
    for (var i = 0; i < cols - 1; i++) {
        var container = {
            index: 0,
            gates: [],
        }
        var everycol = []
        for (var j = 0; j < sgs.length; j++) {
            if (sgs[j]['gateinfor']["xindex"] == i.toString()) {
                everycol.push(sgs[j])
            }
        }
        for (var j = 0; j < cgs.length; j++) {
            if (cgs[j]['gateinfor']["ctrl"]["xindex"] == i.toString()) {
                everycol.push(cgs[j])
            }
        }
        container["index"] = i
        container["gates"] = everycol
        inforcontainer.push(container)
    }
    for (var i = 0; i < inforcontainer.length; i++) {
        for (var j = 0; j < inforcontainer[i]["gates"].length; j++) {
            var gs = inforcontainer[i]["gates"]
            var gateclass = gs[j]["gateclass"]
            var gateinfor = gs[j]["gateinfor"]
            if (gateclass == "sg") {
                var temp = {
                    gate: '',
                    targets: [],
                }
                temp["gate"] = gateinfor["gateclass"]
                temp["targets"] = [{ qId: gateinfor["yindex"] }]
                qvizdraw["operations"].push(temp)
            }
            if (gateclass == "cg") {
                var temp = {
                    gate: '',
                    isControlled: true,
                    controls: [],
                    targets: [],
                }
                temp["gate"] = gateinfor['ctrlgate']["gateclass"]
                temp["targets"] = [{ qId: gateinfor['ctrlgate']["yindex"] }]
                temp["controls"] = [{ qId: gateinfor['ctrl']["yindex"] }]
                qvizdraw["operations"].push(temp)
            }
        }
    }
    drawQC()
}



function totoalqcinfor() {
    var gatecontainer =
    {
        sg: {},
        cg: {},
    }
    var draggables = document.querySelectorAll(".draggable")
    var gateinformation = GetCoordinates(draggables)
    var ctrlsets = []
    var ctrlgatesets = []
    var ctrlgatescontainer = []
    var singlegatecontainer = []
    for (var sgate of gateinformation) {
        if (sgate['iscontrol'] == "false") {
            var temp = {
                gateclass: 'sg',
                gateinfor: sgate,
            }
            singlegatecontainer.push(temp)
        }
        else {
            if (sgate["gateclass"] == "ctrl") {
                ctrlsets.push(sgate)
            }
            else {
                ctrlgatesets.push(sgate)
            }
            for (var i = 0; i < ctrlsets.length; i++) {
                for (var j = 0; j < ctrlgatesets.length; j++) {
                    var ctrlindex = ctrlsets[i]["xindex"]
                    var ctrlgateindex = ctrlgatesets[j]["xindex"]
                    if (ctrlindex == ctrlgateindex) {
                        var temp = {
                            ctrl: ctrlsets[i],
                            ctrlgate: ctrlgatesets[j],
                        }
                        var tmp = {
                            gateclass: 'cg',
                            gateinfor: temp,
                        }
                        if (JSON.stringify(ctrlgatescontainer).indexOf(JSON.stringify(temp)) == -1) {
                            ctrlgatescontainer.push(tmp); // Available
                        }
                    }
                }
            }
        }
    }
    gatecontainer['sg'] = singlegatecontainer
    gatecontainer['cg'] = ctrlgatescontainer
    ctrlplace(ctrlgatescontainer)
    return gatecontainer
}
function ctrlplace(ctrlgatescontainer) {
    var xs = []
    for (var c of ctrlgatescontainer) {
        var cg = c["gateinfor"]
        console.log(cg)
        noplacement(cg["ctrl"]["xindex"], cg["ctrl"]["yindex"], cg["ctrlgate"]["yindex"])
        xs.push(cg["ctrl"]["xindex"])
    }
    placement(xs)
}

function noplacement(indexx, ctrly, ctrlgatey) {
    var droppables = document.querySelectorAll(".droppable")
    for (var drop of droppables) {
        var x = drop.getAttribute("data-cols")
        var temp = drop.parentNode
        var y = parseInt(temp.getAttribute("data-rows"))
        var check1 = (y > parseInt(ctrly) && y < parseInt(ctrlgatey))
        var check2 = (y < parseInt(ctrly) && y > parseInt(ctrlgatey))
        var allc = (check1 || check2)
        if (x == indexx && allc) {
            drop.className = "ctrlline"
            drop.removeEventListener('dragover', dragOver);
            drop.removeEventListener('dragleave', dragLeave);
            drop.removeEventListener('dragenter', dragEnter);
            drop.removeEventListener('drop', dragDrop);
        }
    }
}

function placement(indexxs) {
    var noplacements = document.querySelectorAll(".ctrlline")
    for (var nop of noplacements) {
        var x = nop.getAttribute("data-cols")
        if (indexxs.indexOf(x) == -1) {
            nop.className = "droppable rows"
            nop.addEventListener('dragover', dragOver);
            nop.addEventListener('dragleave', dragLeave);
            nop.addEventListener('dragenter', dragEnter);
            nop.addEventListener('drop', dragDrop);
        }
    }
}




// ----------------------------------------------------------------
// ----------------------------------------------------------------