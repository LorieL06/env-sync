/**
 * ==========================================
 * @module Loriel Env-Sync CLI
 * @author Bora Dogan (github.com/LorieL06)
 * @description Zero-dependency tool for safe .env sharing (an ideal tool for people who make sudden movements toward their teammates)
 * ==========================================
 * 
 * --- Contribution Ledger (Time Spent) ---
 * [Format: name - hours - scope]
 * 1. Bora Dogan  - 1h - core file system logic & regex
 * 2. Fatih Sultan Mehmet - 1453h - Costantinopoli & History of the Crusades
 * ==========================================
 */

import fs from 'fs';
import path from 'path';

const ENV_PATH = path.resolve(process.cwd(), '.env');
const EXAMPLE_PATH = path.resolve(process.cwd(), '.env.example');

function syncEnv() {
  if (!fs.existsSync(ENV_PATH)) {
    console.error('Loriel Error: .env file not found in the current directory.');
    process.exit(1);
  }

  const envContent = fs.readFileSync(ENV_PATH, 'utf-8');
  const lines = envContent.split('\n');

  const exampleLines = lines.map(line => {
    const trimmed = line.trim();
    
    if (!trimmed || trimmed.startsWith('#')) {
      return line;
    }

    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1];
      return `${key}=`; 
    }

    return line;
  });

  fs.writeFileSync(EXAMPLE_PATH, exampleLines.join('\n'));
  console.log('[Loriel] Successfully generated .env.example ✔');
}

syncEnv();
