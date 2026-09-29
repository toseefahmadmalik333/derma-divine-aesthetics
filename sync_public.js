import fs from 'fs';
import path from 'path';

const rootDir = 'c:\\Users\\Toseef A. Malik\\Desktop\\Derma Divine';
const publicDir = path.join(rootDir, 'public');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      if (!fs.existsSync(destPath) || fs.statSync(srcPath).mtimeMs > fs.statSync(destPath).mtimeMs) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

['brand', 'doctors', 'clinic', 'results', 'video', 'video-frames'].forEach(folder => {
  console.log(`Syncing ${folder} to public/${folder}...`);
  copyDirRecursive(path.join(rootDir, folder), path.join(publicDir, folder));
});

console.log('Public sync finished.');
