#!/bin/bash

# M&A Deal Intelligence Platform - New Deal Setup Script
# Creates a fresh instance for a new deal with complete directory structure

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory (where manda module is)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
MODULE_DIR="$SCRIPT_DIR"

echo ""
echo "======================================================================"
echo "  M&A Deal Intelligence Platform - New Deal Setup"
echo "======================================================================"
echo ""

# Get deal name from user
if [ -z "$1" ]; then
    echo -e "${YELLOW}Enter deal name (e.g., 'acme-acquisition'):${NC}"
    read -r DEAL_NAME
else
    DEAL_NAME="$1"
fi

# Sanitize deal name (remove spaces, special chars)
DEAL_NAME=$(echo "$DEAL_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g')

if [ -z "$DEAL_NAME" ]; then
    echo -e "${RED}Error: Deal name cannot be empty${NC}"
    exit 1
fi

# Get target directory from user (or use default)
if [ -z "$2" ]; then
    echo -e "${YELLOW}Enter target directory (default: ./deals/${DEAL_NAME}):${NC}"
    read -r TARGET_DIR
    if [ -z "$TARGET_DIR" ]; then
        TARGET_DIR="./deals/${DEAL_NAME}"
    fi
else
    TARGET_DIR="$2"
fi

# Convert to absolute path
TARGET_DIR=$(cd "$(dirname "$TARGET_DIR")" 2>/dev/null && pwd)/$(basename "$TARGET_DIR") || TARGET_DIR="$PWD/$TARGET_DIR"

echo ""
echo -e "${BLUE}Deal Name:${NC} $DEAL_NAME"
echo -e "${BLUE}Target Directory:${NC} $TARGET_DIR"
echo ""

# Check if directory already exists
if [ -d "$TARGET_DIR" ]; then
    echo -e "${RED}Warning: Directory already exists: $TARGET_DIR${NC}"
    echo -e "${YELLOW}Overwrite? (y/N):${NC}"
    read -r OVERWRITE
    if [ "$OVERWRITE" != "y" ] && [ "$OVERWRITE" != "Y" ]; then
        echo "Setup cancelled."
        exit 0
    fi
    rm -rf "$TARGET_DIR"
fi

echo -e "${GREEN}Creating new deal environment...${NC}"
echo ""

# Create base directory
mkdir -p "$TARGET_DIR"

# Copy manda module
echo "📦 Copying M&A module..."
cp -r "$MODULE_DIR" "$TARGET_DIR/manda"

# Create minimal directory structure (folders will be created by IRL setup workflow)
echo "📁 Creating base directories..."
mkdir -p "$TARGET_DIR/data/deals"
mkdir -p "$TARGET_DIR/data/knowledge-base"
mkdir -p "$TARGET_DIR/output"

# Create upload area structure
echo "📤 Creating upload area..."
mkdir -p "$TARGET_DIR/data/deals/upload/pending"
mkdir -p "$TARGET_DIR/data/deals/upload/processed"
mkdir -p "$TARGET_DIR/data/deals/upload/review"
mkdir -p "$TARGET_DIR/data/deals/upload/failed"

# Create deal-specific config
echo "⚙️  Creating deal configuration..."
cat > "$TARGET_DIR/deal-config.yaml" << EOF
# Deal Configuration
# Generated: $(date)

deal:
  name: "$DEAL_NAME"
  type: "acquisition"  # Options: acquisition | sale | merger
  created: "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

target_company:
  name: ""  # Fill in target company name
  industry: ""
  revenue: ""
  employees: ""

team:
  lead: "$USER"
  members: []

paths:
  data_room: "./data/deals"
  output: "./output"
  knowledge_base: "./data/knowledge-base"
EOF

# Create .gitignore
cat > "$TARGET_DIR/.gitignore" << EOF
# Data and outputs (deal-specific, don't commit)
data/deals/*
data/knowledge-base/*
output/*

# Keep directory structure
!data/deals/.gitkeep
!data/knowledge-base/.gitkeep
!output/.gitkeep

# Temporary files
*.tmp
*.log
.DS_Store

# Sensitive
*.env
secrets/
EOF

# Create .gitkeep files to preserve directory structure
touch "$TARGET_DIR/data/deals/.gitkeep"
touch "$TARGET_DIR/data/knowledge-base/.gitkeep"
touch "$TARGET_DIR/output/.gitkeep"

echo ""
echo "======================================================================"
echo -e "${GREEN}✅ Deal environment created successfully!${NC}"
echo "======================================================================"
echo ""
echo -e "${BLUE}Location:${NC} $TARGET_DIR"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo ""
echo "  1. Navigate to deal directory:"
echo "     ${GREEN}cd $TARGET_DIR${NC}"
echo ""
echo "  2. Upload documents (two options):"
echo "     ${GREEN}# Drop files in upload area for auto-classification:${NC}"
echo "     ${GREEN}cp your-documents.pdf data/deals/upload/pending/${NC}"
echo "     ${GREEN}# Or place directly in categories if you know the structure${NC}"
echo ""
echo "  3. Configure deal (optional):"
echo "     ${GREEN}nano deal-config.yaml${NC}"
echo ""
echo "  4. Start analysis - activate the orchestrator in your Claude interface"
echo ""
echo "======================================================================"
echo ""
echo -e "${YELLOW}Structure created:${NC}"
echo "  ✓ M&A module (manda/)"
echo "  ✓ Data room (data/deals/)"
echo "  ✓ Upload area (data/deals/upload/) - Ready for documents!"
echo "  ✓ Knowledge base (data/knowledge-base/)"
echo "  ✓ Output directories (output/)"
echo "  ✓ Deal configuration (deal-config.yaml)"
echo "  ✓ Documentation (README.md)"
echo ""
echo -e "${GREEN}Ready for deal analysis!${NC} 🎉"
echo ""
