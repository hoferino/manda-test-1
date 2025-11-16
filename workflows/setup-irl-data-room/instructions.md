# Setup IRL-Based Data Room - Instructions

<critical>This workflow sets up an intelligent data room structure based on an Information Request List (IRL) or standard M&A checklist</critical>
<critical>Communicate all responses in {communication_language}</critical>

<workflow>

<step n="0" goal="Check if retrofit mode" if="retrofit_mode=true">
<action>Acknowledge existing documents:

"I see you already have documents uploaded! I'll help you add IRL tracking to organize them better.

**Retrofit Mode Active**

I'll:
1. Scan your existing documents to understand what you have
2. Help you set up an IRL structure (from your IRL or standard checklist)
3. Map your existing documents to the IRL categories
4. Identify what's still missing
5. Set up tracking going forward

Let's get started!"
</action>

<action>Scan existing data room:
- List all folders currently in {data_room_path}
- Count documents in each folder
- Identify document types present
- Show user what they currently have organized
</action>

<action>Present current structure:

"**Your Current Data Room:**

📁 Folder Structure:
{{list_folders_with_doc_counts}}

Total: {{document_count}} documents across {{folder_count}} folders

Now let's add IRL tracking to give you visibility and gap analysis!"
</action>
</step>

<step n="1" goal="Welcome and understand deal context">
<action if="retrofit_mode=false">Greet {user_name} warmly</action>

<action>Explain workflow purpose:
"I'll help you set up an intelligent data room structure for your deal. We have two approaches:

1. **IRL-Based** - If you have an Information Request List, I'll parse it and create a folder structure that exactly matches your document requirements
2. **Standard Checklist** - Use a proven M&A due diligence checklist with standard categories

The IRL-based approach is ideal because your data room structure will match the actual documents you need to collect, and the audit workflow can track completeness against the same IRL."
</action>

<ask>Do you have an Information Request List (IRL) for this deal?

[Y] Yes, I have an IRL (Excel, PDF, or Word)
[N] No, use standard M&A due diligence checklist
[C] Custom - I'll define my own structure interactively
</ask>
</step>

<step n="2" goal="Process IRL or use standard checklist" if="user-choice">

<check if="choice=Y">
  <step n="2a" goal="Process IRL">
  <ask>Please provide your IRL in one of these ways:

1. **Upload file** - Provide the file path to your IRL (Excel .xlsx, PDF, or Word .docx)
2. **Paste content** - Copy/paste the IRL content directly
3. **Describe structure** - Tell me the categories and I'll structure it

Which method would you prefer?
  </ask>

  <action if="file-upload">Spawn IRL Parser Agent to parse the file:

**Invoke Task Tool:**
- Use general-purpose subagent
- Load IRL Parser Agent instructions
- Pass parameters:
  - irl_file_path: {user_provided_path}
  - file_type: {detected from extension: excel|pdf|word}
  - deal_name: {deal_name}
  - industry: {target_industry}

**Agent Task:**
"You are the IRL Parser specialist agent.

**Mission:** Parse the provided IRL file and extract complete hierarchical structure with validation.

**File Details:**
- Path: {irl_file_path}
- Type: {file_type}
- Deal: {deal_name}
- Industry: {target_industry}

**Critical Requirements:**
1. Parse ALL worksheets in Excel files (not just first sheet)
2. Validate structure for reasonableness against M&A norms
3. Provide confidence scoring (high/medium/low)
4. Return structured YAML format

**Instructions:**
Follow your complete system prompt for multi-worksheet parsing, format detection, validation checks, and confidence scoring.

**Return Format:**
Structured YAML with:
- status, confidence, metadata
- validation (errors, warnings, info)
- parsed_structure (categories → documents)
- recommendations

Maximum 3000 tokens."
  </action>

  <action>Receive parsed IRL structure from agent:

Check parsing result:
- status: {{status}}
- confidence: {{confidence}}%
- sheets_processed: {{sheets_processed}}
- total_categories: {{total_categories}}
- total_documents: {{total_documents}}

**If confidence > 80%:**
- Parsing successful, structure is reliable
- Proceed to show user and get approval

**If confidence 60-80%:**
- Parsing completed with warnings
- Show structure with validation warnings
- Ask user to review carefully before approval

**If confidence < 60%:**
- Parsing failed or structure unclear
- Show errors to user
- Recommend: manual definition or standard checklist
- Do not proceed with unreliable structure
  </action>

  <action if="paste-content">Parse pasted IRL:
- Identify structure from formatting
- Extract categories and document lists
- Infer hierarchy from indentation/numbering
  </action>

  <action if="describe">Interactive structure builder:
- Ask for main categories
- For each category, ask for sub-categories
- For each sub-category, ask for required documents
- Build IRL structure from user input
  </action>

  <action>Show parsed structure to user:

"I've analyzed your IRL and identified this structure:

**Parsing Results:**
- Confidence: {{confidence}}%
- Source: {{source_file}}
- Worksheets processed: {{sheets_processed}}
- Format detected: {{format_detected}}

{{if validation.warnings}}
**Validation Warnings:**
{{display_each_warning}}
{{endif}}

{{if validation.info}}
**Parsing Notes:**
{{display_each_info}}
{{endif}}

**Main Categories:**
{{for each category in parsed_structure.categories}}
{{category.id}}. {{category.name}} ({{document_count}} documents)
   {{for first 3 documents}}
   - {{document.name}}
   {{endfor}}
   {{if more_than_3}}
   - ... and {{remaining_count}} more
   {{endif}}
{{endfor}}

**Total:** {{total_categories}} categories, {{total_documents}} documents requested

{{if recommendations}}
**Recommendations:**
{{display_each_recommendation}}
{{endif}}

Does this structure look correct?"
  </action>

  <ask>Approve structure or request modifications?

[A] Approve - create this structure
[M] Modify - let me adjust categories or documents
  </ask>

  <action if="modifications">Make requested changes and re-confirm</action>
  </step>
</check>

<check if="choice=N">
  <step n="2b" goal="Use standard M&A checklist">
  <action>Present standard M&A due diligence checklist:

"I'll use our standard M&A due diligence checklist:

**1. Financial Information**
   - Audited financial statements (3 years)
   - Monthly management accounts (current year)
   - Revenue by customer/product analysis
   - Working capital analysis
   - Capex schedule
   - Budget vs actual analysis

**2. Legal Documents**
   - Articles of incorporation
   - Shareholder agreements
   - Material customer contracts (>$X)
   - Material supplier contracts
   - Employee contracts (key personnel)
   - IP documentation (patents, trademarks, copyrights)
   - Litigation summary
   - Compliance documentation

**3. Operational Information**
   - Organizational chart
   - Employee census (roles, salaries, tenure)
   - Process documentation
   - Key performance indicators
   - Systems and technology inventory
   - Facilities information

**4. Commercial Information**
   - Customer list with revenue
   - Customer contracts
   - Pricing structure and policies
   - Sales pipeline
   - Market research and positioning
   - Competitor analysis
   - Marketing materials

**5. Strategic Information**
   - Business plan (3-5 years)
   - Management presentations
   - Board materials
   - Strategic initiatives
   - Growth opportunities
   - Risk assessment

**Total:** 5 main categories, ~60 document types"
  </action>

  <ask>Would you like to:

[A] Accept this standard checklist
[M] Modify - add/remove categories or documents
[S] Simplify - use just the 5 main categories (current default)
  </ask>

  <action if="modify">Make requested modifications</action>
  <action if="simplify">Use simplified 5-category structure</action>
  </step>
</check>

<check if="choice=C">
  <step n="2c" goal="Interactive custom structure">
  <action>Guide user through custom structure creation</action>

  <ask>Let's build your custom structure. How many main categories do you need?</ask>

  <action>For each category:
- Ask for category name
- Ask for description
- Ask for document types needed
- Ask for priority (High/Medium/Low)
  </action>

  <action>Show complete custom structure and confirm</action>
  </step>
</check>

</step>

<step n="3" goal="Generate folder structure">
<action>Create folder structure based on approved IRL/checklist:

**Folder naming conventions:**
- Main categories: lowercase-with-hyphens
- Sub-categories: lowercase-with-hyphens
- Numbering for order: 1-category-name, 2-category-name
- Clear, professional names

**Example structure:**
```
data/deals/
├── irl/
│   ├── irl-original.xlsx          (preserved original)
│   └── irl-checklist.yaml         (parsed structured version)
├── 1-financial-information/
│   ├── audited-financials/
│   ├── management-accounts/
│   └── revenue-analysis/
├── 2-legal-documents/
│   ├── corporate/
│   ├── contracts/
│   └── ip-documentation/
├── 3-operational-information/
│   ├── org-structure/
│   └── systems/
├── 4-commercial-information/
│   ├── customers/
│   ├── pricing/
│   └── sales/
└── 5-strategic-information/
    ├── business-plans/
    └── presentations/
```
  </action>

<action>Create the folder structure from parsed IRL:

**Process:**
1. For each category in parsed_structure.categories:
   - Create main category folder: {data_room_path}/{category.id}-{category.folder}/
   - For each document in category.documents that has a subfolder:
     - Create subfolder: {data_room_path}/{category.id}-{category.folder}/{document.subfolder}/
     - Add .gitkeep to preserve empty subfolder
   - If category has no subfolders, add .gitkeep to main category folder

2. Folder naming:
   - Main categories: {id}-{name-lowercase-with-hyphens}/
     Example: "1-financial-information/", "2-legal-documents/"
   - Subfolders: {name-lowercase-with-hyphens}/
     Example: "audited-financials/", "management-accounts/"

3. Multi-level support:
   - If IRL specifies document.subfolder → create subfolder under category
   - If IRL specifies document.category only → files go directly in category folder
   - Support both flat and hierarchical structures based on IRL

4. Structure validation:
   - Ensure all main category folders created
   - Ensure all subfolders from IRL created
   - Verify .gitkeep files in all empty folders
   - Report total folders created (categories + subfolders)
  </action>

<action>Show created structure:

"✅ Data room structure created successfully!

**Created:**
- X main categories
- Y sub-categories
- Z total folders

**Location:** {data_room_path}"
  </action>
</step>

<step n="3.5" goal="Migrate documents to new IRL structure" if="retrofit_mode=true">
<action>Explain the migration process:

"Now I'll help migrate your existing documents into the new IRL structure.

**What will happen:**
1. 📸 **Safety Snapshot** - I'll create a complete backup of your current structure
2. 🔍 **Intelligent Analysis** - AI will map each document to the best IRL category
3. ✅ **Your Review** - You'll approve the mapping before any files move
4. 📦 **Safe Migration** - Documents copied to new locations (originals preserved)
5. 📊 **IRL Update** - Tracking updated with your existing documents
6. 🔄 **Rollback Ready** - Full rollback instructions provided

**This is SAFE:** Your original files are preserved until you confirm everything looks good.

Ready to start the migration?"
</action>

<ask>Proceed with document migration?
[Y] Yes - Let's migrate to the new structure
[N] No - Just set up IRL structure, I'll move files manually
</ask>

<action if="user-declines-migration">
"Understood! I've created the IRL structure. You can manually move documents whenever you're ready, then run `/manda:update-irl-status` to update tracking."

Skip to step 4.
</action>

<action if="user-approves-migration">Spawn Document Migration Specialist:

**Invoke Task Tool:**
- Use general-purpose subagent with extended context
- Load Document Migration Specialist instructions
- Pass parameters:
  - current_data_room_path: {data_room_path}
  - new_irl_structure: {irl_checklist_path}
  - migration_mode: "retrofit"

**Agent Task:**
"You are the Document Migration Specialist.

**Mission:** Safely migrate existing documents from old structure to new IRL-based structure.

**Current Situation:**
- Old structure exists at: {data_room_path}
- New IRL structure created with categories: {{list_new_folders}}
- IRL requirements loaded from: {irl_checklist_path}

**Your Instructions:**

1. **Create Safety Snapshot**
   - Snapshot location: {data_room_path}/.snapshots/{{current_timestamp}}/
   - Copy entire current structure
   - Create snapshot metadata file
   - Verify snapshot integrity

2. **Analyze Existing Documents**
   - Scan {data_room_path} recursively (exclude .snapshots/, irl/, new structure folders)
   - For each document, extract: path, filename, extension, size
   - Build complete document inventory

3. **Intelligent Mapping**
   - Load IRL structure from {irl_checklist_path}
   - For each document, determine best IRL category mapping
   - Use filename patterns, folder context, extension
   - Assign confidence: HIGH (90%+), MEDIUM (70-90%), LOW (<70%)
   - Generate migration plan

4. **Present Migration Plan**
   Show user the mapping with confidence levels
   Request approval for medium/low confidence items
   Allow manual adjustments

5. **Execute Safe Migration**
   - COPY (not move) files to new locations
   - Verify each copy succeeded
   - Track success/failures
   - Update IRL checklist status for migrated docs

6. **Archive Old Structure**
   - Move old folders to: {data_room_path}/.archive/{{timestamp}}-pre-migration/
   - Do NOT delete anything
   - Preserve for rollback

7. **Generate Report**
   Return summary with:
   - Documents migrated count
   - Snapshot location
   - Archive location
   - Rollback script
   - Updated IRL completion percentage

**Safety Rules:**
- Create snapshot BEFORE any changes
- Never delete, only copy and archive
- Require approval for uncertain mappings
- Provide complete rollback instructions

Return concise summary only (max 2000 tokens)."
</action>

<action>Receive migration specialist summary and present to user:

"{{migration_summary_from_specialist}}"

The migration is complete! Your documents have been safely moved to the new IRL structure.
</action>

<ask>Does the migration look correct?
[Y] Yes - Confirm and archive the old structure
[R] Rollback - Undo migration and restore original
[I] Inspect - Let me check some files first
</ask>

<action if="rollback-requested">Execute rollback:
- Follow rollback script provided by migration specialist
- Restore from snapshot
- Remove new IRL structure
- Confirm restoration successful

"✅ Rollback complete. Your original structure has been restored.

You can try migration again anytime by running this workflow."

Exit workflow.
</action>

<action if="user-confirms-migration">Finalize migration:

"✅ **Migration Confirmed!**

Your documents are now organized in the IRL structure:
- {{migrated_count}} documents successfully placed
- IRL tracking updated: {{completion_percentage}}% complete
- Old structure archived at: {{archive_location}}

**Safety Net:**
- Snapshot preserved at: {{snapshot_location}}
- Rollback script saved at: {{rollback_script_path}}
- You can rollback anytime within 30 days

The archived old structure will be automatically purged after 30 days unless you set KEEP flag."
</action>
</step>

<step n="4" goal="Save IRL for future use">
<action>Store IRL in structured format:

**Create:** {data_room_path}/irl/irl-checklist.yaml

**Format:**
```yaml
# IRL Checklist - Generated from setup
# Date: {current_date}
# Deal: {deal_name}

metadata:
  source: "{irl_source}"
  date_created: "{current_date}"
  total_categories: X
  total_documents: Y
  format: "excel" | "pdf" | "standard" | "custom"

categories:
  - id: 1
    name: "Financial Information"
    folder: "1-financial-information"
    priority: "high"
    documents:
      - id: 1.1
        name: "Audited Financial Statements"
        subfolder: "audited-financials"
        priority: "high"
        status: "pending"
        required_files:
          - "2023-audited-financials.pdf"
          - "2022-audited-financials.pdf"
          - "2021-audited-financials.pdf"
      - id: 1.2
        name: "Management Accounts"
        subfolder: "management-accounts"
        priority: "high"
        status: "pending"

  - id: 2
    name: "Legal Documents"
    folder: "2-legal-documents"
    priority: "high"
    documents:
      - id: 2.1
        name: "Articles of Incorporation"
        subfolder: "corporate"
        priority: "high"
        status: "pending"

# ... (complete structure)
```
  </action>

<action if="irl-original-provided">Copy original IRL file:
- Save to: {data_room_path}/irl/irl-original.{extension}
- Preserve original format for reference
  </action>

<action>Confirm storage:

"✅ IRL saved successfully!

**Stored:**
- Original IRL: data/deals/irl/irl-original.xlsx
- Parsed checklist: data/deals/irl/irl-checklist.yaml

**Usage:**
- Data room audit will check completeness against this IRL
- Upload tracking will update status automatically
- You can modify the checklist anytime"
  </action>
</step>

<step n="5" goal="Setup auto-update on document upload">
<action>Explain auto-update capability:

"I've configured automatic IRL status updates:

**How it works:**
- Whenever you upload documents to the data room
- The system automatically checks which IRL items are satisfied
- Status updates from 'pending' → 'uploaded'
- Upload timestamp recorded
- Completeness percentage updated

**To manually update:**
Run `/manda:update-irl-status` after uploading documents

**To check current status:**
Run `/manda:check-irl-status` to see detailed progress"
  </action>

<action>Create watcher configuration (for future automation):

**Create:** {data_room_path}/irl/.watcher-config.yaml

```yaml
# Auto-update configuration
watch_paths:
  - "{data_room_path}/**/*"

exclude_patterns:
  - "*/irl/*"
  - "*/.gitkeep"
  - "*/README.md"

on_upload:
  action: "update-irl-status"
  workflow: "{module-root}/workflows/update-irl-status/workflow.yaml"

update_frequency: "realtime"  # or "daily", "manual"
```
  </action>
</step>

<step n="6" goal="Completion summary">
<action if="retrofit_mode=true">Provide retrofit-specific summary:

"🎉 **IRL Tracking Added Successfully!**

**Retrofit Complete:**
- ✅ IRL structure created based on {{irl_source}}
- ✅ {{mapped_count}} existing documents mapped to IRL
- ✅ Initial completion: {{completion_percentage}}%
- ✅ {{gap_count}} gaps identified

**Your Progress:**
- Already uploaded: {{mapped_count}} documents
- High priority still needed: {{high_priority_gaps}} documents
- Medium priority: {{medium_priority_gaps}} documents
- Low priority: {{low_priority_gaps}} documents

**What Changed:**
- Your existing documents are now tracked against the IRL
- You have visibility into what's complete vs. missing
- Progress dashboards are now available
- Automatic gap analysis enabled

**Next Actions:**

1. **Check Your Status**
   ```
   /manda:check-irl-status
   ```
   See your completion dashboard with all the details

2. **Upload Missing Docs**
   Focus on the {{high_priority_gaps}} high-priority gaps
   Then run: `/manda:update-irl-status`

3. **Run Comprehensive Audit** (when ready)
   ```
   /manda:data-room-audit
   ```
   Recommended at 70%+ completion

You now have the visibility needed to complete the remaining items."
</action>

<action if="retrofit_mode=false">Provide comprehensive summary:

"🎉 **IRL-Based Data Room Setup Complete!**

**Summary:**
- ✅ Data room structure created ({X} categories, {Y} folders)
- ✅ IRL checklist saved (original + parsed version)
- ✅ Upload documentation generated
- ✅ Auto-update configured

**Your Data Room:**
```
{data_room_path}/
├── irl/
│   ├── irl-original.xlsx
│   └── irl-checklist.yaml
├── 1-category/
├── 2-category/
└── README.md
```

**Next Actions:**

1. **Upload Documents**
   - Add files to appropriate category folders
   - Follow naming guidelines in README.md

2. **Track Progress**
   ```
   /manda:check-irl-status
   ```

3. **Update Status** (if auto-update doesn't run)
   ```
   /manda:update-irl-status
   ```

4. **Run Audit** (when ready)
   ```
   /manda:data-room-audit
   ```

The data room audit will now check completeness against YOUR IRL, not a generic checklist!

**Questions?** I'm here to help!"
  </action>
</step>

</workflow>
