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
  if (production) assertApiUrl(normalized.apiUrl);
  const content = `export const environment = ${JSON.stringify(
    Object.assign({ production }, normalized),
    null,
    2,
  )};\n`;
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log('Wrote', targetPath);
}

/**
 * Fails the production build early rather than shipping a bundle that calls a fake API.
 * Accepts an absolute URL (https://api.host) or a root-relative path (/api, served by the
 * same site through a proxy). A path without the leading "/" would resolve against the
 * locale base href (/fr-CA/api) and is refused.
 */
function assertApiUrl(value) {
  if (typeof value === 'string' && /^\/[A-Za-z0-9._~\/-]*$/.test(value) && !value.startsWith('//'))
    return;
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(
      `API_URL "${value ?? ''}" is missing or invalid for the production build. Use an absolute ` +
        'URL (https://api.host) or a path starting with "/" (e.g. /api), set in the hosting ' +
        'environment variables (Vercel > Settings > Environment Variables).',
    );
  }
  if (url.hostname.endsWith('example.com'))
    throw new Error(`API_URL is still the placeholder ${url.origin}: set the real backend URL.`);
}

/** Only the keys the app reads, so unrelated machine variables never reach the bundle. */
const APP_KEYS = ['API_URL', 'AUTH_TOKEN_NAME'];

function fromProcessEnv() {
  return Object.fromEntries(
    APP_KEYS.filter((key) => process.env[key]).map((key) => [key, process.env[key].trim().replace(/\/+$/, '')]),
  );
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

// Precedence: hosting environment variables > .env.production > .env
const hostEnv = fromProcessEnv();

generate(Object.assign({}, devEnv, hostEnv), path.join(root, 'src', 'environments', 'environment.ts'), false);
generate(
  Object.assign({}, devEnv, prodEnv, hostEnv),
  path.join(root, 'src', 'environments', 'environment.prod.ts'),
  true,
);
