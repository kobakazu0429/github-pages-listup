# github-pages-listup

## Usage

1. Create a personal access token with the `repo` scope.

- https://github.com/settings/tokens?type=beta
- Repository access: All repositories
- Permissions: Pages: Read-only

2. Run

```sh
deno run \
  --allow-env=HOME \
  --allow-net=api.github.com \
  https://raw.githubusercontent.com/kobakazu0429/github-pages-listup/master/index.ts \
  --token=<YOUR_TOKEN_HERE>
```
