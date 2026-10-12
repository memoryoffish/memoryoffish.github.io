'use strict';
// Hexo can return exit 0 after an asset renderer logs ERROR. Fail explicitly.
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
for (const command of ['clean', 'generate']) {
  const result = spawnSync(process.execPath, [path.join(root, 'node_modules/hexo/bin/hexo'), command], {
    cwd: root, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024
  });
  const output = (result.stdout || '') + (result.stderr || '');
  process.stdout.write(output);
  if (result.error) throw result.error;
  const plain = output.replace(/\x1b\[[0-9;]*m/g, '');
  if (result.status !== 0 || /^(?:ERROR|FATAL)\b/m.test(plain)) process.exit(1);
}
