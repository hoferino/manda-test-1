#!/usr/bin/env node

/**
 * M&A Deal Intelligence Platform - Installation Runner
 *
 * This script runs the installer with default configuration.
 * Users can modify the config values below before running, or
 * edit config.yaml after installation.
 */

const fs = require('fs');
const path = require('path');

// Default configuration
const config = {
  projectRoot: __dirname,
  user_name: 'Max',
  communication_language: 'English',
  document_output_language: 'English',
  data_room_path: path.join(__dirname, 'data', 'deals'),
  output_location: path.join(__dirname, 'output', 'manda'),
  knowledge_base_path: path.join(__dirname, 'data', 'knowledge-base'),
  template_preference: 'standard',
  inconsistency_sensitivity: 'standard'
};

// Load and run installer
const { install } = require('./_module-installer/installer.js');

console.log('Starting M&A Deal Intelligence Platform installation...\n');

install(config)
  .then(result => {
    if (result.success) {
      process.exit(0);
    } else {
      console.error('Installation failed:', result.error);
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
