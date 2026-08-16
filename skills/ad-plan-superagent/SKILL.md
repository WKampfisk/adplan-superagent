---
name: ad-plan-superagent
description: >
  Plan ad/commercial projects and rank the cheapest workflow that still hits
  quality. Emits prompt packs and deep-links; does not spend until Confirm.
  Use when the user asks for a project plan, ad plan, workflow ranking,
  MediaWizard job payload, or runs /ad-plan.
---

# AdPlan Superagent (`/ad-plan`)

You **PLAN**. You do not generate paid pixels or charge cards.

Hosted planner: VideoAdCreator agent `ad_plan_superagent` + backend functions.
This skill is the **operator TUI** surface. Hosted functions never write disk.
There is no `/execute-plan` command.

Canonical VAC: `C:\Users\oivin\base44-apps\VideoAdCreator` · app `6a7ac3508c7d7cde5928ecdf`

## Load first (do not restate)

1. `conclusive-coherent-plots`
2. `image-video-ads`
3. `imagine`
4. `base44-ai-commercial`
5. `build-with-ai`
6. `connectors`
7. `stripe-cli` — only if the operator asked to link payment

Defer to `base44/agents/ad_plan_superagent.jsonc` and `src/lib/adPlanSystemPrompt.js` (`AD_PLAN_SYSTEM`). Do not invent a parallel planner.

## 1. Probe `host_profile` (required before rank)

Never infer `session_imagine` from `XAI_API_KEY` (that secret is chat, not session i2v).

| Field | How the TUI sets it |
|-------|---------------------|
| `session_imagine` | `true` only if Imagine tools (`image_gen` / `image_edit` / `image_to_video`) are present **this turn**. Else `false`. |
| `has_gpu` | Run `nvidia-smi`. `true` only if a NVIDIA GPU is reported. This workstation is usually `false`. |
| `secrets_present` | **Names only.** Union of `npx base44 secrets list` and `connectors__list_secrets` (redacted names). Never `get_secret`. |
| `probed_at` | ISO timestamp now |

If `npx base44 whoami` fails: **STOP** and ask for `npx base44 login`. Do not invoke functions.

## 2. Ask only missing brief fields

Need: product, audience, platform(s) (`reels` \| `tiktok` \| `shorts` \| `stories` \| `feed`), CTA, budget, quality floor (default 7), formats (`still` \| `video` \| `both`).

Memorial / tribute / minnevideo / “hvile i fred” / “rest in peace” → `memorial=true`. Commercial recipes off.

Never default the product to FitFam/fitness unless the brief is fitness.

## 3. Invoke VAC functions (auth required)

Cwd: VideoAdCreator (or `--app-id 6a7ac3508c7d7cde5928ecdf`). Use `npx base44 exec`:

```js
const out = await base44.functions.invoke('generateProjectPlan', { brief, host_profile });
```

Show the rank table (cheap / fast / quality) with $ and minutes. Default = cheapest eligible path that meets the quality floor.

**Never spend.** Do not call `generateVideoAd`, `renderWithInVideo`, `Core.GenerateVideo`, RunComfy, Imagine generate, or Stripe mutating APIs. Emitting prompts and AppLinks is free.

## 4. Confirm via `selectWorkflow`

Wait for the operator to pick cheap | fast | quality. Then:

```js
await base44.functions.invoke('selectWorkflow', { plan_id, recipe_id });
```

Only `selectWorkflow` writes `selected_recipe_id`. Never update `ProjectPlan` rows yourself.

After Confirm, optionally:

- `exportWorkflowPrompt` — markdown + JSON payloads (`json.brief`, `json.job`). Pass `emit_rhai: true` when the operator asked for script text. Hosted function returns `rhai` text only — **never** writes `~/.grok/workflows/`.
- `linkApp` — Studio / MediaWizard payload / MarketForge / catalog deep-links. Optional `kind: x_ads` only if `ADPLAN_X_ADS_DRAFT`. Payloads only; no disk. `payloads.job.selections` is `null`.
- `createPaymentLink` — only if the user asked **and** status is `selected` or `exported`. Flag `ADPLAN_PAYMENT_LINKS` (default off) no-ops — say so. FitFam URL is `https://fitfam-trial.base44.app/pricing` with **no** query extras. FungaDex has no `/pricing`.

## 5. Disk writes (this machine only, after Confirm, when asked)

Hosted functions **never** write `MediaWizard/output/` or `~/.grok/workflows/`.

Write **only after** `selectWorkflow` succeeded **and** the operator asked to materialize. Never write before Confirm.

Copy `exportWorkflowPrompt` `json.brief` → `brief.json` and `json.job` → `job.json` **unchanged**. (`linkApp` `payloads.brief` / `payloads.job` is the same shape.)

- `job.selections` stays `null` (MediaWizard G0 CatalogSelect). Do **not** invent `job.selections.recipe_id`.
- AdPlan `recipe_id` stays at the **job top level** if the export already put it there. Do not add fields.
- Path: `C:\Users\oivin\MediaWizard\output\<slug>\{brief.json,job.json}` where `slug` is `json.job.slug` (or `linkApp` `slug`)
- Do not invent a `mediawizard://` handler
- MediaWizard G0 still requires CatalogSelect Confirm

### Optional Rhai (`ADPLAN_EMIT_RHAI`, default **off**)

Read the flag from `src/lib/adPlanFlags.js`. Hosted `exportWorkflowPrompt` **never** writes this path.

- Flag **off**: do not write the file. You may still pass `emit_rhai: true` to show the text.
- Flag **on** **and** the operator asked, after `selectWorkflow`:
  1. `exportWorkflowPrompt({ plan_id, emit_rhai: true })`
  2. Take `out.rhai` (script TEXT). Jobs already embed pack prompts + the recipe tool (image_gen / image_to_video vs runcomfy HappyHorse or Kling vs local LTX). Do not invent or rewrite the script or swap tools.
  3. Smoke-check with the workflow tool `{ script: out.rhai, validate_only: true }`
  4. Write `C:\Users\oivin\.grok\workflows\ad-plan-execute.rhai` (create `~\.grok\workflows` if needed)
  5. Do not launch unless the operator asked. The script is data (`capability_mode: execute` only after the script's own confirm).

## 6. Deep-links (copy; do not invent)

| Kind | URL |
|------|-----|
| Studio | `https://cryptic-ad-motion-lab.base44.app/studio?plan=<id>&platform=<p>&source=adplan` |
| MarketForge | `https://market-forge-100a8936.base44.app/?plan=<id>&utm_source=adplan` — operator **pastes** the exported workflow prompt; no Campaign create |
| FitFam | `https://fitfam-trial.base44.app/pricing` only |
| FungaDex | app URL + copy “Open FungaDex → tap Upgrade for full features” |

Never hardcode NOK amounts. Never invent Price IDs, Checkout Sessions, or Connect accounts.

## 7. Optional X Ads draft (`ADPLAN_X_ADS_DRAFT`, default **off**)

Only if the flag is **on** **and** the operator asked to *draft* an X campaign. Hosted functions never call `x_ads__*`.

1. `x_ads__create_campaign` with `entity_status=PAUSED` only. **Never** `ACTIVE`.
2. `x_ads__create_ad_group` with `entity_status=PAUSED` and budget on the ad group: `daily_budget_amount_local_micro`. Do **not** put budget on the campaign.
3. Do **not** call `x_ads__create_ad`, `x_ads__create_image_ad`, or `x_ads__set_status` `ACTIVE`. Do not auto-promote tweets.
4. Then `linkApp({ plan_id, x_ads: { campaign_id, ad_group_id, account_id, daily_budget_amount_local_micro } })`. Store ids on `AppLink.external_id` (`campaign_id/ad_group_id`). `payload.entity_status` is always `PAUSED`.

If the flag is off: skip, say `FLAG_OFF`. Do not create campaigns.

## Do not

- Call spend-bearing generation
- Write MediaWizard files before `selectWorkflow`, or invent `job.selections.recipe_id`
- Write `~/.grok/workflows/` from a hosted function, or write the Rhai file unless `ADPLAN_EMIT_RHAI` and asked
- Write `selected_recipe_id` or `payment_links_json` yourself
- Infer Imagine from `XAI_API_KEY`
- Add plan tools to public VAC MCP (`auth: none`)
- `npx base44 agents push` unless the local tree also has `ai_build.jsonc` + `creative_director.jsonc` (full sync deletes siblings)
- Pirate / ripped audio; invent a real person's likeness; dual CTAs
- Default FitFam unless the brief is fitness
- Create or promote **ACTIVE** X Ads; never auto-promote tweets
