import { delay } from "https://deno.land/std@0.212.0/async/delay.ts";
import { Octokit } from "npm:octokit";

const args = Deno.args;
const token = args[0].replaceAll("--token=", "");

const octokit = new Octokit({
  auth: token,
});

type Repo = {
  full_name: string;
  name: string;
  private: boolean;
  has_pages: boolean;
};

const list: Repo[] = [];

let i = 0;
while (true) {
  const repos = await octokit.rest.repos.listForAuthenticatedUser({
    sort: "created",
    per_page: 100,
    page: ++i,
  });

  if (repos.data.length === 0) break;

  const data = repos.data.map((v) => ({
    full_name: v.full_name,
    name: v.name,
    private: v.private,
    has_pages: v.has_pages,
  }));

  list.push(...data);
  console.log(`GET: ${repos.data.length} / TOTAL: ${list.length}`);

  await delay(1000);
  console.log("Sleeping...");
}

const pages = list
  .filter((v) => v.has_pages)
  .map((v) => {
    const owner = v.full_name.split("/")[0];
    return {
      private: v.private,
      repo: `https://github.com/${v.full_name}`.toLowerCase(),
      homepage: `https://${owner}.github.io/${v.name}/`.toLowerCase(),
    };
  });

console.log(pages.length);
pages.forEach((v) => console.log(JSON.stringify(v)));
