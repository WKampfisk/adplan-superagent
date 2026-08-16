# AdPlan Superagent

Base44-hosted planner that turns a brief into a durable project plan: plot spine, image/video/text/audio prompt packs, app and payment deep-links, and the **cheapest eligible workflow** that still meets quality and platform constraints.

The planner **does not spend**. Confirm via `selectWorkflow` first. Pixels, InVideo, RunComfy, and Stripe live in the apps this repo points at.

## Live hosts

| Surface | URL |
|---------|-----|
| VideoAdCreator (host app) | https://cryptic-ad-motion-lab.base44.app |
| Studio | https://cryptic-ad-motion-lab.base44.app/studio |
| Implementation repo | https://github.com/WKampfisk/VideoAdCreator |
| MarketForge (paste workflow prompt) | https://market-forge-100a8936.base44.app |
| MediaWizard (local execute) | https://github.com/WKampfisk/MediaWizard |

App id: `6a7ac3508c7d7cde5928ecdf`

## What this repo is

Documentation and operator skill for AdPlan. Runtime code ships on stacked branches in [VideoAdCreator](https://github.com/WKampfisk/VideoAdCreator) (`execute-plan/23bb9ab2-*`).

| Path | Role |
|------|------|
| [docs/design-adplan-superagent.md](docs/design-adplan-superagent.md) | Approved design (rev 5) |
| [docs/stack.md](docs/stack.md) | Implementation branch stack |
| [skills/ad-plan-superagent/SKILL.md](skills/ad-plan-superagent/SKILL.md) | Grok TUI `/ad-plan` skill |

## How it works

1. Ingest a brief (product, platforms, budget, quality floor, formats).
2. Enforce plot-first, payoff + one CTA (`evaluatePlanCoherence`).
3. Rank fixed recipes: still-only Imagine, stills→i2v, InVideo handoff, HappyHorse, etc.
4. Default = cheapest eligible path. Always show Fast / Cheap / Quality.
5. Emit ready-to-run prompt packs (not advice).
6. Deep-link Studio, MediaWizard payloads, MarketForge, FitFam `/pricing`.
7. Operator confirms a recipe. Then `/ai-build`, Studio, or MediaWizard execute.

Memorial / tribute briefs route to `memorial-video` (silent or licensed audio only).

## Operator

```text
/ad-plan
```

Install the skill from `skills/ad-plan-superagent/SKILL.md` into `~/.grok/skills/ad-plan-superagent/`.

Requires `npx base44 whoami` against VideoAdCreator. The skill probes `host_profile` (GPU, Imagine session, secret **names**) and never infers Imagine from `XAI_API_KEY`.

## Flags (in VideoAdCreator `src/lib/adPlanFlags.js`)

| Flag | Default | Effect |
|------|---------|--------|
| `ADPLAN_UI` | on (dogfood) | `/plan` nav |
| `ADPLAN_AGENT` | off | Hosted `ad_plan_superagent` chat |
| `ADPLAN_PAYMENT_LINKS` | off | FitFam / FungaDex redirects |
| `ADPLAN_PROMOTE_TO_VIDEO_PROJECT` | off | Library metadata only |
| `ADPLAN_EMIT_RHAI` | off | TUI may write `~/.grok/workflows/` |
| `ADPLAN_X_ADS_DRAFT` | off | PAUSED X Ads drafts only |
| `ADPLAN_VAC_CREDITS` | off | Planner stays free |

## License

Private product docs unless noted otherwise in VideoAdCreator.
