const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'src/models');
const files = fs.readdirSync(modelsDir).filter(f => f.endsWith('.ts'));

let markdown = `# Structure Exacte de la Base de Données (Mongoose Schemas)

Voici la structure exacte et complète de tous les modèles de votre base de données, telle qu'elle est définie dans \`src/models/\`. Ces informations vous permettront de créer un fichier "seed" précis.

`;

for (const file of files) {
    const content = fs.readFileSync(path.join(modelsDir, file), 'utf-8');
    const modelName = file.replace('.ts', '');

    markdown += `## 🗃️ Collection : \`${modelName}\`\n\n`;

    // Extract everything from 'const somethingSchema = new Schema(' up to '});' or export type
    // A simple way is to find the Schema block
    let inSchema = false;
    let bracketCount = 0;
    let schemaText = "";
    const lines = content.split('\n');

    for (const line of lines) {
        if (line.includes('new Schema(')) {
            inSchema = true;
            schemaText += line.trim() + "\n";
            // count brackets on this line if any
            bracketCount += (line.match(/{/g) || []).length;
            bracketCount -= (line.match(/}/g) || []).length;
            // also count parentheses for new Schema()
            bracketCount += (line.match(/\(/g) || []).length;
            bracketCount -= (line.match(/\)/g) || []).length;
            continue;
        }

        if (inSchema) {
            schemaText += line + "\n";
            bracketCount += (line.match(/{/g) || []).length;
            bracketCount -= (line.match(/}/g) || []).length;
            bracketCount += (line.match(/\(/g) || []).length;
            bracketCount -= (line.match(/\)/g) || []).length;

            // If we closed everything
            if (bracketCount <= 0 && line.trim().endsWith(');')) {
                inSchema = false;
                break; // we only grab the first (main) schema if there are nested ones, 
                // wait, we should grab them all. Some files have sub-schemas (e.g. varianteSchema)
            }
        }
    }

    // If the parsing above failed or there are multiple schemas (like in Order), grab all `new Schema` until `);`
    // The simplest way to not miss sub-schemas is just to regex out all schema definitions:
    const schemaRegex = /const\s+\w+Schema\s*=\s*new\s+Schema\s*\([\s\S]*?\)\s*;/g;
    let match;
    let allSchemasText = "";
    while ((match = schemaRegex.exec(content)) !== null) {
        allSchemasText += match[0] + "\n\n";
    }

    if (allSchemasText) {
        markdown += "```typescript\n" + allSchemasText + "```\n\n";
    } else {
        // fallback if regex fails
        markdown += "```typescript\n// Structure non reconnue automatiquement. Voir le fichier complet dans src/models/" + file + "\n```\n\n";
    }
}

fs.writeFileSync('c:\\Users\\PERO\\.gemini\\antigravity\\brain\\ce788126-0308-4e39-aa30-d4108154df64\\exact_db_structure.md', markdown);
console.log("Success");
