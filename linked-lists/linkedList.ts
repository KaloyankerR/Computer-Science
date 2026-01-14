class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    head: any;
    tail: any;
    length: number;

    constructor(value) {
      this.head = {
        value: value,
        next: null
      };

      this.tail = this.head;
      this.length = 1;
    }
    
    append(value) {
      let newNode = new Node(value);

      this.tail.next = newNode;
      this.tail = newNode;
      this.length++;
      return this;
    }

    prepend(value) {
        let newNode = new Node(value, this.head);
  
        this.head = newNode;
        this.length++;
        return this;

    }
    
    insert(index, value) {
        if (index >= this.length) {
            return this.append(value);
        }
        if (index === 0) {
            return this.prepend(value);
        }

        let newNode = new Node(value);
        let leader = this.head;

        for (let i = 0; i < index; i++) {
            leader = leader.next;
        }

        let holdingPointer = leader.next;
        leader.next = newNode;
        newNode.next = holdingPointer;

        this.length++;
        return this;
    }

    traverseToIndex(index) {
        let counter = 0;
        let currentNode = this.head;
        while(counter !== index) {
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode;
    }

    remove(index) {
        let leader = this.traverseToIndex(index);
        let unwantedNode = leader.next;
        leader.next = unwantedNode.next;
        this.length--;
        return this;
    }
    
    printList() {
        let array = [];
        let currentNode = this.head;
        while(currentNode !== null) {
            array.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return array;
    }

    reverse() {
        if (!this.head.next) {
            return this.head;
        }

        let first = this.head;
        this.tail = this.head;
        let second = first.next;

        while (second) {
            const temp = second.next;
            second.next = first;
            first = second;
            second = temp;
        }

        this.head.next = null;
        this.head = first;
        return this.printList();
    }

  }
  
  let myLinkedList = new LinkedList(10);
  myLinkedList.append(5);
  myLinkedList.append(16);
  
  
  
  