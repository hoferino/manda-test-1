---
description: Set up IRL-based data room structure with multi-level hierarchy support
---

Execute the Setup IRL Data Room workflow.

1. Load the workflow configuration: `workflows/setup-irl-data-room/workflow.yaml`
2. Load the workflow engine: `workflows/workflow-engine.xml`
3. Load the workflow instructions: `workflows/setup-irl-data-room/instructions.md`

This workflow will:
- Parse IRL files (Excel, PDF, Word) with multi-format support
- Extract hierarchical document structure (categories → subfolders → documents)
- Create organized data room folder structure
- Set up IRL tracking system for progress monitoring
- Support both new setup and retrofit modes for existing documents

The IRL Parser agent will be spawned automatically to handle file parsing.
