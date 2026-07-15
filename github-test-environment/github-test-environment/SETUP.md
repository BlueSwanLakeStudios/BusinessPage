# GitHub test environment setup

Copy the `.github` and `.devcontainer` folders into the root of your repository.

## 1. Create the test branch

```bash
git checkout -b test
git add .
git commit -m "Add GitHub test environment"
git push -u origin test
```

## 2. Enable GitHub Pages

In the GitHub repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.

Every push to `test` will lint and build the app, then deploy it to:

```text
https://YOUR-GITHUB-OWNER.github.io/YOUR-REPOSITORY/
```

## 3. Use the browser development environment

Open **Code → Codespaces → Create codespace**. In its terminal, run:

```bash
npm run dev -- --host 0.0.0.0
```

Open the forwarded port 5173 when GitHub prompts you.

## Notes

- The workflow uses Node.js 22 because the current Vite/ESLint dependency set requires a modern Node.js version.
- GitHub Pages hosts one active site for this repository. This configuration treats the `test` branch as that test site.
- The automatic validation currently runs ESLint and a production build. Add a unit-test script later if you introduce Vitest, Jest, or another test framework.
