# GitHub Pages validation

- The project URL `https://tanveerhkit.github.io/iyi-stays-rides/` loaded the deployed application shell, but the client router rendered its NotFound screen for the repository-prefixed path.
- The first deployment workflow failed because pnpm was declared both in the workflow and package.json.
- The duplicate workflow declaration was removed and the corrected workflow completed successfully.
- The router was updated with `/iyi-stays-rides` and `/iyi-stays-rides/` guest routes plus `/iyi-stays-rides/admin`.
- A follow-up browser check was made before the latest workflow completed, so the site should be checked again after deployment propagation.
