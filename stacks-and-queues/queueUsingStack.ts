class MyQueue {
    private inputStack: number[];
    private outputStack: number[];
    
    constructor() {
        this.inputStack = [];
        this.outputStack = [];
    }

    push(x: number): void {
        this.inputStack.push(x);
    }

    pop(): number {
        this.moveInputToOutput();
        return this.outputStack.pop()!;
    }

    peek(): number {
        this.moveInputToOutput();
        return this.outputStack[this.outputStack.length - 1];
    }

    empty(): boolean {
        return this.inputStack.length === 0 && this.outputStack.length === 0;
    }

    private moveInputToOutput(): void {
        if (this.outputStack.length === 0) {
            while (this.inputStack.length > 0) {
                this.outputStack.push(this.inputStack.pop()!);
            }
        }
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */