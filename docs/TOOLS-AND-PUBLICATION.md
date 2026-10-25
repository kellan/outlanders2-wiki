# Tools and repository boundaries

## Public-facing site repository

The site generator, per-entry content format, contribution validator, content finder, route checker, local preview generator and reader/research separation are useful reusable work. They are original project code and can be separated from game assets. They currently live in `scripts/` and `src/`.

Original code is now MIT-licensed. There is currently no blanket license granting reuse of all repository contents. Extracted game images and localized text must not be covered by an original-code license.

A useful public repository would contain the renderer, documented content format, validation, contribution templates, original explanatory writing, and the gameplay facts approved for publication. A reusable tool release should use synthetic fixtures rather than proprietary level binaries or copied game text.

## Extraction research tooling

The earlier research workspace contains additional tools not included in this site repository:

| Tool | What it does | Suggested treatment |
|---|---|---|
| `probe.py`, `world_decode.py` | Parse hashed, length-prefixed records and per-file world layouts | Good candidates for a cleaned, documented standalone decoder with synthetic tests |
| `extract_objectives.py`, `extract_scenarios.py` | Export exact objectives, compare header/world records, resolve build lists and needs | Keep game-specific adapters in private research initially; export reviewed results to the guide |
| `generator_fixed.py`, `stream_decode.py`, `validate_decoding.py` | Correct Unity MonoBehaviour alignment and validate decode/re-encode results | Potentially reusable, but currently tied to local metadata, versions and generated assemblies; needs portability work |
| `read_metadata.py`, class/catalog scripts | Inventory IL2CPP metadata and game assets | Private research utilities until installation paths, dependencies and inputs are documented |
| Artwork extraction scripts | Recover game sprites and compose previews | Keep with private research pending redistribution decisions |
| Site renderer, link checks and offline preview | Build a static linked reference from JSON | Suitable for the public site repository, under the scoped MIT license |

These extraction scripts are working research tools, not polished packages. Several have hard-coded workspace paths or depend on local dummy assemblies and extracted files. Publishing them as-is would create an unnecessarily difficult setup process.

## Suggested private research repository

A separate private `outlanders2-research` repository would be useful for extraction scripts, environment setup, decoder notes, known schema versions, validation summaries and a repeatable export command. It has not been created.

Keep game executables, large asset bundles, generated/decompiled assemblies, save games, downloaded level caches, credentials and machine-specific logs out of Git. Use ignored local input directories and checksums that identify the tested game version. A private repository is not a substitute for checking rights or protecting personal information.

The research-to-site boundary should be a versioned export with stable IDs, provenance, validation results and explicit uncertainty. Contributors to the guide should not need to install decompilers or own the extraction environment merely to fix wording or submit a gameplay observation.

## Current public-release concerns

The repository contains extracted artwork, screenshots, localized prose, and source-derived exports. Those are the main items to review before changing visibility. A limited local scan did not find obvious credential patterns or personal home paths in the tracked text reviewed, but that is not a comprehensive security or rights audit.

No applicable public fan-content redistribution policy was established during this pass. The recommendation is to resolve the asset/text boundary first, rather than assume that an unofficial disclaimer grants permission. This document records project readiness, not a legal determination.
