const fs = require("fs");

async function main() {
  const username = "xeno_1122";

  const response = await fetch(
    `https://www.codewars.com/api/v1/users/${username}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Codewars data");
  }

  const data = await response.json();

  const rank = data.ranks.overall.name;
  const honor = data.honor;
  const completed = data.codeChallenges.totalCompleted;

  const section = `<!-- CODEWARS:START -->

🏆 Rank: ${rank}
⭐ Honor: ${honor}
✅ Completed Katas: ${completed}

<!-- CODEWARS:END -->`;

  const readme = fs.readFileSync("README.md", "utf8");

  const updatedReadme = readme.replace(
    /<!-- CODEWARS:START -->[\s\S]*<!-- CODEWARS:END -->/,
    section,
  );

  fs.writeFileSync("README.md", updatedReadme);

  console.log("README updated successfully!");
}

main().catch(console.error);
