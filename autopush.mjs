/**
 * autopush.mjs
 * Watches for file changes and auto-commits + pushes to GitHub.
 * Run with: npm run autopush
 */

import { watch } from "fs";
import { exec } from "child_process";
import { promisify } from "util";
import { join, resolve } from "path";

const execAsync = promisify(exec);
const ROOT = resolve(".");

// Folders to watch for changes
const WATCH_DIRS = ["src", ".storybook", "public"];

// How long to wait after the last change before pushing (ms)
const DEBOUNCE_MS = 5000;

// Files/folders to ignore
const IGNORE = ["node_modules", "storybook-static", ".git", "dist"];

let timer = null;
let pendingChanges = new Set();

function shouldIgnore(filename) {
  if (!filename) return true;
  return IGNORE.some((ig) => filename.includes(ig));
}

function schedulePush(changedFile) {
  if (shouldIgnore(changedFile)) return;

  pendingChanges.add(changedFile);

  if (timer) clearTimeout(timer);
  timer = setTimeout(autopush, DEBOUNCE_MS);
}

async function autopush() {
  const files = [...pendingChanges].join(", ");
  pendingChanges.clear();
  timer = null;

  const timestamp = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const message = `auto: update ${timestamp}`;

  console.log(`\n📦 Changes detected — committing & pushing...`);
  console.log(`   Files: ${files}`);

  try {
    const { stdout: statusOut } = await execAsync("git status --porcelain", { cwd: ROOT });
    if (!statusOut.trim()) {
      console.log("   Nothing to commit.\n");
      return;
    }

    await execAsync("git add -A", { cwd: ROOT });
    await execAsync(`git commit -m "${message}"`, { cwd: ROOT });
    await execAsync("git push origin main", { cwd: ROOT });
    console.log(`   ✅ Pushed: "${message}"\n`);
  } catch (err) {
    console.error("   ❌ Push failed:", err.message, "\n");
  }
}

// Start watchers
for (const dir of WATCH_DIRS) {
  const fullPath = join(ROOT, dir);
  try {
    watch(fullPath, { recursive: true }, (_, filename) => {
      schedulePush(filename);
    });
    console.log(`👀 Watching: ${dir}/`);
  } catch {
    // Directory may not exist yet — skip silently
  }
}

console.log(`\n🚀 Auto-push is active. Save any file to trigger a commit.\n`);
