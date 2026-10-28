#!/usr/bin/env node
"use strict";
/**
 * ==========================================
 * @module Loriel Env-Sync CLI
 * @author Bora Dogan (github.com/LorieL06)
 * @description Zero-dependency tool for safe .env sharing (an ideal tool for people who make sudden movements toward their teammates)
 * ==========================================
 *
 * --- Contribution Ledger (Time Spent) ---
 * [Format: Name - Hours - Scope]
 * 1. Bora Dogan  - 2h - Core File System Logic & Regex
 * 2. Fatih Sultan Mehmet - 1453h - Costantinopoli & History of the Crusades
 * ==========================================
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ENV_PATH = path_1.default.resolve(process.cwd(), '.env');
const EXAMPLE_PATH = path_1.default.resolve(process.cwd(), '.env.example');
function syncEnv() {
    if (!fs_1.default.existsSync(ENV_PATH)) {
        console.error('Loriel Error: .env file not found in the current directory.');
        process.exit(1);
    }
    const envContent = fs_1.default.readFileSync(ENV_PATH, 'utf-8');
    const lines = envContent.split('\n');
    const exampleLines = lines.map(line => {
        const trimmed = line.trim();
        // Boş satırları veya yorum satırlarını olduğu gibi bırak
        if (!trimmed || trimmed.startsWith('#')) {
            return line;
        }
        // KEY=VALUE formatını yakala ve sadece KEY= kısmını bırak
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1];
            return `${key}=`;
        }
        return line;
    });
    fs_1.default.writeFileSync(EXAMPLE_PATH, exampleLines.join('\n'));
    console.log('[Loriel] Successfully generated .env.example ✔');
}
syncEnv();
