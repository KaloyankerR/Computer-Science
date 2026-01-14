# Language Execution Models

> Methods by which programming languages translate and execute code - from compilation to interpretation to hybrid approaches.

---

## 💡 Core Idea

### What & Why

Programming languages use different execution models to translate human-readable code into machine-executable instructions. The four primary models are: **compiled**, **interpreted**, **JIT-compiled**, and **transpiled**. Each has distinct trade-offs between performance, portability, development speed, and flexibility.

**Problem they solve:** Computers only understand binary machine code (1s and 0s), but developers write in high-level languages. Execution models bridge this gap through different translation strategies.

**Why it matters:** Choosing the right language and execution model impacts application performance, development speed, portability, and deployment complexity.

### 🔑 Terminology & Prerequisites

**Key Terms:**
- **Machine Code**: Binary instructions (1s and 0s) that a CPU can execute directly
- **Source Code**: Human-readable code written in a programming language
- **Bytecode**: Intermediate representation between source code and machine code
- **Runtime**: Environment in which a program executes
- **Ahead-of-Time (AOT)**: Compilation before program execution
- **Build Step**: Process of converting source code into executable form

**Prerequisites:**
- Basic understanding of how computers execute instructions
- Familiarity with at least one programming language
- Concept of abstraction levels (high-level vs low-level)

---

## 🔨 Implementation Details

### 1. Compiled Languages

**How it works:**
1. Write source code in high-level language
2. Compiler translates entire program to machine code (one-time process)
3. Produces executable binary file
4. Binary runs directly on target CPU architecture

**Characteristics:**
- Translation happens **before** execution
- Produces platform-specific executables
- Requires separate compilation for each target platform
- No compiler needed at runtime

### 2. Interpreted Languages

**How it works:**
1. Write source code in high-level language
2. Interpreter reads source code line-by-line
3. Translates and executes each instruction immediately
4. Process repeats every time program runs

**Characteristics:**
- Translation happens **during** execution
- No separate compilation step
- Interpreter must be present at runtime
- Platform-independent source code

### 3. JIT-Compiled Languages (Hybrid)

**How it works:**
1. Source code compiled to intermediate bytecode (AOT)
2. At runtime, bytecode is interpreted initially
3. JIT compiler profiles code execution
4. Frequently-used "hot" code paths compiled to machine code
5. Compiled code cached for reuse

**Characteristics:**
- Combines interpretation + compilation
- Optimizes based on runtime profiling data
- Balances startup time vs peak performance
- Platform-independent bytecode

### 4. Transpiled Languages

**How it works:**
1. Write source code in high-level language A
2. Transpiler converts to equivalent code in high-level language B
3. Output code then follows language B's execution model
4. Often includes type erasure or syntax transformation

**Characteristics:**
- Source-to-source translation
- Same abstraction level (high-level → high-level)
- Output language determines final execution model
- Often used for language features or compatibility

---

## 🌐 Language Comparison

| Aspect | Compiled | Interpreted | JIT-Compiled | Transpiled |
|--------|----------|-------------|--------------|------------|
| **Translation Time** | Before execution | During execution | During execution | Before execution |
| **Speed** | Fastest | Slowest | Fast (after warmup) | Depends on target |
| **Startup Time** | Instant | Fast | Slow (warmup) | Depends on target |
| **Portability** | Low (binary) | High (source) | High (bytecode) | High (source) |
| **Memory Usage** | Low | Low | High | Depends on target |
| **Optimization** | Static | None | Dynamic + Static | Depends on target |
| **Debugging** | Harder | Easier | Moderate | Easy with source maps |
| **Examples** | C, C++, Rust, Go | Python, Ruby, PHP | Java, C#, JavaScript | TypeScript, Babel |

### Code Examples

**Compiled (C++):**
```cpp
// hello.cpp
#include <iostream>
int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}

// Compilation:
// g++ hello.cpp -o hello     (produces binary)
// ./hello                     (runs binary)
```

**Interpreted (Python):**
```python
# hello.py
def greet(name):
    print(f"Hello, {name}!")

greet("World")

# Execution:
# python hello.py            (interpreter runs directly)
```

**JIT-Compiled (Java):**
```java
// Hello.java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}

// Compilation + Execution:
// javac Hello.java           (compiles to bytecode)
// java Hello                 (JVM interprets + JIT compiles)
```

**Transpiled (TypeScript):**
```typescript
// hello.ts
interface Person {
    name: string;
    age: number;
}

function greet(person: Person): void {
    console.log(`Hello, ${person.name}!`);
}

greet({ name: "World", age: 2025 });

// Transpilation + Execution:
// tsc hello.ts               (transpiles to JavaScript)
// node hello.js              (Node.js runs JavaScript)
```

---

## 🔬 Analysis & Use Cases

### Performance Comparison

| Metric | Compiled | Interpreted | JIT-Compiled | Transpiled |
|--------|----------|-------------|--------------|------------|
| **Peak Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | Varies |
| **Startup Speed** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | Varies |
| **Development Speed** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Cross-Platform** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

### Practical Use Cases

**Compiled Languages:**
- Operating systems and kernels (Linux, Windows)
- Device drivers and embedded systems
- Game engines (Unreal, Unity core)
- Performance-critical applications (databases, compilers)
- System utilities and CLI tools

**Interpreted Languages:**
- Rapid prototyping and scripting
- Web development backends (Django, Rails)
- Data analysis and science (Python with NumPy)
- Configuration and automation scripts
- Teaching programming fundamentals

**JIT-Compiled Languages:**
- Enterprise applications (Java EE, .NET)
- Android applications (Java/Kotlin)
- Web browsers executing JavaScript
- Long-running server applications
- Cloud-based microservices

**Transpiled Languages:**
- Modern web development (TypeScript, Babel)
- Cross-platform mobile (React Native)
- Language feature adoption (ES6+ → ES5)
- Type safety for dynamic languages
- Legacy codebase modernization

### Trade-offs

| Model | Pros | Cons |
|-------|------|------|
| **Compiled** | ✅ Maximum performance<br>✅ No runtime dependencies<br>✅ Optimized for specific hardware | ❌ Platform-specific binaries<br>❌ Slower development cycle<br>❌ Rebuild required for changes |
| **Interpreted** | ✅ Cross-platform source code<br>✅ Fast iteration/testing<br>✅ Dynamic features easier | ❌ Slower execution<br>❌ Runtime interpreter required<br>❌ No compile-time optimization |
| **JIT-Compiled** | ✅ Platform-independent bytecode<br>✅ Dynamic optimization<br>✅ Good peak performance | ❌ Slow startup (warmup time)<br>❌ High memory usage<br>❌ Unpredictable performance |
| **Transpiled** | ✅ Modern language features<br>✅ Leverage existing ecosystems<br>✅ Easy debugging | ❌ Additional build step<br>❌ Output code readability<br>❌ Dependent on target language |

---

## 🔗 Quick Review

**Key Facts:**
- **Compiled**: Translates entire program to machine code before execution (C, C++, Rust, Go)
- **Interpreted**: Translates and executes code line-by-line at runtime (Python, Ruby, PHP)
- **JIT-Compiled**: Combines interpretation + runtime compilation for optimization (Java, C#, JavaScript)
- **Transpiled**: Converts between high-level languages at same abstraction level (TypeScript → JavaScript)
- Most languages aren't purely one model - CPython compiles to bytecode then interprets it
- JavaScript engines use JIT compilation despite being "interpreted" languages

**Common Misconceptions:**
- "Python is interpreted" - CPython compiles to bytecode first, then interprets
- "Java is compiled" - Java compiles to bytecode, then JIT-compiles at runtime
- Languages aren't inherently compiled/interpreted - it's the implementation that matters

**Interview Topics:**
- Why are compiled languages generally faster than interpreted ones?
- How does JIT compilation improve performance over interpretation?
- When would you choose a transpiled language over native implementation?
- What's the difference between compilation and transpilation?

### Further Reading

- [JIT Compilation Explained - FreeCodeCamp](https://www.freecodecamp.org/news/just-in-time-compilation-explained/) - Deep dive into how JIT compilers work
- [Source-to-Source Compiler - Wikipedia](https://en.wikipedia.org/wiki/Source-to-source_compiler) - Comprehensive overview of transpilation
- [Compiled vs Interpreted Languages - Baeldung](https://www.baeldung.com/cs/compiled-vs-interpreted-languages) - Detailed comparison with diagrams
- [Python's Execution Model](https://docs.python.org/3/reference/executionmodel.html) - How Python bytecode and PVM work

---

## 📌 Related Topics

- Bytecode and Intermediate Representations
- Virtual Machines (JVM, CLR, PVM)
- Compiler Design and Optimization
- LLVM and Modern Compiler Infrastructure
- WebAssembly (Wasm)
- Ahead-of-Time (AOT) Compilation