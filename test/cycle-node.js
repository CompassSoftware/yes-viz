"use strict";
var CycleNode = (function () {
    function CycleNode(cycleNum) {
        //stat, icode, valE, valM, dstE, dstM
        this.w = ["", "", "", "", "", ""];
        //stat, icode, Cnd, valE, valA, dstE, dstM
        this.m = ["", "", "", "", "", "", ""];
        //stat, icode, ifun, valC, valA, valB, dstE, dstM, srcA, srcB
        this.e = ["", "", "", "", "", "", "", "", "", ""];
        //stat, icode, ifun, rA, rB, valC, valP
        this.d = ["", "", "", "", "", "", ""];
        this.cycleNum = cycleNum;
    }
    CycleNode.prototype.getf = function () {
        return this.f;
    };
    CycleNode.prototype.setf = function (f) {
        this.f = f;
    };
    return CycleNode;
}());
exports.CycleNode = CycleNode;
