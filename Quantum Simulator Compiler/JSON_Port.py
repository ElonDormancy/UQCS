import json
import copy
import numpy as np
from ControlGate import Control_Gate
from SingleGate import Single_Gate

def read_json(path):
    f=  open(path,"r")
    c = f.read()
    content = json.loads(c)
    f.close()
    return  Load_Init_Qubits(content),Load_Gate_Sets(content)

def Load_Init_Qubits(content):
    return list(map(lambda i:int(i),content["init_qubits"]))
def Load_Gate_Sets(gate_sets):
    sets = copy.deepcopy(gate_sets)
    cir = []
    gate_timing = []
    single_gate_sets = sets["single_gate_sets"]
    control_gate_sets = sets["control_gate_sets"]
    for sg in single_gate_sets:
        order_sg = int(sg["cols"])
        sg_infor={
            "order":order_sg,
            "rows":"",
            "gate_infor":"",
            "whether_control":False,
            }
        sg_infor["rows"] = int(sg["rows"])
        sg_infor["gate_infor"] = sg["gateclass"]
        gate_timing.append(sg_infor)
    for cg in control_gate_sets:
        order_cg = int(cg["ctrl"]["cols"])
        cg_infor={
            "order":order_cg,
            "gate_infor":"",
            "whether_control":True,
        }
        cg_infor["gate_infor"] = cg
        gate_timing.append(cg_infor)
    return sorted(gate_timing, key = lambda i: i['order'])

def Apply_Gate_Sets(init_state,gate_timing):
    q = init_state
    cir= []
    for gate in gate_timing:
        if(gate["whether_control"]):
            ctrl = int(gate["gate_infor"]["ctrl"]["rows"])
            targ= int(gate["gate_infor"]["ctrlgate"]["rows"])
            gateclass = gate["gate_infor"]["ctrlgate"]["gateclass"]
            q,cir = Control_Gate(q,ctrl,targ,gateclass,cir)
        else:
            q,cir = Single_Gate(q,gate["rows"],gate['gate_infor'],cir)
    return q,cir
