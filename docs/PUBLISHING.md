# Publishing the guide

The repository remains private and the site is not deployed. Publishing the site and making the repository public are separate decisions. A Spoilers section is a browsing choice, not access control: anyone with the published datasets or repository can read the underlying entries.

## Publication decisions

Original code, documentation and editorial contributions use MIT. Game artwork and text remain included, attributed, and explicitly excluded from that license; no ownership or permission from their rights holders is claimed. See LICENSE and THIRD_PARTY_NOTICES.md. The maintainer has authorized public website publication. Repository visibility remains a separate decision.

Before changing repository visibility, review its complete history for personal information, local paths and unintended files. Spoilers are a browsing choice, not access control: published datasets contain their underlying entries.

## Recommended hosting

GitHub Pages fits this site: it consists of prebuilt HTML, CSS, images and JSON, with no application server. The expected project URL is https://kellan.github.io/outlanders2-wiki/ once Pages is configured and deployed. This is a proposed URL, not an existing deployment.

The simplest initial path uses a `gh-pages` branch containing the contents of `dist/`. It does not require uploading a custom Actions workflow, which the current GitHub CLI authorization cannot do. GitHub still runs its managed Pages deployment internally.

## Prepare a release

Run these from the repository root:

```
npm run build
npm test
```

Review the generated pages locally with `npm run dev`. Commit the source changes and regenerated `dist/` together, and push the source branch. The build creates `dist/.nojekyll` so Pages serves these static files without treating them as a Jekyll project.

To publish the reviewed build, run:

```
git subtree split --prefix dist
```

Copy the commit ID printed by that command, then use it in place of COMMIT below:

```
git push origin COMMIT:gh-pages
```

This creates or advances a publishing branch containing just the generated site. Do not force-push if GitHub rejects it; inspect the remote branch and reconcile its history first.

In GitHub, open Settings → Pages. Select “Deploy from a branch,” choose `gh-pages`, and choose `/ (root)`. Save. `dist/` itself is not an available Pages source-folder choice on `main`; the supported folder choices are root and `/docs`.

After deployment completes, check the home page, a deep crop URL, a scenario, a research page, Contribute, Spoilers, and image links. Confirm HTTPS. Repeat the build, tests, commit and subtree publication for later releases.

## Automation later

A custom Actions workflow could build and test changes automatically and publish only approved releases. Adding it requires an authorization method permitted to upload workflow files. No workflow or public deployment is enabled by this change.

## outlanders2wiki.com — second stage

The domain currently uses registrar-servers.com nameservers. After the default Pages site is verified, configure DNS at the domain’s DNS provider:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | kellan.github.io |

Replace conflicting parking/web forwarding records for these hosts; preserve mail and other unrelated records. Verify domain ownership in GitHub account Settings → Pages using the exact TXT record GitHub provides. Then set the repository Pages custom domain to outlanders2wiki.com, preserve a CNAME file containing that name in the generated build, and enable Enforce HTTPS once the certificate is ready. Verify both apex and www and a deep article URL. Do not add the project path to the DNS CNAME value.

DNS and custom-domain settings have not been changed yet.

[GitHub custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)


## Official documentation

- [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
