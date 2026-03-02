import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configuration for different modules (Admin, Portal)
 */
const CONFIG = [
    {
        name: 'Admin',
        srcDir: path.resolve(__dirname, '../src/admin'),
        localesDir: path.resolve(__dirname, '../public/locales/admin'),
        pattern: /getValue\(['"](.+?)['"]\)/g,
        files: ['ar.json', 'en.json']
    },
    {
        name: 'Portal',
        srcDir: path.resolve(__dirname, '../src/portal'),
        localesDir: path.resolve(__dirname, '../public/locales/portal'),
        pattern: /t\(['"](.+?)['"]\)/g,
        files: ['ar.json', 'en.json']
    }
];

/**
 * Recursively find all files in a directory
 */
function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.resolve(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(fullPath));
        } else {
            if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

/**
 * Extract translation keys from a list of files using a regex pattern
 */
function extractKeys(files, pattern) {
    const keys = new Set();
    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        let match;
        // Reset regex state since it has 'g' flag
        pattern.lastIndex = 0;
        while ((match = pattern.exec(content)) !== null) {
            if (match[1] && !match[1].includes('${')) { // Skip dynamic keys
                keys.add(match[1]);
            }
        }
    });
    return Array.from(keys).sort();
}

/**
 * Sync keys to a JSON locale file
 */
function syncLocaleFile(filePath, keys) {
    let localeData = {};
    if (fs.existsSync(filePath)) {
        try {
            localeData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            console.error(`Error parsing ${filePath}:`, e.message);
            return;
        }
    }

    let addedCount = 0;
    keys.forEach(key => {
        if (!(key in localeData)) {
            localeData[key] = key; // Use key as default value
            addedCount++;
        }
    });

    if (addedCount > 0) {
        // Sort keys alphabetically
        const sortedData = {};
        Object.keys(localeData).sort().forEach(k => {
            sortedData[k] = localeData[k];
        });

        fs.writeFileSync(filePath, JSON.stringify(sortedData, null, 2), 'utf8');
        console.log(`Updated ${path.basename(filePath)}: Added ${addedCount} new keys.`);
    } else {
        console.log(`${path.basename(filePath)} is up to date.`);
    }
}

/**
 * Main execution
 */
function main() {
    console.log('Starting Translation Sync...');

    CONFIG.forEach(module => {
        console.log(`\nProcessing ${module.name}...`);

        if (!fs.existsSync(module.srcDir)) {
            console.warn(`Source directory not found: ${module.srcDir}`);
            return;
        }

        const files = getFiles(module.srcDir);
        const keys = extractKeys(files, module.pattern);
        console.log(`Found ${keys.length} unique keys in ${module.name} source code.`);

        if (!fs.existsSync(module.localesDir)) {
            console.warn(`Locales directory not found: ${module.localesDir}`);
            return;
        }

        module.files.forEach(fileName => {
            const filePath = path.join(module.localesDir, fileName);
            syncLocaleFile(filePath, keys);
        });
    });

    console.log('\nTranslation Sync Completed!');
}

main();
