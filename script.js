//------------------------Define Global Value-------------------------
//--------------------------------------------------------------------
var qvizdraw = {
    qubits: [],
    operations: [
        // {
        //     gate: 'Measure',
        //     isMeasurement: true,
        //     controls: [{ qId: 1 }],
        //     targets: [{ type: 1, qId: 1, cId: 0 }],
        // },
    ],
};
(event) => {
    event.preventDefault();
}
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

//--------------------------------------------------------------------
//--------------------------------------------------------------------


// ----------------------------------------------------------------
// ----------------------------------------------------------------
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

function parseElement(str) {
    var o = document.createElement("div");
    o.innerHTML = str;
    return o.childNodes;
}
function stringIze(obj) {
    var o = document.createElement("div");
    o.append(obj);
    return o.innerHTML;
}
// ----------------------------------------------------------------
// ----------------------------------------------------------------


//-------------------Define Button Function Start/Restart-------------
//--------------------------------------------------------------------

btn.onclick = function () {
    var rows = getrows.value
    var cols = getcols.value
    if (rows != "Rows" && cols != "Cols") {
        createcanvas(rows, cols)
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

function createcanvas(rows, cols) {
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
            droppablesvar = document.querySelectorAll('.droppable')
            qubits = document.querySelectorAll(".qubit")
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
        droppablesvar = document.querySelectorAll('.droppable')
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
        droppablesvar = document.querySelectorAll('.droppable')
        qubits = document.querySelectorAll(".qubit")
        droplisten(droppablesvar)
        qubitreverse(qubits)
        totoaldrawqc(totoalqcinfor())
    }, 0);
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
    qvizdraw["qubits"] = qubits
    setTimeout(() => {
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



// ----------------------------------------------------------------
// ----------------------------------------------------------------



// ----------------------Qubit Reverse-----------------------------
// ----------------------------------------------------------------
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
// ----------------------------------------------------------------
// ----------------------------------------------------------------




// --------------------------Dragging Function-------------------
// --------------------------------------------------------------
draggingall(draggablesvar)
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
            no.className = "noplace"
        }
    }

}
function dragEnd() {
    this.className = 'draggable';
    var nos = document.querySelectorAll(".noplace")
    for (var no of nos) {
        no.className = "ctrlline"
    }
}

function droplisten(droppables) {
    for (const droppable of droppables) {
        droppable.addEventListener('dragover', dragOver);
        droppable.addEventListener('dragleave', dragLeave);
        droppable.addEventListener('dragenter', dragEnter);
        droppable.addEventListener('drop', dragDrop);
    }
}
// let drag = document.getElementsByClassName("draggable")
// console.dir(drag[0].getBoundingClientRect());
function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' drag-over';
}

function dragLeave(e) {
    e.preventDefault();
    this.className = 'droppable row';
}

function dragDrop(e) {
    e.preventDefault();
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


function drawQC() {
    if (typeof qviz != 'undefined') {
        var sampleDiv = document.getElementById('qvizdraw');
        qviz.draw(qvizdraw, sampleDiv, qviz.STYLES['Default']);
    }
}


function GetAxis(draggables) {
    var gateinformation = []
    for (var i = 0; i < draggables.length; i++) {
        var dragging = draggables[i]
        var gate = dragging.getAttribute("id")
        if (gate.length > 4) {
            gate = gate[gate.length - 1]
        }
        var pcol = dragging.parentNode;
        var prow = pcol.parentNode;
        var xi = pcol.getAttribute("data-cols");
        var yi = prow.getAttribute("data-rows");
        var control = dragging.getAttribute("data-control");
        var arr = { xindex: xi, yindex: yi, gateclass: gate, iscontrol: control };
        if (xi != null) {
            gateinformation.push(arr)
        }
    }
    return gateinformation
}

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
    console.log(inforcontainer)
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
    console.log(qvizdraw["operations"])
    drawQC()
}
// for (var i = 0; i < inforcontainer.length; i++) {
//     for (var j = 0; j < inforcontainer[i]["gates"].length; j++) {

//     }
// }
function totoalqcinfor() {
    var gatecontainer =
    {
        sg: {},
        cg: {},
    }
    var draggables = document.querySelectorAll(".draggable")
    var gateinformation = GetAxis(draggables)
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
    banplace(ctrlgatescontainer)
    return gatecontainer
}
function banplace(ctrlgatescontainer) {
    var xs = []
    for (var c of ctrlgatescontainer) {
        var cg = c["gateinfor"]
        console.log(cg)
        noplace(cg["ctrl"]["xindex"], cg["ctrl"]["yindex"], cg["ctrlgate"]["yindex"])
        xs.push(cg["ctrl"]["xindex"])
    }
    place(xs)
}

function noplace(indexx, ctrly, ctrlgatey) {
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
        }
    }
}

function place(indexxs) {
    var noplaces = document.querySelectorAll(".ctrlline")
    for (var nop of noplaces) {
        var x = nop.getAttribute("data-cols")
        if (indexxs.indexOf(x) == -1) {
            nop.className = "droppable rows"
        }
    }
}

// ----------------------------------------------------------------
// ----------------------------------------------------------------