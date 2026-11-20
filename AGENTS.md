# Notes for agents working on this repository

Read CONTRIBUTING.md and the standard in docs/EDITORIAL-CLEANUP-PLAN.md first. These are working habits that came out of review.

- **Answer the question you were asked first.** If the maintainer asks a question, give the answer from the data before starting fixes or extra work, and offer the extra work rather than doing it in place of the answer.
- **Number from GitHub, not memory.** Pull requests and issues share one sequence, and other agents open PRs too. Check the latest issue and PR numbers right before naming `changelog/unreleased/`, `content-notes/` and `scripts/checks/` files.
- **Start from the latest `main`.** Fetch before branching. If another agent changed the same page, build on their version.
- **Rebuild before you trust a check.** `npm run build`, then `npm test`. Checks read the built data, so a stale build can pass or fail for the wrong reason. Don't push until the full suite passes on what you are pushing.
- **Keep checking-mechanics out of reader text.** How a fact was verified goes in the content note or the PR description, not on the page (see the standard).
- **Phone-short messages.** The maintainer often reads on a phone: lead with the answer, keep lists short, put detail in the PR.
- **Stay in your lane on data.** Raw game data, level files and snapshots stay in the private research repo. Spoilers follow `content/spoilers.json`. Players stay unnamed.
