# Changelog - M&A Deal Intelligence Platform

All notable changes to the M&A standalone module.

---

## [Unreleased] - 2025-11-13

### Changed - Communication Style Overhaul

#### All Agents (7 total)
Standardized communication across all agents to be professional, concise, and data-driven:

**Updated Agents:**
- `agents/deal-orchestrator.agent.yaml`
- `agents/company-analyst.agent.yaml`
- `agents/finance-analyst.agent.yaml`
- `agents/story-architect.agent.yaml`
- `agents/information-vault.agent.yaml`
- `agents/document-classifier.agent.yaml`
- `agents/document-migration-specialist.agent.yaml`

**Communication Style Changes:**
```yaml
communication_style:
  - Direct, professional tone
  - Concise, data-driven responses
  - No praise, encouragement, or unnecessary commentary
  - Focus on actionable insights only
```

**Rationale:** Eliminate verbose, friendly language in favor of professional investment banking tone focused on actionable insights.

---

### Added - Deal Orchestrator Communication Protocol

**File:** `agents/deal-orchestrator.agent.yaml`

**New Section:** Communication Protocol (lines 112-128)

Defines clear guidelines for when orchestrator should communicate vs. work silently:

**COMMUNICATE when:**
- Task completion with key findings or results
- Blocking issues or missing critical data prevent progress
- User decision required (conflicts, ambiguities, multiple options)
- Long-running operations (>30s estimated) are starting
- Significant findings discovered during analysis
- State changes (IRL setup complete, workflows available, etc.)

**STAY SILENT during:**
- Internal file operations (reading, searching documents)
- Agent delegation via Task tool (user sees agent results)
- Routine data processing and validation
- Navigation and file system operations
- Retries or alternative approaches to same task
- Tool selection and parameter preparation

**Rationale:** Reduce unnecessary chatter about internal operations while maintaining transparency on meaningful progress and issues.

---

### Changed - Deal Orchestrator Activation Messages

**File:** `agents/deal-orchestrator.agent.yaml`

**State A (Tracked Project) - Lines 388-401:**

**Before:**
```
Welcome back! Here's your progress...
```

**After:**
```
**Project Status:**
- Deal: {{deal_name}}
- IRL Completion: {{completion_percentage}}% ({{uploaded_count}}/{{total_count}})
- Last Updated: {{last_update_date}}
- High Priority Gaps: {{high_priority_pending_count}}

**Available Actions:**
- Query documents
- `check-irl-status` - Detailed completion dashboard
- `update-irl-status` - Refresh tracking after uploads
- `data-room-audit` - Comprehensive analysis
- `investment-storyline-workshop` - Develop narrative
```

**State B (Empty Project) - Line 405:**

**Before:**
```
Let's get started!
```

**After:**
```
Empty data room detected. Deal context required.
```

**State C (Untracked Project) - Lines 440-453:**

**Before:**
```
Great progress! Want to add tracking and organize this better?
```

**After:**
```
**Detected:** {{document_count}} documents in untracked structure
{{document_breakdown_by_folder}}

**IRL tracking unavailable.** Add tracking for:
- Progress monitoring and completion percentages
- Gap identification
- Priority-based organization
- Automated document migration to IRL structure

[Y] Set up IRL tracking with intelligent migration
[N] Continue without tracking
```

**Note:** This example is maintained in CHANGELOG for historical documentation purposes.

**Rationale:** Replace friendly, encouraging language with direct, factual status reporting.

---

### Removed - buyer_type Configuration Field

**Affected Files:**
- `agents/deal-orchestrator.agent.yaml` (lines 440-444 removed)
- `setup-new-deal.sh` (line 105)
- `install-from-github.sh`
- `SETUP-NEW-DEAL.md`

**What Was Removed:**

From orchestrator questions:
```yaml
- prompt: "What **type of buyer** is this deal for?"
  variable: "buyer_type"
  required: false
  options: ["strategic", "financial", "hybrid"]
```

From config templates:
```yaml
buyer_type: "strategic"
```

**Remaining Questions:**
- `deal_name` - Deal/project identifier
- `target_company_name` - Target company name
- `target_industry` - Industry sector
- `deal_type` - Type of deal (acquisition, sale, merger)

**Rationale:** `buyer_type` belongs in later analysis workflows (e.g., storyline development), not initial deal setup configuration.

---

### Removed - Helper Scripts and Documentation Files

**Files Modified:**
- `setup-new-deal.sh`
- `SETUP-NEW-DEAL.md`

**Removed from `setup-new-deal.sh`:**

1. **Main README.md generation** (lines 152-232)
   - Entire README file creation removed
   - No longer generates project documentation file

2. **Data room README.md generation** (lines 115-149)
   - Upload instructions README removed
   - Data room folder structure documentation removed

3. **Updated .gitignore**
   - Removed `!data/deals/README.md` exception
   - No special handling for README files

**Removed from `SETUP-NEW-DEAL.md`:**

1. **Directory structure diagram:**
   - Removed `README.md` from main directory
   - Removed `start-analysis.sh` reference

2. **Documentation sections:**
   - Removed "Helper Scripts" section
   - Changed "Creates Documentation" to "Creates Configuration"
   - Removed README references from "What Gets Created"

3. **Configuration examples:**
   - Removed `buyer_type` field from example configs

**What Setup Script Now Creates:**
- ✅ `deal-config.yaml` - Deal-specific configuration
- ✅ `.gitignore` - Git ignore rules
- ✅ Directory structure (data/, output/, manda/)
- ❌ No README files
- ❌ No helper scripts

**Rationale:**
- README files add clutter without significant value
- Users interact via orchestrator agent, not manual scripts
- Cleaner, more minimal setup focused on essential structure only

---

### Summary of Changes

**Configuration Changes:**
- Removed `buyer_type` field from initial setup (moved to later workflow phase)
- Simplified initial questions to 4 essential fields

**Communication Changes:**
- Standardized all 7 agents to professional, concise tone
- Removed praise, encouragement, and friendly language
- Added communication protocol to orchestrator defining when to report vs. stay silent

**Setup Script Changes:**
- Removed README.md generation (main and data room)
- Removed `buyer_type` from config template
- Cleaner setup focusing on essential structure only

**Documentation Changes:**
- Updated SETUP-NEW-DEAL.md to reflect simplified setup
- Removed references to helper scripts and README files

---

## Migration Guide

### For Existing Deals

No migration required. These changes affect:
1. **New deal setup** - Future deals created with `setup-new-deal.sh`
2. **Agent communication style** - Existing agents will use new professional tone
3. **Configuration fields** - Existing configs retain `buyer_type` if present (ignored)

### For Developers

**If you customized:**
- Agent communication styles → Review new standardized format
- Setup scripts → Note removal of README generation
- Config templates → `buyer_type` no longer in initial setup

---

## Contributors

- Max Hofer - M&A Deal Intelligence Platform
- BMad Builder - Agent refinement and standardization

---

## Next Steps

**Potential Future Improvements:**
1. Add `buyer_type` to storyline workshop workflow (where it's more relevant)
2. Consider additional communication protocol refinements based on usage
3. Monitor agent verbosity in practice and adjust if needed

---

**Last Updated:** 2025-11-13
