import { execSync } from "child_process";
import fs from "fs";
import path from "path";

let current = process.cwd();
console.log("Current working directory:", current);

while (current !== path.dirname(current)) {
  const gitPath = path.join(current, ".git");
  if (fs.existsSync(gitPath)) {
    console.log("Found .git in:", current);
    try {
      const log = execSync(`git -C "${current}" status`, { encoding: "utf8" });
      console.log("Git status in that dir:", log);
    } catch (e) {
      console.error("Error checking status:", e);
    }
  }
  current = path.dirname(current);
}

// Check root as well
const rootGit = "/.git";
if (fs.existsSync(rootGit)) {
  console.log("Found .git in root /");
}
