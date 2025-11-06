# Namespace

> A container for grouping identifiers to prevent naming conflicts and organize code logically.

---

## 💡 Core Idea

### What & Why

A namespace is a container that holds identifiers like variables, functions, classes, and interfaces, preventing name collisions when the same identifier is used in different contexts. Think of it like a directory in a file system - two files named `config.txt` can exist in different directories without conflict.

**Problem it solves:** In large projects using multiple libraries, different developers might create functions or classes with identical names, causing conflicts. Namespaces allow the same identifier to exist multiple times without interference.

**Why it's important:** Improves code organization, enhances readability, prevents naming conflicts, and facilitates code reuse across large applications.

### 🔑 Terminology & Prerequisites

**Key Terms:**
- **Identifier**: Name given to a variable, function, class, or other code element
- **Scope**: Region of code where an identifier is accessible
- **Naming Collision**: When two identifiers have the same name in the same scope
- **Qualified Name**: Full path to an identifier including its namespace (e.g., `std::cout`)

**Prerequisites:**
- Basic understanding of variables, functions, and classes
- Familiarity with code organization concepts
- Understanding of scope in programming

---

## 🔨 Implementation Details

### How It Works

Namespaces create separate contexts for identifiers - like how two companies can both have an employee #123 without conflict because each company serves as its own namespace.

**Core Mechanism:**
1. Define a namespace with a unique name
2. Place related code elements inside the namespace
3. Access elements using qualified names or import statements
4. Nested namespaces create hierarchical organization

### Key Properties

- **Prevent collisions**: Same name can exist in different namespaces
- **Logical grouping**: Related functionality organized together
- **Hierarchical**: Namespaces can nest to form namespace trees
- **Compile-time construct**: Resolved during compilation (in most languages)

---

## 🌐 Language Comparison

| Aspect | C++ | Python | Java | TypeScript | Go | PHP |
|--------|-----|--------|------|------------|----|----|
| **Keyword** | `namespace` | Implicit (modules) | `package` | `namespace` | `package` | `namespace` |
| **Syntax** | `namespace Name { }` | File/directory = module | `package com.example;` | `namespace Name { }` | `package name` | `namespace Name;` |
| **Access Operator** | `::` | `.` | `.` | `.` | `.` | `\` |
| **Native Support** | Yes | Yes (via modules) | Yes (packages) | Yes | Yes (packages) | Yes (5.3+) |
| **Nesting** | Yes | Yes | Yes (hierarchical) | Yes | Via subdirectories | Yes |
| **File Structure** | Multiple files per namespace | 1 file = 1 module | 1 directory = 1 package | Multiple files | 1 directory = 1 package | Multiple files |

### Code Examples

**C++:**
```cpp
#include <iostream>

namespace Math {
    int add(int a, int b) {
        return a + b;
    }
}

namespace Physics {
    int add(int force1, int force2) {
        return force1 + force2;
    }
}

int main() {
    std::cout << Math::add(5, 3) << std::endl;      // 8
    std::cout << Physics::add(10, 20) << std::endl; // 30
    
    // Using declaration
    using Math::add;
    std::cout << add(2, 2) << std::endl;  // 4 (from Math)
}
```

**Python:**
```python
# math_utils.py
def add(a, b):
    return a + b

# physics_utils.py  
def add(force1, force2):
    return force1 + force2

# main.py
import math_utils
import physics_utils

print(math_utils.add(5, 3))      # 8
print(physics_utils.add(10, 20)) # 30

# Alias import
import math_utils as mu
print(mu.add(2, 2))  # 4
```

**Java:**
```java
// File: com/example/math/Calculator.java
package com.example.math;

public class Calculator {
    public static int add(int a, int b) {
        return a + b;
    }
}

// File: com/example/physics/Calculator.java
package com.example.physics;

public class Calculator {
    public static int add(int force1, int force2) {
        return force1 + force2;
    }
}

// File: Main.java
import com.example.math.Calculator;
// or: import com.example.physics.Calculator as PhysicsCalc;

public class Main {
    public static void main(String[] args) {
        System.out.println(Calculator.add(5, 3));  // 8
        System.out.println(com.example.physics.Calculator.add(10, 20)); // 30
    }
}
```

**TypeScript:**
```typescript
namespace Math {
    export function add(a: number, b: number): number {
        return a + b;
    }
}

namespace Physics {
    export function add(force1: number, force2: number): number {
        return force1 + force2;
    }
}

console.log(Math.add(5, 3));      // 8
console.log(Physics.add(10, 20)); // 30

// Alias
import MathOps = Math;
console.log(MathOps.add(2, 2));   // 4
```

**Go:**
```go
// File: math/calculator.go
package math

func Add(a int, b int) int {
    return a + b
}

// File: physics/calculator.go
package physics

func Add(force1 int, force2 int) int {
    return force1 + force2
}

// File: main.go
package main

import (
    "fmt"
    "myproject/math"
    "myproject/physics"
)

func main() {
    fmt.Println(math.Add(5, 3))      // 8
    fmt.Println(physics.Add(10, 20)) // 30
}
```

**PHP:**
```php
<?php
// File: Math.php
namespace Math;

function add($a, $b) {
    return $a + $b;
}

// File: Physics.php
namespace Physics;

function add($force1, $force2) {
    return $force1 + $force2;
}

// File: main.php
require 'Math.php';
require 'Physics.php';

echo Math\add(5, 3) . "\n";      // 8
echo Physics\add(10, 20) . "\n"; // 30

// Using statement
use Math\add;
echo add(2, 2) . "\n";  // 4
?>
```

---

## 🔬 Analysis & Use Cases

### Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| **Name Resolution** | O(1) | O(1) |
| **Namespace Lookup** | O(1) to O(log n) | O(n) |
| **Import/Using Declaration** | O(1) | O(1) |

*Note: Namespaces are typically resolved at compile-time, so runtime overhead is minimal to none.*

### Practical Use Cases

**When to use namespaces:**
- **Large codebases**: Organizing thousands of identifiers across multiple modules
- **Library development**: Creating reusable code that won't conflict with user code or other libraries
- **Team projects**: Multiple developers working on different features without name collisions
- **Third-party integration**: Preventing conflicts between internal code and external libraries
- **API versioning**: Creating separate namespaces for different API versions (e.g., `v1`, `v2`)

**When NOT to use:**
- Small scripts or single-file programs
- When unnecessary nesting makes code harder to read
- When modules already provide sufficient organization (modern approach)

### Trade-offs

| Pros | Cons |
|------|------|
| ✅ Prevents naming conflicts | ❌ Can make code more verbose |
| ✅ Improves code organization | ❌ Deeply nested namespaces reduce readability |
| ✅ Enables code reusability | ❌ Learning curve for proper usage |
| ✅ Isolates resources for security | ❌ Namespace pollution if overused (e.g., `using namespace std`) |
| ✅ Facilitates modular design | ❌ Can become complex in large systems |

---

## 🔗 Quick Review

**Key Facts:**
- Namespaces are containers that prevent naming conflicts by grouping related identifiers
- C++ uses `::` to access namespace members, Python uses `.`, PHP uses `\`
- Namespaces can be nested hierarchically for better organization
- TypeScript: Modern code prefers ES modules over namespaces, but namespaces useful for legacy code
- Go: Packages serve as namespaces - one directory = one package, cannot have circular imports

**Properties at a Glance:**
- Compile-time resolution: Yes (most languages)
- Runtime overhead: Minimal/None
- Hierarchical: Yes
- Supports aliasing: Yes
- File-scoped: Depends on language

**Common Interview Questions:**
- How do namespaces prevent naming collisions?
- What's the difference between namespaces and classes?
- Why is `using namespace std;` considered bad practice in C++?
- How do Java packages differ from C++ namespaces?

### Further Reading

- [C++ Namespaces - cppreference.com](https://en.cppreference.com/w/cpp/language/namespace)
- [Python Modules and Packages - Official Docs](https://docs.python.org/3/tutorial/modules.html)
- [TypeScript Namespaces vs Modules](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html) - Understanding when to use namespaces vs ES modules
- [Go Packages](https://go.dev/blog/package-names) - Best practices for Go package design

---

## 📌 Related Topics

- Modules and Package Management
- Scope and Lifetime
- Name Resolution and Lookup Rules
- Code Organization Patterns
- Dependency Management