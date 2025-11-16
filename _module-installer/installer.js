/**
 * M&A Deal Intelligence Platform - Standalone Installer
 *
 * Custom installation logic for setting up the M&A platform with proper
 * directory structure, knowledge base initialization, and template configuration.
 */

const fs = require('fs');
const path = require('path');

class MandaModuleInstaller {
  constructor(config) {
    this.config = config;
    this.projectRoot = config.projectRoot || process.cwd();
    // Module root is the project root (standalone installation)
    this.moduleRoot = this.projectRoot;
  }

  /**
   * Main installation entry point
   */
  async install() {
    console.log('🚀 Installing M&A Deal Intelligence Platform...\n');

    try {
      await this.validatePrerequisites();
      await this.createDirectoryStructure();
      await this.initializeKnowledgeBase();
      await this.setupOutputDirectories();
      await this.validateAgentFiles();
      await this.displayPostInstallInstructions();

      console.log('\n✅ M&A Deal Intelligence Platform installed successfully!\n');
      return { success: true };
    } catch (error) {
      console.error('\n❌ Installation failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Validate installation prerequisites
   */
  async validatePrerequisites() {
    console.log('🔍 Validating prerequisites...');

    // Check Node.js version
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));
    if (majorVersion < 16) {
      throw new Error(`Node.js 16+ required. Current version: ${nodeVersion}`);
    }

    // Check project structure
    if (!fs.existsSync(this.projectRoot)) {
      throw new Error(`Project root not found: ${this.projectRoot}`);
    }

    console.log('  ✓ Prerequisites validated');
  }

  /**
   * Create module directory structure
   */
  async createDirectoryStructure() {
    console.log('\n📁 Creating directory structure...');

    const directories = [
      // Data room root (structure will be created by IRL workflow)
      this.config.data_room_path,

      // Upload area for document processing
      path.join(this.config.data_room_path, 'upload'),
      path.join(this.config.data_room_path, 'upload', 'pending'),
      path.join(this.config.data_room_path, 'upload', 'processed'),
      path.join(this.config.data_room_path, 'upload', 'archived'),

      // Knowledge base structure
      this.config.knowledge_base_path,
      path.join(this.config.knowledge_base_path, 'vector-store'),
      path.join(this.config.knowledge_base_path, 'structured-data'),
      path.join(this.config.knowledge_base_path, 'metadata'),

      // Output directories
      this.config.output_location,
      path.join(this.config.output_location, 'reports'),
      path.join(this.config.output_location, 'storylines'),
      path.join(this.config.output_location, 'cims'),
      path.join(this.config.output_location, 'teasers'),
    ];

    for (const dir of directories) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`  ✓ Created: ${path.relative(this.projectRoot, dir)}`);
      } else {
        console.log(`  • Exists: ${path.relative(this.projectRoot, dir)}`);
      }
    }
  }

  /**
   * Initialize knowledge base (no README creation)
   */
  async initializeKnowledgeBase() {
    console.log('\n📚 Initializing knowledge base...');
    console.log('  ✓ Knowledge base directories ready');
  }

  /**
   * Setup output directories (no README creation)
   */
  async setupOutputDirectories() {
    console.log('\n📄 Setting up output directories...');
    console.log('  ✓ Output directories ready');
  }

  /**
   * Validate that all agent files exist and are properly formatted
   */
  async validateAgentFiles() {
    console.log('\n🤖 Validating agent files...');

    const requiredAgents = [
      'deal-orchestrator.agent.yaml',
      'information-vault.agent.yaml',
      'company-analyst.agent.yaml',
      'finance-analyst.agent.yaml',
      'story-architect.agent.yaml'
    ];

    const agentsDir = path.join(this.moduleRoot, 'agents');

    for (const agentFile of requiredAgents) {
      const agentPath = path.join(agentsDir, agentFile);
      if (!fs.existsSync(agentPath)) {
        throw new Error(`Missing agent file: ${agentFile}`);
      }
      console.log(`  ✓ ${agentFile}`);
    }
  }

  /**
   * Display post-installation instructions
   */
  async displayPostInstallInstructions() {
    console.log('\n' + '='.repeat(70));
    console.log('📋 POST-INSTALLATION INSTRUCTIONS');
    console.log('='.repeat(70));
    console.log(`
Next Steps:

1. 📂 Upload Deal Documents
   → Add documents to: ${path.relative(this.projectRoot, this.config.data_room_path)}
   → Organize by category (financials, legal, operational, commercial, strategic)

2. 🚀 Activate the Module
   → Run: /manda:deal-orchestrator
   → This starts the Deal Orchestrator (primary interface)

3. 🔍 Run Initial Analysis
   → Data Room Audit: /manda:data-room-audit
   → This scans all documents and identifies gaps

4. 📖 Develop Investment Storyline
   → Storyline Workshop: /manda:investment-storyline-workshop
   → Interactive process to create compelling narrative

Configuration Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Data Room:              ${this.config.data_room_path}
Knowledge Base:         ${this.config.knowledge_base_path}
Output Location:        ${this.config.output_location}
Template Style:         ${this.config.template_preference}
Inconsistency Detection: ${this.config.inconsistency_sensitivity}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Available Agents:
  • Deal Orchestrator     - Primary user interface and coordinator
  • Information Vault     - RAG-powered data retrieval engine
  • Company Analyst       - Business intelligence specialist
  • Finance Analyst       - Financial analysis and valuation
  • Story Architect       - Narrative development for CIMs

Available Workflows:
  • data-room-audit              - Comprehensive data room analysis
  • investment-storyline-workshop - Interactive storyline development

Documentation:
  • Module README: ${path.join(this.moduleRoot, 'README.md')}
  • RAG Implementation Guide: ${path.join(this.moduleRoot, 'agents', 'information-vault-rag-implementation.md')}

Need Help?
  • View agent capabilities: Check agent YAML files in ${path.join(this.moduleRoot, 'agents')}
  • Workflow documentation: Check instructions.md in workflow directories
`);
    console.log('='.repeat(70) + '\n');
  }
}

/**
 * Installation entry point
 */
async function install(config) {
  const installer = new MandaModuleInstaller(config);
  return await installer.install();
}

module.exports = { install };
