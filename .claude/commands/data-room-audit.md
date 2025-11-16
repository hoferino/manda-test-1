---
description: Run comprehensive data room audit with inconsistency detection
---

Execute the Data Room Audit workflow.

1. Load the workflow configuration: `workflows/data-room-audit/workflow.yaml`
2. Load the workflow engine: `workflows/workflow-engine.xml`
3. Load the workflow instructions: `workflows/data-room-audit/instructions.md`
4. Load the output template: `workflows/data-room-audit/template.md`

Execute the workflow following the workflow engine rules:
- Process each step in exact order
- Handle template-output tags (save checkpoints)
- Use the template to structure the final audit report
- Save the completed audit to the configured output location

This workflow will scan all documents, compare against M&A due diligence checklists, identify gaps, and run inconsistency detection.
