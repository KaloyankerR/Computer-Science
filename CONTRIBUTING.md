# 📚 Contributing to Comp Sci Documentation

This repository is a **concise, condensed learning portfolio** covering computer science concepts. All documentation follows a standardized structure for consistency and clarity.

## 📝 Quick Start

1. Copy `doc-template.md` to create a new topic file
2. Follow the **6-step structure** outlined in the template
3. Keep content **concise** - prioritize clarity over completeness
4. Use the naming and formatting conventions below

---

## 💾 File Naming Conventions

**Use `kebab-case` for all files:**

- All **lowercase** letters
- Separate words with **hyphens** (`-`)
- No spaces, underscores, or special characters

**Examples:**
```
data-structures/linked-list-doubly.md
algorithms/sorting/quicksort.md
design-patterns/observer-pattern.md
```

---

## ✍️ Formatting Standards

### Headings
- `#` - File title (concept name)
- `##` - Main sections
- `###` - Sub-sections

### Code Blocks
Always specify the language for syntax highlighting:

```python
def example():
    return "Always specify language"
```

Use **pseudocode** for language-agnostic algorithms.

### Emphasis on Conciseness
- **Bullet points** over long paragraphs
- **Tables** for comparisons and structured data
- **Code examples** over lengthy explanations
- Remove unnecessary words - every sentence should add value

---

## 🌐 Language Coverage

The template suggests **Python, Java, and C++** for language comparisons, but this is flexible:

- Include languages where the differences are **meaningful**
- Skip languages where implementation is nearly identical
- Add more languages (TypeScript, Go, PHP) when relevant to the topic

**Not every topic needs all languages.**

---

## 📋 Document Structure

Every topic file follows the **6-step pattern**:

1. **💡 Core Idea** - What it is and why it matters
2. **🔨 Implementation Details** - How it works
3. **🌐 Language Comparison** - Syntax/approach across languages
4. **🔬 Analysis & Use Cases** - Performance and practical applications
5. **🔗 Quick Review** - Key facts for revision
6. **(Optional sections as needed)**

See `doc-template.md` for the complete structure.

---

## ✅ Quality Checklist

Before considering a document complete:

- [ ] All 5 core sections are filled
- [ ] Code examples are tested and correct
- [ ] Language comparisons show meaningful differences
- [ ] Complexity analysis includes Big O notation
- [ ] Content is concise (no fluff or redundancy)
- [ ] Formatting follows conventions (kebab-case, proper headings)

---

## 🎯 Philosophy

**Concise > Comprehensive**

This is a learning portfolio optimized for quick reference and revision, not an exhaustive textbook. Every topic should be:

- Understandable in under 5 minutes
- Packed with high-value information
- Easily scannable with clear structure

If a topic requires extensive coverage, consider splitting it into multiple files.