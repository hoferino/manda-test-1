# Patch Notes v1.1.0 - IRL Parser & Multi-Level Hierarchy

**Release Date:** 2025-11-13
**Module:** M&A Deal Intelligence Platform - Standalone Edition

---

## 🎯 Overview

This release introduces the **IRL Parser Agent** - a specialized background service for parsing Information Request Lists (IRLs) from Excel, PDF, and Word documents. The system now supports **multi-level folder hierarchies** (categories → subfolders → documents) instead of flat single-level structures.

---

## ✨ New Features

### 1. IRL Parser Agent (NEW)

**File:** `agents/irl-parser.agent.yaml`

A new background service agent that parses IRL files and extracts hierarchical document structures.

**Capabilities:**
- **Multi-format support**: Excel (.xlsx, .xls, .xlsm), PDF (.pdf), Word (.docx, .doc)
- **Multi-worksheet parsing**: Processes ALL worksheets in Excel files, not just the first sheet
- **Intelligent hierarchy extraction**: Detects categories, sub-categories, and documents from various IRL formats
- **Validation & confidence scoring**: Validates structure against M&A norms with high/medium/low confidence levels
- **Format auto-detection**: Automatically identifies and parses different IRL templates and structures

**Detection Methods:**
1. Explicit sub-category columns
2. Hierarchical numbering (1.1, 1.2, 2.1, etc.)
3. Indentation levels
4. Document name patterns and groupings

**Agent Type:** `service` - Background specialist spawned via Task tool, invisible to users

**Output Format:**
```yaml
parsed_structure:
  categories:
    - id: 1
      name: "Financial Information"
      folder: "financial-information"
      documents:
        - id: 1.1
          name: "Audited Financial Statements"
          subfolder: "audited-financials"
          priority: "high"
```

---

### 2. Multi-Level Folder Hierarchy Support

**Files:** `workflows/setup-irl-data-room/instructions.md`, `agents/irl-parser.agent.yaml`

The system now creates proper multi-level folder structures based on IRL specifications.

**Before:**
```
data/deals/
├── 1-financial-information/     (flat, all files here)
├── 2-legal-documents/            (flat, all files here)
```

**After:**
```
data/deals/
├── 1-financial-information/
│   ├── audited-financials/       (subfolder grouping)
│   ├── management-accounts/      (subfolder grouping)
│   └── revenue-analysis/         (subfolder grouping)
├── 2-legal-documents/
│   ├── corporate/
│   ├── contracts/
│   └── ip-documentation/
```

**Features:**
- Automatic subfolder creation from IRL structure
- Support for both flat and hierarchical structures
- Proper folder naming (lowercase-with-hyphens)
- .gitkeep files in empty folders for version control
- Validation of folder uniqueness and naming

---

### 3. Comprehensive PDF & Word Parsing

**File:** `agents/irl-parser.agent.yaml`

Enhanced IRL Parser with full PDF and Word document support.

**PDF Parsing:**
- **Digital PDFs**: Direct text extraction with structure preservation
- **Scanned PDFs**: OCR capability for image-based documents
- **Hybrid PDFs**: Mixed digital and scanned pages
- **Pattern recognition**:
  - Numbered outlines (1., 1.1, 1.2)
  - Table formats
  - Section headers with bulleted lists
  - Checklist formats with checkboxes

**Word Parsing:**
- **Heading-based structure**: Uses Word styles (Heading 1, 2, 3)
- **Table extraction**: Parses tables with proper column mapping
- **List parsing**: Numbered and bulleted lists with indentation
- **Mixed format support**: Combines headings, tables, and lists

**Challenges Handled:**
- Multi-column layouts
- Page breaks mid-section
- Mixed content (text + tables + images)
- Inconsistent formatting

---

## 🔧 Enhanced Features

### 4. Validation & Reasonableness Checks

**File:** `agents/irl-parser.agent.yaml` (lines 131-147)

**New Validation Rules:**

**Structural Validation (CRITICAL):**
- ✓ Each category has 'folder' field for folder naming
- ✓ No duplicate subfolder names within same category
- ✓ No empty/null document names

**Content Validation (ERROR):**
- Category folder names are valid (lowercase-with-hyphens)
- Subfolder names are valid (lowercase-with-hyphens) if present
- Document names are specific (not just "Document 1")

**M&A Domain Awareness:**
- Reasonable category count (2-15 typical, flags if <2 or >20)
- Standard M&A categories present (Financial, Legal, Commercial, Operational)
- High-priority financial docs included (audited financials, revenue data)

**Confidence Scoring:**
- **High (90%+)**: Standard template, clear hierarchy, no errors
- **Medium (70-89%)**: Non-standard but parseable, minor warnings
- **Low (<70%)**: Ambiguous structure, multiple errors

---

### 5. Enhanced Metadata & Traceability

**File:** `agents/irl-parser.agent.yaml` (lines 272-283)

**New Metadata Fields:**
```yaml
metadata:
  total_categories: 5
  total_subfolders: 12          # NEW: Count of unique subfolders
  total_documents: 47
  hierarchy_depth: 3            # NEW: 2 (flat) or 3 (hierarchical)
  sheets_processed: ["Sheet1"]  # Excel: Which sheets were parsed
  pages_processed: 5            # PDF/Word: Number of pages
  format_detected: "standard_m&a_template_v2"
```

**Traceability:**
- Each category includes `source_sheet` (Excel) or `source_page` (PDF/Word)
- Each document includes origin for debugging and validation

---

### 6. Workflow Integration

**File:** `workflows/setup-irl-data-room/instructions.md`

**Updated Step 2a: IRL File Processing** (lines 78-142)

**Before:**
- Inline parsing logic with basic pattern matching
- Single-level folder creation only

**After:**
- Spawns IRL Parser Agent via Task tool in background
- Receives structured YAML with full hierarchy
- Validates confidence levels before proceeding
- Creates multi-level folder structures automatically

**Confidence Thresholds:**
- **>80%**: Proceed with structure creation
- **60-80%**: Show warnings, ask user to review carefully
- **<60%**: Show errors, recommend manual definition or standard checklist

**Folder Creation Process:**
```
1. For each category:
   - Create main category folder: {id}-{folder}/
   - For each document with subfolder:
     - Create subfolder: {id}-{folder}/{subfolder}/
     - Add .gitkeep files

2. Support both flat and hierarchical structures
3. Validate all folders created
4. Report total (categories + subfolders)
```

---

## 📝 Communication Style Refinements

**Files:** `workflows/setup-irl-data-room/instructions.md`, `agents/deal-orchestrator.agent.yaml`

**Removed casual language:**
- ❌ "Great! Please provide..."
- ❌ "Perfect, archive..."
- ❌ "You've made great progress..."

**Replaced with professional tone:**
- ✅ "Please provide..."
- ✅ "Confirm and archive..."
- ✅ "You now have the visibility needed..."

**Consistency:** All user-facing text now follows professional investment banking communication style.

---

## 🏗️ Architecture

### Agent Pattern: Background Service

The IRL Parser follows the established **service agent pattern**:

| Aspect | Implementation |
|--------|---------------|
| **Type** | `service` (background specialist) |
| **Invocation** | Spawned via Task tool by workflows |
| **Context** | Isolated context (own 200K token budget) |
| **User Visibility** | Invisible - user never sees this agent directly |
| **Output** | Concise structured YAML (max 3000 tokens) |
| **Integration** | Seamless - workflow presents results naturally |

**Comparison with existing agents:**

| Agent | Type | User-Facing? | Spawned By | Similar To |
|-------|------|--------------|------------|-----------|
| IRL Parser | service | ❌ No | Workflows | Document Classifier, Document Migration Specialist |
| Document Classifier | service | ❌ No | Workflows | ✓ Same pattern |
| Finance Analyst | specialist | ❌ No | Orchestrator | Different use case |
| Deal Orchestrator | orchestrator | ✅ Yes | User | Main interface |

---

## 📊 Examples

### Example 1: Excel IRL with Sub-categories

**Input (Excel):**
| Category | Sub-Category | Document | Priority |
|----------|--------------|----------|----------|
| Financial Information | Audited Financials | 2023 Statements | High |
| Financial Information | Audited Financials | 2022 Statements | High |
| Financial Information | Management Accounts | Jan 2024 | High |
| Legal Documents | Corporate | Articles | High |

**Parsed Output:**
```yaml
categories:
  - id: 1
    name: "Financial Information"
    folder: "financial-information"
    documents:
      - id: 1.1
        subfolder: "audited-financials"
      - id: 1.2
        subfolder: "audited-financials"
      - id: 1.3
        subfolder: "management-accounts"
```

**Created Structure:**
```
1-financial-information/
├── audited-financials/
│   └── .gitkeep
└── management-accounts/
    └── .gitkeep
2-legal-documents/
└── corporate/
    └── .gitkeep
```

---

### Example 2: PDF with Numbered Hierarchy

**Input (PDF):**
```
1. Financial Information
   1.1 Audited Financials
       1.1.1 2023 Statements
       1.1.2 2022 Statements
   1.2 Management Accounts
2. Legal Documents
   2.1 Corporate Documents
```

**Parsed:** Same hierarchical structure as Example 1

---

### Example 3: Word with Heading Styles

**Input (Word):**
```
Heading 1: Financial Information
Heading 2: Audited Financials
- 2023 Statements
- 2022 Statements
Heading 2: Management Accounts
```

**Parsed:** Same hierarchical structure as Example 1

---

## 🔄 Migration Guide

### For Existing Deals

No migration required for existing deals. Changes affect:

1. **New IRL parsing** - Future deals using `setup-irl-data-room` workflow
2. **Multi-level folders** - New IRL setups will create subfolder hierarchies
3. **Communication style** - Workflows use refined professional language

**Existing deals retain:**
- Current folder structures (no automatic restructuring)
- Existing IRL checklists (if any)
- All document organization

### For Developers

**If you customized:**

1. **IRL parsing logic** → Now handled by dedicated IRL Parser Agent
2. **Folder creation** → Updated to support multi-level hierarchies
3. **Workflow language** → Review for casual language removal

**New integration pattern:**
```markdown
<action>Spawn IRL Parser Agent:
Task(
  subagent_type: "general-purpose",
  description: "Parse IRL file",
  prompt: "You are the IRL Parser specialist agent.

  Mission: Parse {irl_file_path}...

  Follow your system prompt for multi-worksheet parsing..."
)
</action>
```

---

## 📋 Files Modified

### New Files
- ✅ `agents/irl-parser.agent.yaml` (602 lines)

### Modified Files
- ✅ `workflows/setup-irl-data-room/instructions.md`
  - Lines 69: Removed "Great!"
  - Lines 78-142: Integrated IRL Parser Agent spawning
  - Lines 327-353: Enhanced folder creation logic
  - Line 391: Removed "Perfect"
  - Line 584: Refined completion message

- ✅ `agents/deal-orchestrator.agent.yaml`
  - Line 100: Updated State C message

- ✅ `CHANGELOG.md`
  - Line 125: Added documentation note

---

## 🎯 Technical Specifications

### IRL Parser Agent

**System Requirements:**
- Access to Read tool (for Excel, PDF, Word file loading)
- Task tool capability (for spawning by workflows)
- 200K token context budget (isolated)

**Performance:**
- Parsing time: Typically 2-5 seconds for standard IRLs
- Max IRL size: 500 documents across 20 categories
- Confidence calculation: Real-time during parsing

**Error Handling:**
- Corrupted files: Returns error status with details
- Unsupported formats: Clear error message with alternatives
- Low confidence: Provides detailed validation errors for debugging

### Supported IRL Formats

**Excel:**
- `.xlsx`, `.xls`, `.xlsm`
- Multi-worksheet support
- Table and hierarchical formats

**PDF:**
- `.pdf` (digital and scanned)
- OCR for image-based documents
- Multiple pattern recognition

**Word:**
- `.docx`, `.doc`
- Heading-based extraction
- Table and list parsing

---

## 🐛 Known Limitations

1. **Legacy formats**: `.doc` (Word 97-2003) support is basic compared to `.docx`
2. **Scanned PDFs**: OCR confidence may be lower for poor quality scans
3. **Complex tables**: Very complex Excel tables with merged cells may require manual review
4. **Custom numbering**: Non-standard numbering schemes (A.1.a.i) may not be detected

---

## 🔜 Future Enhancements

**Potential improvements for next release:**

1. **Template library**: Pre-defined patterns for common IRL templates (Deloitte, PwC, EY)
2. **IRL repair**: Auto-fix common formatting issues
3. **Industry-specific validation**: Enhanced rules for specific sectors (SaaS, Manufacturing, etc.)
4. **Multi-language support**: Parse IRLs in German, French, Spanish
5. **Visual preview**: Show folder structure preview before creation

---

## 🙏 Contributors

- Max Hofer - M&A Deal Intelligence Platform
- BMad Builder Agent - Agent development and integration

---

## 📞 Support

**Issues or Questions?**
- Review agent documentation in `agents/irl-parser.agent.yaml`
- Check workflow instructions in `workflows/setup-irl-data-room/instructions.md`
- Test with sample IRLs before production use

---

## ✅ Verification Checklist

**Before deploying:**

- [ ] IRL Parser Agent file exists at `agents/irl-parser.agent.yaml`
- [ ] Workflow updated to spawn IRL Parser Agent
- [ ] Multi-level folder creation logic implemented
- [ ] Validation rules include subfolder checks
- [ ] Communication style is professional throughout
- [ ] No casual language ("Great", "Perfect", etc.) in user-facing text
- [ ] Metadata includes `total_subfolders` and `hierarchy_depth`

**Testing recommendations:**

- [ ] Test with Excel IRL (single worksheet)
- [ ] Test with Excel IRL (multiple worksheets)
- [ ] Test with PDF IRL (numbered outline)
- [ ] Test with Word IRL (heading-based)
- [ ] Test with flat structure (no subfolders)
- [ ] Test with hierarchical structure (3 levels deep)
- [ ] Verify confidence scoring works correctly
- [ ] Verify validation catches errors

---

**Version:** 1.1.0
**Previous Version:** 1.0.0
**Release Type:** Feature Release
**Breaking Changes:** None

---

**🎉 Thank you for using the M&A Deal Intelligence Platform!**
