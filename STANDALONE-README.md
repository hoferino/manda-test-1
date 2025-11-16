# M&A Deal Intelligence Platform - Standalone Package

**Version:** 1.0.0
**Status:** Production Ready - Fully Self-Contained
**Package Type:** Standalone AI Module (No External Dependencies)

---

## What Is This?

This is a **complete, self-contained AI agent system** for M&A deal execution. It's designed to work independently - no framework required, no external dependencies, fully portable.

**Key Features:**
- 🤖 **5 Specialized AI Agents** (Deal Orchestrator, Information Vault, Finance Analyst, Company Analyst, Story Architect)
- 📋 **6 Production Workflows** (Data Room Audit, Storyline Workshop, IRL Setup, Status Tracking, Document Processing)
- 🔧 **Complete Runtime Engine** (Workflow execution engine included)
- 📦 **100% Portable** (Copy anywhere and it works)
- ⚙️ **Self-Configured** (All config included, no setup required)

---

## What Can It Do?

### Intelligence & Automation
- **Intelligent Information Retrieval** - Quick answers from deal documents using RAG
- **Inconsistency Detection** - Finds contradictions across financial statements, presentations, and data
- **Assumption Validation** - Cross-checks claims against supporting evidence
- **Document Classification** - Auto-categorizes uploaded documents

### M&A Workflows
- **Data Room Audit** - Comprehensive gap analysis against M&A checklist with red/yellow/green status
- **Investment Storyline Workshop** - Interactive narrative development for CIMs (story-first approach)
- **IRL-Based Data Room Setup** - Intelligent folder structure from Information Request Lists
- **Status Tracking** - Real-time completeness monitoring against IRL
- **Upload Processing** - Batch document classification and routing

### Document Generation
- **Investment Teasers** - One-page marketing materials
- **Storyline Briefs** - Evidence-mapped investment narratives
- **Audit Reports** - Comprehensive data room analysis
- **CIM Outlines** - Prose-first CIM foundations

---

## Package Structure

```
manda-standalone/
├── README.md                      # Module overview
├── STANDALONE-README.md           # This file (standalone usage guide)
├── QUICKSTART.md                  # Quick start guide
├── config.yaml                    # Module configuration (edit this!)
│
├── agents/                        # 5 AI agents (YAML source files)
│   ├── deal-orchestrator.agent.yaml
│   ├── information-vault.agent.yaml
│   ├── company-analyst.agent.yaml
│   ├── finance-analyst.agent.yaml
│   └── story-architect.agent.yaml
│
├── workflows/                     # 6 production workflows
│   ├── workflow-engine.xml        # Workflow execution engine
│   ├── data-room-audit/
│   ├── investment-storyline-workshop/
│   ├── setup-irl-data-room/
│   ├── check-irl-status/
│   ├── update-irl-status/
│   └── process-upload-area/
│
├── _module-installer/             # Installation infrastructure
│   ├── install-config.yaml
│   ├── installer.js
│   ├── validate-config.js
│   ├── compile-agents.js
│   └── validate-module.js
│
├── docs/                          # Documentation
│   ├── QUICKSTART.md
│   ├── USER-GUIDE.md
│   └── COMPONENT-ROADMAP.md
│
├── cim-templates/                 # Document templates
├── tasks/                         # Shared utility tasks
└── data/                          # Knowledge base (your data goes here)
```

---

## Quick Start (3 Minutes)

### 1. Configure Your Settings

Edit `config.yaml`:

```yaml
# User Settings
user_name: Max                              # Your name
communication_language: English             # Language for AI responses
document_output_language: English           # Language for generated documents

# Paths (relative to this module folder)
data_room_path: './data/deals'              # Where your deal documents are
output_location: './output/manda'           # Where generated docs go
knowledge_base_path: './data/knowledge-base' # Reference materials

# Preferences
template_preference: 'standard'             # standard | modern | custom
inconsistency_sensitivity: 'standard'       # relaxed | standard | strict
```

### 2. Set Up Your Data Room

Create your deal folder structure:

```bash
mkdir -p data/deals/my-deal
```

Upload your deal documents to `data/deals/my-deal/`

### 3. Use the Agents

**With Claude Projects:**
- Add this folder to your Claude Project
- Load an agent: `/manda:deal-orchestrator`
- Or run a workflow: `/manda:data-room-audit`

**With Claude API:**
```javascript
import fs from 'fs';
import yaml from 'yaml';

// Load agent
const agent = yaml.parse(
  fs.readFileSync('agents/deal-orchestrator.agent.yaml', 'utf8')
);

// Use with Claude API
const response = await claude.messages.create({
  system: agent.system_prompt,
  messages: [{ role: 'user', content: 'Audit my data room' }]
});
```

---

## Integration Options

### Option 1: As-Is (Copy & Use)

```bash
# Copy entire folder to your project
cp -r manda-standalone /your-project/
cd /your-project/manda-standalone
# Edit config.yaml
# Start using!
```

**Best for:** Quick setup, testing, standalone use

---

### Option 2: Package & Distribute

```bash
# Create distributable package
tar -czf manda-v1.0.0.tar.gz manda-standalone/

# Users extract and use
tar -xzf manda-v1.0.0.tar.gz
cd manda-standalone
# Ready to go!
```

**Best for:** Sharing with team, version control

---

### Option 3: API Wrapper

Create a REST API around the module:

```javascript
import express from 'express';
import { loadAgent, executeWorkflow } from './manda-runtime.js';

const app = express();

app.post('/api/audit-data-room', async (req, res) => {
  const workflow = loadWorkflow('data-room-audit');
  const result = await executeWorkflow(workflow, req.body);
  res.json(result);
});

app.listen(3000);
```

**Best for:** Web apps, multi-user systems, SaaS products

---

### Option 4: Embedded in Product

Integrate directly into your application:

```javascript
import { MandaModule } from './manda-standalone';

class MyProduct {
  constructor() {
    this.manda = new MandaModule({
      configPath: './manda-standalone/config.yaml'
    });
  }

  async analyzeDeal(dealPath) {
    return await this.manda.workflows.run('data-room-audit', {
      data_room_path: dealPath
    });
  }
}
```

**Best for:** Custom products, white-label solutions

---

## Path Resolution

The module uses `{module-root}` variable for all paths.

**How to implement:**

```javascript
const MODULE_ROOT = __dirname;  // Or wherever you put the module

function resolvePath(path) {
  return path.replace('{module-root}', MODULE_ROOT);
}

// Example:
const configPath = resolvePath('{module-root}/config.yaml');
// Returns: '/your/path/manda-standalone/config.yaml'
```

**All paths are relative to module root** - so you can move the folder anywhere!

---

## Customization

### Add Your Own Data

```bash
# Add knowledge base materials
cp your-templates.pdf data/knowledge-base/
cp market-research.xlsx data/knowledge-base/

# Add deal documents
cp company-financials.xlsx data/deals/my-deal/
```

### Modify Workflows

All workflows are in `workflows/[name]/`:
- `workflow.yaml` - Configuration and variables
- `instructions.md` - Execution steps (XML format)
- `template.md` - Output template (for document workflows)

### Add New Agents

Create new agents in `agents/`:

```yaml
# agents/my-new-agent.agent.yaml
name: My New Agent
type: expert
system_prompt: |
  You are a specialized expert in...
config_source: '{module-root}/config.yaml'
```

---

## Validation

Validate the module is complete:

```bash
node _module-installer/validate-module.js
```

This checks:
- ✅ All required files present
- ✅ Config is valid
- ✅ Agents compile correctly
- ✅ Workflows reference correct paths
- ✅ No external dependencies

---

## What Makes This Standalone?

### ✅ Self-Contained Configuration
- `config.yaml` at module root (no external config needed)
- All settings in one place

### ✅ Embedded Execution Engine
- `workflows/workflow-engine.xml` included (BMAD v6 engine)
- No need for external framework

### ✅ Relative Path References
- All paths use `{module-root}/` variable
- Module can be moved anywhere
- No hardcoded absolute paths

### ✅ Complete Agent Definitions
- All 5 agents fully defined in YAML
- No external agent dependencies
- Agents reference local config only

### ✅ Portable Workflows
- All 6 workflows self-contained
- Each workflow references `{module-root}/config.yaml`
- Templates and instructions included

### ✅ No External Dependencies
- Doesn't require BMAD framework
- Doesn't require external tools
- Only needs: Node.js (for installer scripts) or Claude API

---

## Architecture

### Agent System

**Deal Orchestrator** (Primary Interface)
- User-facing agent
- Routes requests to specialists
- Coordinates multi-agent workflows

**Information Vault** (Backend Service)
- RAG-powered data retrieval
- No direct user interaction
- Serves all other agents

**Company Analyst** (Expert)
- Business intelligence
- Products, operations, market positioning
- Competitive analysis

**Finance Analyst** (Expert)
- Financial analysis and valuation
- Quantitative due diligence
- Deal modeling

**Story Architect** (Expert)
- Narrative development
- Storyline-first CIM creation
- Marketing materials

### Workflow Philosophy

**No Forced Phases** - All workflows independent and on-demand

**Storyline-First** - Narrative before slides (revolutionary approach)

**Intelligence Built-In** - Inconsistency detection and validation

**Evidence-Based** - All claims linked to sources

---

## Use Cases

### Investment Banking
- **Sell-Side M&A**: CIM creation, teaser generation, data room management
- **Buy-Side M&A**: Due diligence analysis, red flag identification
- **Pitch Books**: Quick company analysis and positioning

### Private Equity
- **Deal Sourcing**: Rapid company assessment from limited data
- **Due Diligence**: Comprehensive document review and gap analysis
- **Portfolio Management**: Ongoing company intelligence

### Corporate Development
- **Acquisition Analysis**: Target company evaluation
- **Strategic Planning**: Market and competitive intelligence
- **Integration**: Document organization and knowledge transfer

### Business Brokers
- **Marketing Materials**: Quick teaser and CIM generation
- **Deal Packaging**: Storyline development for presentations
- **Buyer Qualification**: Understanding buyer perspectives

---

## Technical Requirements

### Minimum Requirements
- **Runtime**: Node.js 16+ (for installer scripts only)
- **AI Model**: Claude 3.5 Sonnet or better (via API or Projects)
- **Storage**: 500KB for module + your data
- **Memory**: Minimal (stateless workflows)

### Recommended Setup
- **Claude Projects**: Best for interactive use
- **Claude API**: Best for automation/integration
- **Git**: For version control (optional)

---

## Support & Resources

### Included Documentation
- [README.md](README.md) - Module overview
- [QUICKSTART.md](docs/QUICKSTART.md) - Quick start guide
- [USER-GUIDE.md](docs/USER-GUIDE.md) - Comprehensive user manual
- [COMPONENT-ROADMAP.md](docs/COMPONENT-ROADMAP.md) - Development roadmap

### Module Files
- [SELF-CONTAINED-MODULE.md](SELF-CONTAINED-MODULE.md) - How standalone works
- [MODULE-COMPLETION-SUMMARY.md](MODULE-COMPLETION-SUMMARY.md) - Development status
- [EXTERNAL-DEPENDENCIES-ANALYSIS.md](EXTERNAL-DEPENDENCIES-ANALYSIS.md) - Dependencies audit

### Installation
- [install-config.yaml](_module-installer/install-config.yaml) - Installation config
- [installer.js](_module-installer/installer.js) - Custom installer
- [validate-module.js](_module-installer/validate-module.js) - Validator

---

## Design Principles

1. **Agent Specialization** - Each agent has clear, focused purpose
2. **Flexibility First** - No forced workflows or phases
3. **Storyline-First** - Narrative before slides (game-changing for M&A)
4. **Intelligence at Core** - Inconsistency detection built-in
5. **Speed Matters** - Quick information retrieval is critical
6. **Portability** - Works anywhere, no dependencies

---

## Version History

**v1.0.0** (Current)
- ✅ All 5 agents operational
- ✅ 6 production workflows complete
- ✅ Full BMAD v6 compliance
- ✅ 100% standalone (no external dependencies)
- ✅ Comprehensive documentation
- ✅ Installation infrastructure
- ✅ Validation scripts

---

## License & Usage

This module is provided as-is for use in M&A advisory and deal intelligence applications.

**Recommended Attribution:**
> Powered by M&A Deal Intelligence Platform v1.0.0

---

## Getting Help

### Quick Troubleshooting

**Module won't load?**
- Check config.yaml paths are correct
- Verify all files present (run validate-module.js)
- Ensure {module-root} resolves to correct location

**Workflows fail?**
- Check data_room_path in config.yaml
- Verify documents exist at specified paths
- Review workflow.yaml for variable issues

**Agents not working?**
- Verify system prompt loads correctly
- Check config_source path in agent YAML
- Ensure Claude model is Sonnet 3.5 or better

### Module Validation

```bash
# Run complete validation
node _module-installer/validate-module.js

# Validate just config
node _module-installer/validate-config.js

# Check agent compilation
node _module-installer/compile-agents.js
```

---

## Next Steps

1. **Configure** - Edit `config.yaml` with your settings
2. **Add Data** - Put deal documents in `data/deals/`
3. **Test** - Run a simple workflow (data-room-audit)
4. **Integrate** - Choose integration option (API, embed, standalone)
5. **Customize** - Add your templates, workflows, knowledge base

---

**Ready to revolutionize M&A deal execution?**

Start with the quickstart guide: [docs/QUICKSTART.md](docs/QUICKSTART.md)

---

*Built with BMAD Method - AI-Powered Agent Framework for Professional Workflows*
*Standalone Package - No Dependencies - 100% Portable - Production Ready*
