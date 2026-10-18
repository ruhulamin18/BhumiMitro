const { cpSync, existsSync, mkdirSync } = require('node:fs');
const path = require('node:path');

const standaloneDirectory = path.resolve('.next/standalone');
const staticDirectory = path.resolve('.next/static');
if (!existsSync(staticDirectory)) {
  throw new Error(`Next.js static build output not found: ${staticDirectory}`);
}

const assets = [
  [staticDirectory, path.join(standaloneDirectory, '.next', 'static')],
  [path.resolve('public'), path.join(standaloneDirectory, 'public')],
];

for (const [source, destination] of assets) {
  if (!existsSync(source)) continue;
  mkdirSync(path.dirname(destination), { recursive: true });
  cpSync(source, destination, { recursive: true, force: true });
}
