/**
* This class handles linked list operations for cycle nodes.
*
* @author Ben Forman
* @author Matthew Joyce
* 
* @reference https://github.com/vovazolotoy/TypeScript-STL/blob/master/Datastructures/DoublyLinkedList.ts
*/
import {register-node} from "CHANGE_ME";

class DoublyLinkedList {

    private length = 0;
    private cursor:register-node = null;
    private head:register-node = null;
    
	
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
    public insert(node:register-node)
    {
		if (isEmpty())
        {
            head = node;
            cursor = head;
        }
        else
        {
            node.previous = cursor;
            cursor.next = node;
            cursor = node;
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
		if (current.next != null)
		{
			current = current.next;
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
		if (current.previous != null && current != head)
		{
			current = current.previous;
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
	public getCurrent():register-node
	{
		if (cursor != null)
		{
			return current;
		}
		return null;
	}
	
	
	public getHead():register-node
	{
		if (head != null)
		{
			return head;
		}
		return null;
	}
	
    /*
	* getLength()
	*
	* Accessor for the current length of the linked list.
    *
	* @return int
	*/
    public getLength():int{
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


