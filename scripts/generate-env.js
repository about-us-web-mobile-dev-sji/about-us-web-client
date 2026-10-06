const fs = require('fs');
const path = require('path');

function parseEnv(content) {
  const out = {};
  content.split(/\r?\n/).forEach((line) => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    const eq = line.indexOf('=');
    if (eq === -1) return;
    const key = line.substring(0, eq).trim();
    const val = line.substring(eq + 1).trim();
    out[key] = val;
  });
  return out;
}

function generate(envObj, targetPath, production = false) {
  // Normalize common keys for Angular app
  const normalized = Object.assign({}, envObj);
  if (envObj.API_URL && !envObj.apiUrl) normalized.apiUrl = envObj.API_URL;
  if (envObj.API_URL && !envObj.apiUrl) normalized.apiUrl = envObj.API_URL;
  const content = `export const environment = ${JSON.stringify(
    Object.assign({ production }, normalized),
    null,
    2,
  )};\n`;
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log('Wrote', targetPath);
}

function loadEnvFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return '';
  }
}

const root = path.resolve(__dirname, '..');
const devEnv = parseEnv(loadEnvFile(path.join(root, '.env')));
const prodEnv = parseEnv(loadEnvFile(path.join(root, '.env.production')));

generate(devEnv, path.join(root, 'src', 'environments', 'environment.ts'), false);
generate(Object.assign({}, devEnv, prodEnv), path.join(root, 'src', 'environments', 'environment.prod.ts'), true);
