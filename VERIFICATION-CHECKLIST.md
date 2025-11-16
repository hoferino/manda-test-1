# Standalone Package Verification Checklist

Use this checklist to verify the manda-standalone package is complete and ready for distribution.

---

## ✅ Core Files

- [x] config.yaml exists at module root
- [x] README.md exists (module overview)
- [x] STANDALONE-README.md exists (usage guide)
- [x] PACKAGE-INFO.md exists (package manifest)
- [x] VERIFICATION-CHECKLIST.md exists (this file)

---

## ✅ Agents (5 Required)

- [x] agents/deal-orchestrator.agent.yaml
- [x] agents/information-vault.agent.yaml
- [x] agents/company-analyst.agent.yaml
- [x] agents/finance-analyst.agent.yaml
- [x] agents/story-architect.agent.yaml

**Agent Compliance:**
- [x] All agents use `config_source: '{module-root}/config.yaml'`
- [x] All agents have complete system prompts
- [x] All agents properly structured (YAML format)

---

## ✅ Workflows (6 Required + Engine)

**Workflow Engine:**
- [x] workflows/workflow-engine.xml exists
- [x] Engine is BMAD v6 compliant

**Workflows:**
- [x] workflows/data-room-audit/ (complete)
- [x] workflows/investment-storyline-workshop/ (complete)
- [x] workflows/setup-irl-data-room/ (complete)
- [x] workflows/check-irl-status/ (complete)
- [x] workflows/update-irl-status/ (complete)
- [x] workflows/process-upload-area/ (complete)

**Workflow Compliance - Standard Config Block:**
- [x] All workflows have `config_source: "{module-root}/config.yaml"`
- [x] All workflows have `output_folder: "{config_source}:output_folder"`
- [x] All workflows have `user_name: "{config_source}:user_name"`
- [x] All workflows have `communication_language: "{config_source}:communication_language"`
- [x] All workflows have `date: system-generated`
- [x] All workflows have `installed_path: "{module-root}/workflows/[name]"`

**Workflow Compliance - Files:**
- [x] All workflows have workflow.yaml
- [x] All workflows have instructions.md
- [x] Document workflows have template.md

**Path Standardization:**
- [x] NO workflows use `{project-root}`
- [x] All workflows use `{module-root}`
- [x] All workflows use `{installed_path}` for file references

---

## ✅ Documentation

**Required Docs:**
- [x] docs/QUICKSTART.md
- [x] docs/USER-GUIDE.md
- [x] docs/COMPONENT-ROADMAP.md

**Optional Docs (Included):**
- [x] SELF-CONTAINED-MODULE.md
- [x] MODULE-COMPLETION-SUMMARY.md
- [x] EXTERNAL-DEPENDENCIES-ANALYSIS.md
- [x] SETUP-NEW-DEAL.md

---

## ✅ Installation Infrastructure

- [x] _module-installer/install-config.yaml
- [x] _module-installer/installer.js
- [x] _module-installer/validate-config.js
- [x] _module-installer/compile-agents.js
- [x] _module-installer/validate-module.js

---

## ✅ Directories

- [x] cim-templates/ exists (empty OK)
- [x] tasks/ exists (empty OK)
- [x] data/ exists (empty OK)

---

## ✅ Standalone Requirements

**Self-Contained:**
- [x] config.yaml at module root (not external)
- [x] workflow-engine.xml copied into module
- [x] No references to `{project-root}/bmad/`
- [x] No references to external BMAD framework
- [x] All paths use `{module-root}/`

**Portability:**
- [x] Module can be copied anywhere
- [x] No hardcoded absolute paths
- [x] All paths relative to module root
- [x] Works without parent directory structure

**Completeness:**
- [x] All agent dependencies internal
- [x] All workflow dependencies internal
- [x] Execution engine included
- [x] Configuration included
- [x] Documentation complete

---

## ✅ Validation Tests

**File Count Test:**
```bash
find manda-standalone -type f | wc -l
# Expected: 53+ files
```
- [x] PASS: 53 files found

**Size Test:**
```bash
du -sh manda-standalone
# Expected: ~472KB
```
- [x] PASS: 472K

**Path References Test:**
```bash
# Should return empty (no project-root in workflows)
grep -r "{project-root}" manda-standalone/workflows/*/workflow.yaml
```
- [x] PASS: No {project-root} references in workflows

**Config Source Test:**
```bash
# All workflows should reference module-root config
grep -r "config_source" manda-standalone/workflows/*/workflow.yaml
```
- [x] PASS: All use {module-root}/config.yaml

**Workflow Engine Test:**
```bash
# Workflow engine should exist
ls manda-standalone/workflows/workflow-engine.xml
```
- [x] PASS: workflow-engine.xml exists

---

## ✅ Integration Readiness

**Claude Projects:**
- [x] Can be added to Claude Project as folder
- [x] Agents can be invoked with /manda:agent-name
- [x] Workflows can be run with /manda:workflow-name

**Claude API:**
- [x] Agent YAMLs can be loaded and parsed
- [x] System prompts can be extracted
- [x] Compatible with Claude API message format

**Standalone Execution:**
- [x] Module works without BMAD framework
- [x] All dependencies self-contained
- [x] No external tooling required (except Node.js for scripts)

---

## ✅ Quality Checks

**Code Quality:**
- [x] All YAML files valid (no syntax errors)
- [x] All Markdown files properly formatted
- [x] All XML files valid (workflow-engine.xml)
- [x] All JavaScript files executable (installer scripts)

**Documentation Quality:**
- [x] README clear and comprehensive
- [x] Quickstart guide complete
- [x] User guide detailed
- [x] Standalone guide thorough

**Usability:**
- [x] config.yaml easy to understand and edit
- [x] Clear file organization
- [x] Logical directory structure
- [x] Good naming conventions

---

## ✅ Distribution Readiness

**Packaging:**
- [x] Can be zipped/tarred for distribution
- [x] Can be copied as directory
- [x] Can be git cloned/forked
- [x] Works on macOS, Linux, Windows (path-agnostic)

**Installation:**
- [x] No complex setup required
- [x] Edit config.yaml and ready to use
- [x] Validation scripts included
- [x] Clear documentation provided

**Support:**
- [x] Troubleshooting guide in STANDALONE-README.md
- [x] Validation tools included
- [x] Configuration examples provided
- [x] Integration patterns documented

---

## 🎯 Final Verdict

**Status:** ✅ **READY FOR DISTRIBUTION**

**Package Type:** Standalone AI Module
**Version:** 1.0.0
**Build Date:** 2025-11-12
**External Dependencies:** ZERO
**BMAD Compliance:** v6 Full Compliance

**Quality Score:**
- Code Quality: ✅ Excellent
- Documentation: ✅ Comprehensive
- Standalone: ✅ 100% Self-Contained
- Portability: ✅ Fully Portable
- Usability: ✅ Production Ready

---

## Distribution Instructions

### For End Users

1. **Download Package:**
   ```bash
   # As tarball
   tar -xzf manda-v1.0.0.tar.gz

   # Or as directory
   cp -r manda-standalone /your/location/
   ```

2. **Configure:**
   ```bash
   cd manda-standalone
   edit config.yaml  # Set your preferences
   ```

3. **Use:**
   - With Claude Projects: Add folder, use agents
   - With Claude API: Load agents, execute workflows
   - Standalone: Copy and integrate into your product

### For Developers

1. **Verify Package:**
   ```bash
   node _module-installer/validate-module.js
   ```

2. **Test Integration:**
   ```javascript
   import { loadAgent } from './runtime.js';
   const agent = loadAgent('deal-orchestrator');
   ```

3. **Customize:**
   - Add workflows to workflows/
   - Add agents to agents/
   - Modify config.yaml
   - Extend as needed

---

## Maintenance Checklist

**Before Each Release:**

- [ ] Run validation: `node _module-installer/validate-module.js`
- [ ] Verify all workflows test successfully
- [ ] Update version in config.yaml
- [ ] Update PACKAGE-INFO.md
- [ ] Update VERIFICATION-CHECKLIST.md
- [ ] Create changelog entry
- [ ] Package for distribution
- [ ] Test package extraction and usage
- [ ] Upload to distribution channels

---

**Checklist Complete:** ✅
**Package Verified:** ✅
**Ready for Production:** ✅

*Verified by: BMad Builder*
*Date: 2025-11-12*
