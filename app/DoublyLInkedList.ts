/**
* This class handles linked list operations for cycle nodes.
*
* @author Ben Forman
* @author Matthew Joyce
* 
* @reference https://github.com/vovazolotoy/TypeScript-STL/blob/master/Datastructures/DoublyLinkedList.ts
*/
import {CycleNode} from "./cycle-node";

export class DoublyLinkedList {

    private length = 0;
    private cursor:CycleNode = null;
    private head:CycleNode = null;
    
	
	/**
	* Need for implementation but does nothing.
	*
	*/
    constructor() {
    }
  

	/**
	* insert()
	*
	* inserts on e register-node into the linked list. If the list in empty the node set to cursor else
	* the node is set at the end of the list.
	*
	* @param: node - current node being inserted into the list
	*/
    public insert(node:CycleNode)
    {
		if (this.isEmpty())
        {
            this.head = node;
            this.cursor = this.head;
        }
        else
        {
            node.previous = this.cursor;
            this.cursor.next = node;
            this.cursor = node;
        }
		length++;
    }

	
	/*
	* next()
    *
	* Gets the next node in the linked list.
	* 
	* @return boolean - true if current was set to the next node in the list.
    */
	public next():boolean
	{
		if (this.cursor.next != null)
		{
			this.cursor = this.cursor.next;
			return true;
		}
		return false;
	}
	
	
	/**
	* previous()
	*
	* Sets current to the previous node.
	*
	* @return boolean - true if current is set to previous
	*/
	public previous():boolean
	{
		if (this.cursor.previous != null && this.cursor != this.head)
		{
			this.cursor = this.cursor.previous;
			return true;
		}
		return false;
    }
	
	/*
	* getCurrent
	*
	* Accessor method for the current node.
	*
	* @return register-node
	*/
	public getCurrent():CycleNode
	{
		if (this.cursor != null)
		{
			return this.cursor;
		}
		return null;
	}
	
	
	public getHead():CycleNode
	{
		if (this.head != null)
		{
			return this.head;
		}
		return null;
	}
	
    /*
	* getLength()
	*
	* Accessor for the current length of the linked list.
    *
	* @return number
	*/
    public getLength():number{
        return length;
    }

	/*
	* isEmpty
	*
	* Returns if the linked list is empty or contains nodes.
	* 
	* @return boolean - true if length is 0.
	*/
	public isEmpty():boolean{
        if (length == 0){
            return true;
        }
        return false;
    }

}



