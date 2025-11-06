# Garbage Collection

> Automatic memory management technique that reclaims memory occupied by objects no longer in use.

---

## 💡 Core Idea

### What & Why

**Garbage Collection (GC)** is an automatic memory management system that identifies and reclaims memory occupied by objects that are no longer reachable or referenced by a program. Invented by John McCarthy in 1959 for Lisp, GC eliminates the need for manual memory deallocation.

**Problem it solves:** Manual memory management in languages like C/C++ is error-prone, leading to:
- **Memory leaks**: Forgetting to free allocated memory
- **Dangling pointers**: Accessing memory after it's been freed
- **Double-free errors**: Freeing the same memory twice
- **Use-after-free**: Using pointers to deallocated memory

**Why it matters:** GC automates memory management, preventing common bugs, improving developer productivity, and enabling focus on application logic rather than memory bookkeeping.

### 🔑 Terminology & Prerequisites

**Key Terms:**
- **Heap**: Memory region where objects are dynamically allocated
- **Root Set**: Starting points for reachability analysis (stack variables, global variables, CPU registers)
- **Reachable Object**: Object accessible through references from root set
- **Live Object**: Object still in use by the program
- **Garbage**: Objects no longer reachable or referenced
- **Stop-the-World (STW)**: Pausing program execution during GC
- **Generational Hypothesis**: Most objects die young; few survive long
- **Compaction**: Rearranging memory to eliminate fragmentation

**Prerequisites:**
- Understanding of memory allocation (stack vs heap)
- Concept of pointers and references
- Basic knowledge of data structures (graphs, trees)
- Familiarity with program execution lifecycle

---

## 🔨 Implementation Details

### Core GC Phases

Most GC algorithms follow a similar pattern:

**1. Identification**
- Determine which objects are reachable (live)
- Identify unreachable objects (garbage)

**2. Reclamation**
- Free memory occupied by garbage objects
- Return memory to allocation pool

**3. Optional: Compaction**
- Reorganize memory to reduce fragmentation
- Improve cache locality and allocation speed

### How Reachability Works

```
Root Set (Stack, Globals, Registers)
        ↓
   [Object A] ──→ [Object B] ──→ [Object C]
        ↓
   [Object D] ──→ [Object E]

Unreachable: [Object F] ──→ [Object G]
             ↑_______________|
             (Cycle - still garbage)
```

**Reachable:** A, B, C, D, E (can be reached from roots)  
**Garbage:** F, G (unreachable, even though they reference each other)

---

## 🌐 Algorithm Comparison

| Algorithm | Type | Pauses | Handles Cycles | Fragmentation | Memory Overhead |
|-----------|------|--------|----------------|---------------|-----------------|
| **Reference Counting** | Direct | No (incremental) | ❌ No | Medium | High (counters) |
| **Mark-and-Sweep** | Tracing | Yes (STW) | ✅ Yes | High | Low |
| **Mark-and-Compact** | Tracing | Yes (STW) | ✅ Yes | None | Low |
| **Copying/Cheney** | Tracing | Yes (STW) | ✅ Yes | None | High (2x space) |
| **Generational** | Hybrid | Partial (minor/major) | ✅ Yes | Low | Moderate |
| **Incremental** | Tracing | Multiple small | ✅ Yes | Varies | Moderate |
| **Concurrent** | Tracing | Minimal | ✅ Yes | Varies | High |

### Algorithm Details

### 1. Reference Counting

**How it works:**
- Each object has a counter tracking number of references
- Counter increments when reference created
- Counter decrements when reference destroyed
- Object freed when count reaches zero

**Pseudocode:**
```
// On assignment: obj_ref = new_obj
increment_ref_count(new_obj)
decrement_ref_count(old_obj)
if old_obj.ref_count == 0:
    free(old_obj)

// On scope exit
for each local_var:
    decrement_ref_count(local_var)
    if local_var.ref_count == 0:
        free(local_var)
```

**Used by:** CPython, Swift, Objective-C (ARC), PHP, Perl

### 2. Mark-and-Sweep

**How it works:**
- **Mark Phase**: Traverse from root set, mark all reachable objects
- **Sweep Phase**: Scan heap, free all unmarked objects

**Pseudocode:**
```
// Mark Phase
Mark(root):
    if root.marked == false:
        root.marked = true
        for each ref in root.references:
            Mark(ref)

// Sweep Phase
Sweep():
    for each object in heap:
        if object.marked == true:
            object.marked = false  // Reset for next cycle
        else:
            heap.free(object)
```

**Used by:** Early JVMs, Ruby (Mark & Sweep variant), V8 (older versions)

### 3. Mark-and-Compact

**How it works:**
- Mark phase same as Mark-and-Sweep
- **Compact Phase**: Move all live objects together, eliminating gaps

**Benefits:** Eliminates fragmentation, improves cache locality

**Used by:** Modern JVMs (for old generation), .NET CLR

### 4. Copying / Cheney's Algorithm

**How it works:**
- Divide heap into two semi-spaces (from-space, to-space)
- Allocate objects in from-space
- During GC: copy live objects to to-space
- Swap spaces (to-space becomes new from-space)

**Trade-off:** Uses 2x memory but very fast allocation (bump pointer)

**Used by:** Early Lisp implementations, nursery in generational collectors

### 5. Generational GC

**How it works:**
- Divide heap into generations (Young, Old, sometimes Permanent)
- **Young Generation (Gen 0)**: New objects allocated here
- **Old Generation (Gen 1/2)**: Long-lived objects promoted here
- Collect young generation frequently (minor GC)
- Collect old generation rarely (major GC)

**Based on:** Weak Generational Hypothesis - most objects die young

**Pseudocode:**
```
// Minor GC (Young Generation)
YoungGC():
    for each object in young_gen:
        if reachable from roots or old_gen:
            if survived N collections:
                promote_to_old_gen(object)
            else:
                copy_to_survivor_space(object)
    clear young_gen

// Major GC (Full Collection)
FullGC():
    mark_and_sweep_all_generations()
```

**Used by:** JVM (G1GC, ZGC), .NET CLR, V8 JavaScript, Go

---

## 🔬 Analysis & Use Cases

### Performance Metrics

| Metric | Reference Counting | Mark-Sweep | Generational |
|--------|-------------------|------------|--------------|
| **Pause Time** | None (incremental) | 100-500ms (STW) | 1-10ms (minor), 100ms+ (major) |
| **Throughput** | Lower (overhead) | Medium | Higher |
| **Memory Usage** | 1x + counters | 1x | 1.5-2x |
| **Latency** | Consistent | Spiky | Mostly consistent |

### Time & Space Complexity

| Algorithm | Time (Per Collection) | Space Overhead |
|-----------|----------------------|----------------|
| **Reference Counting** | O(n) updates per mutation | O(n) counters |
| **Mark-and-Sweep** | O(live) mark + O(heap) sweep | O(1) per object |
| **Copying** | O(live) | O(2 × heap) |
| **Generational** | O(young) minor, O(total) major | O(1.5 × heap) |

### Practical Use Cases

**Reference Counting:**
- Systems requiring deterministic finalization (resource cleanup)
- Real-time systems with predictable response times
- Embedded systems with limited resources
- Languages needing C/C++ interoperability (Swift, Objective-C)

**Mark-and-Sweep:**
- Simple runtime systems
- Languages with small object graphs
- Academic implementations
- Cycle detection in ref-counting systems

**Generational GC:**
- Long-running server applications (Java EE, .NET services)
- Interactive applications (desktop GUIs, games)
- Web browsers (JavaScript engines)
- Applications with typical object lifetime patterns

**Concurrent/Parallel GC:**
- High-throughput servers requiring low latency
- Financial trading systems
- Real-time game servers
- Large-scale data processing

### Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| **Reference Counting** | ✅ Immediate reclamation<br>✅ No pauses<br>✅ Predictable timing<br>✅ Simple to implement | ❌ Can't handle cycles<br>❌ High overhead per operation<br>❌ Cache-unfriendly<br>❌ Multithread synchronization cost |
| **Mark-and-Sweep** | ✅ Handles cycles<br>✅ Low per-operation overhead<br>✅ Simple algorithm | ❌ Stop-the-world pauses<br>❌ Memory fragmentation<br>❌ Poor cache locality<br>❌ Unpredictable pause times |
| **Generational** | ✅ Fast minor collections<br>✅ Exploits typical patterns<br>✅ Good throughput<br>✅ Low pause times (minor GC) | ❌ Complex implementation<br>❌ Write barriers needed<br>❌ Major GC still pauses<br>❌ Higher memory usage |
| **Concurrent** | ✅ Minimal pauses<br>✅ Good for latency-sensitive apps<br>✅ Scales with cores | ❌ Lower throughput<br>❌ Very complex<br>❌ Higher memory overhead<br>❌ Still needs some pauses |

---

## 🔗 Quick Review

**Key Facts:**
- **Invented** by John McCarthy in 1959 for Lisp
- **Two main families**: Reference Counting (direct) and Tracing (indirect)
- **Reference Counting**: Immediate but can't handle cycles (CPython uses ref counting + cycle detector)
- **Mark-and-Sweep**: Handles cycles but has stop-the-world pauses
- **Generational GC**: Modern standard (JVM, CLR, V8) - exploits "most objects die young"
- **Trade-off**: GC needs 2-5x memory to match manual memory management performance
- **Concurrent GC**: Minimizes pauses but increases overhead (G1GC, ZGC, Shenandoah)

**Memory Management Spectrum:**
```
Manual          RAII/         Reference      Tracing
(C, C++)    Smart Pointers    Counting        GC
              (C++ unique_ptr) (Python)    (Java, C#)
    ←─────────────────────────────────────────→
  Full Control                           Full Automation
  Maximum Speed                          Maximum Safety
```

**GC Performance Rules:**
- More memory = faster GC (reduces collection frequency)
- Generational GC is fastest for typical workloads
- Concurrent GC trades throughput for low latency
- Stop-the-world is simplest but causes visible pauses

**Common Misconceptions:**
- "GC makes programs slow" - Modern GC matches manual management with sufficient memory
- "Python is slow because of GC" - Actually reference counting + interpretation is the bottleneck
- "Java GC pauses are unavoidable" - Modern collectors (ZGC, Shenandoah) have sub-millisecond pauses
- "GC prevents memory leaks" - Logical leaks (holding unnecessary references) still possible

**Interview Topics:**
- Explain how mark-and-sweep handles cycles while reference counting cannot
- What is the generational hypothesis and why is it effective?
- Why do concurrent GCs need write barriers?
- Compare throughput vs latency in GC strategies
- How does stop-the-world impact real-time systems?

### Further Reading

- [Uniprocessor Garbage Collection Techniques](https://link.springer.com/chapter/10.1007/BFb0017182) (Paul R. Wilson, 1992) - Comprehensive survey of GC algorithms
- [A Unified Theory of Garbage Collection](https://www.cs.cornell.edu/courses/cs6120/2019fa/blog/unified-gc/) (Bacon et al., 2004) - Unifies tracing and counting
- [Java Garbage Collection Handbook](https://plumbr.io/handbook/garbage-collection-in-java) - Practical guide to JVM GC tuning
- [GC FAQ](https://www.iecc.com/gclist/GC-faq.html) - Comprehensive FAQ on garbage collection

---

## 📌 Related Topics

- Memory Management Strategies
- Virtual Machines (JVM, CLR, PVM)
- Smart Pointers and RAII (C++)
- Automatic Reference Counting (ARC)
- Memory Leaks and Profiling
- Real-time Systems and Deterministic Finalization
- Weak References and Finalizers