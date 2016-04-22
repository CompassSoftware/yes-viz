"use strict";
/**
* This class handles linked list operations for cycle nodes.
*
* @author Ben Forman
* @author Matthew Joyce
*
* @reference https://github.com/vovazolotoy/TypeScript-STL/blob/master/Datastructures/DoublyLinkedList.ts
*/
var cycle_node_1 = require("./cycle-node");
var DoublyLinkedList = (function () {
    /**
    * Need for implementation but does nothing.
    *
    */
    function DoublyLinkedList() {
        this.length = 0;
        this.cursor = null;
        this.head = null;
    }
    DoublyLinkedList.prototype.test = function () {
        return "<p>" + "Bob Saget" + "</p>";
    };
    /**
    * insert()
    *
    * inserts on e register-node into the linked list. If the list in empty the node set to cursor else
    * the node is set at the end of the list.
    *
    * @param: node - current node being inserted into the list
    */
    DoublyLinkedList.prototype.insert = function (node) {
        if (this.isEmpty()) {
            this.head = node;
            this.cursor = this.head;
        }
        else {
            node.previous = this.cursor;
            this.cursor.next = node;
            this.cursor = node;
        }
        length++;
    };
    /*
    * next()
    *
    * Gets the next node in the linked list.
    *
    * @return boolean - true if current was set to the next node in the list.
    */
    DoublyLinkedList.prototype.next = function () {
        if (this.cursor.next != null) {
            this.cursor = this.cursor.next;
            return true;
        }
        return false;
    };
    /**
    * previous()
    *
    * Sets current to the previous node.
    *
    * @return boolean - true if current is set to previous
    */
    DoublyLinkedList.prototype.previous = function () {
        if (this.cursor.previous != null && this.cursor != this.head) {
            this.cursor = this.cursor.previous;
            return true;
        }
        return false;
    };
    /*
    * getCurrent
    *
    * Accessor method for the current node.
    *
    * @return register-node
    */
    DoublyLinkedList.prototype.getCurrent = function () {
        if (this.cursor != null) {
            return this.cursor;
        }
        return null;
    };
    DoublyLinkedList.prototype.getHead = function () {
        if (this.head != null) {
            return this.head;
        }
        return null;
    };
    /*
    * getLength()
    *
    * Accessor for the current length of the linked list.
    *
    * @return number
    */
    DoublyLinkedList.prototype.getLength = function () {
        return length;
    };
    /*
    * isEmpty
    *
    * Returns if the linked list is empty or contains nodes.
    *
    * @return boolean - true if length is 0.
    */
    DoublyLinkedList.prototype.isEmpty = function () {
        if (length == 0) {
            return true;
        }
        return false;
    };
    return DoublyLinkedList;
}());
;
var Llist = new DoublyLinkedList();
var wNode = new cycle_node_1.CycleNode("1");
wNode.setf("fack");
Llist.insert(wNode);
document.body.innerHTML = wNode.getf();
