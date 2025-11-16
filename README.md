# M&A Deal Intelligence Platform

**Module Code:** `manda`
**Version:** 1.0.0
**Type:** Standard → Complex Module

## Overview

The M&A Deal Intelligence Platform is an intelligent agent framework designed specifically for investment bankers, M&A advisors, and corporate development teams. It revolutionizes deal execution through a storyline-first approach to document generation and intelligent information retrieval.

## Core Capabilities

- **Intelligent Information Retrieval** - Quick access to deal-relevant information through specialized agents
- **Storyline-First CIM Creation** - Revolutionary approach: develop narrative before slides
- **Due Diligence Automation** - Comprehensive data room analysis and validation
- **Inconsistency Detection** - Identify contradictions across multiple documents
- **Assumption Validation** - Cross-check user assumptions against knowledge base
- **Valuation & Financial Analysis** - Expert-driven financial modeling and analysis
- **Document Generation** - Teasers, CIMs, and other deal materials

## Architecture

### Agent System (5 Agents)

1. **Deal Orchestrator** (Module Agent)
   - Primary user interface
   - Routes requests to specialist agents
   - Coordinates multi-agent workflows

2. **Information Vault** (Backend Service)
   - High-speed data retrieval engine
   - Serves structured and unstructured data to specialists
   - No direct user interaction

3. **Company Analyst** (Expert Agent)
   - Business intelligence specialist
   - Products, patents, personnel, operations
   - Market positioning and competitive analysis

4. **Finance Analyst** (Expert Agent)
   - Financial analysis and valuation
   - Deal structuring and modeling
   - Quantitative due diligence

5. **Story Architect** (Expert Agent)
   - Narrative development for CIMs and marketing materials
   - Storyline-first document creation
   - Compelling deal positioning

### Workflow Philosophy

**No Forced Phases** - All workflows are independent, on-demand capabilities. Users can execute any workflow at any time without following a prescribed sequence. This mirrors the non-linear reality of M&A deal execution.

### Workflows

1. **data-room-audit** - Comprehensive data room analysis with inconsistency detection
   - Scans all documents in data room
   - Compares against M&A due diligence checklist
   - Identifies gaps and completeness by category
   - Runs cross-document inconsistency detection
   - Generates actionable next steps

2. **investment-storyline-workshop** - Interactive storyline development for CIMs
   - 5-act collaborative process (Discovery → Synthesis → Construction → Validation → Documentation)
   - Story-first philosophy: narrative before slides
   - Develops investment thesis and core themes
   - Creates evidence-mapped storyline
   - Generates teaser, storyline brief, and CIM outline

## Installation

```bash
# Clone or download the platform
git clone [repository-url] manda-platform
cd manda-platform

# Run the installer
node _module-installer/installer.js
```

During installation, you'll configure:
- Output locations for generated documents
- Data room integration settings
- Knowledge base paths
- Document templates

## Quick Start

The platform provides specialized AI agents for M&A deal analysis. Load the agents using Claude Projects or your preferred AI interface by referencing the agent files in the `agents/` directory.

**Main entry point:** `agents/deal-orchestrator.agent.yaml`

Key workflows available:
- Data Room Audit: `workflows/data-room-audit/`
- Investment Storyline Workshop: `workflows/investment-storyline-workshop/`

## Directory Structure

```
manda-platform/
├── agents/              # 8 specialist agents
├── workflows/           # Independent workflow capabilities
├── tasks/               # Shared utility tasks
├── cim-templates/       # CIM and marketing document templates
├── data/                # Knowledge base and reference data
├── _module-installer/   # Installation configuration
├── docs/                # User guides and documentation
└── README.md           # This file
```

## Development Status

**Platform Status:** ✅ PRODUCTION READY

**Core Components:**
- ✅ All 8 specialist agents built and configured
- ✅ 6 workflows complete (IRL setup, data room audit, storyline workshop, status checking)
- ✅ RAG architecture designed for Information Vault
- ✅ Installation infrastructure complete
- ✅ Comprehensive documentation (Quick Start, User Guide, Component Roadmap)
- ✅ Validation and testing scripts ready

**Deployment Ready:** Platform is production-ready and fully standalone.

**Validation:**
Run complete validation: `node _module-installer/validate-module.js`

## Component Inventory

### Agents (8/8 Complete)
- ✓ [deal-orchestrator.agent.yaml](agents/deal-orchestrator.agent.yaml) - Primary orchestrator and user interface
- ✓ [information-vault.agent.yaml](agents/information-vault.agent.yaml) - RAG-powered data retrieval engine
- ✓ [company-analyst.agent.yaml](agents/company-analyst.agent.yaml) - Business intelligence specialist
- ✓ [finance-analyst.agent.yaml](agents/finance-analyst.agent.yaml) - Financial analysis expert
- ✓ [story-architect.agent.yaml](agents/story-architect.agent.yaml) - Narrative development specialist
- ✓ [irl-parser.agent.yaml](agents/irl-parser.agent.yaml) - IRL file parser (service agent)
- ✓ [document-classifier.agent.yaml](agents/document-classifier.agent.yaml) - Document categorization service
- ✓ [document-migration-specialist.agent.yaml](agents/document-migration-specialist.agent.yaml) - Intelligent document migration

### Workflows (6/6 Complete)
- ✓ [setup-irl-data-room](workflows/setup-irl-data-room/) - IRL-based data room setup with multi-level hierarchy
- ✓ [data-room-audit](workflows/data-room-audit/) - Comprehensive data room analysis
- ✓ [investment-storyline-workshop](workflows/investment-storyline-workshop/) - Interactive storyline development
- ✓ [check-irl-status](workflows/check-irl-status/) - IRL completion status tracking
- ✓ [update-irl-status](workflows/update-irl-status/) - Update IRL tracking
- ✓ [process-upload-area](workflows/process-upload-area/) - Process and categorize uploaded documents

### Installation Infrastructure (Complete)
- ✓ [install-config.yaml](_module-installer/install-config.yaml) - Installation configuration
- ✓ [installer.js](_module-installer/installer.js) - Custom installation logic
- ✓ [validate-config.js](_module-installer/validate-config.js) - Configuration validator
- ✓ [compile-agents.js](_module-installer/compile-agents.js) - Agent compilation check
- ✓ [validate-module.js](_module-installer/validate-module.js) - Complete module validator

### Documentation (Complete)
- ✓ [README.md](README.md) - Module overview and quick reference
- ✓ [QUICKSTART.md](docs/QUICKSTART.md) - Beginner-friendly quick start guide
- ✓ [USER-GUIDE.md](docs/USER-GUIDE.md) - Comprehensive user documentation
- ✓ [COMPONENT-ROADMAP.md](docs/COMPONENT-ROADMAP.md) - Development roadmap and future enhancements
- ✓ [information-vault-rag-implementation.md](agents/information-vault-rag-implementation.md) - RAG architecture guide

## Design Principles

1. **Agent Specialization** - Each agent has a clear, focused purpose
2. **Flexibility First** - No forced workflows or phases
3. **Storyline-First** - Narrative before slides
4. **Intelligence at Core** - Inconsistency detection and assumption validation built-in
5. **Speed Matters** - Quick information retrieval is critical

---

*M&A Deal Intelligence Platform - Standalone AI-powered platform for investment banking professionals*
