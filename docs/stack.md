# Implementation stack (PLAN_ID `23bb9ab2`)

Runtime lives in [WKampfisk/VideoAdCreator](https://github.com/WKampfisk/VideoAdCreator). Graphite is not installed; this is a **plain-git** stack. Open each compare URL to create a draft PR.

| PR | Branch | Compare |
|----|--------|---------|
| PR-0 Ranker + catalogs | `execute-plan/23bb9ab2-pr-0-ranker-catalogs-test-runner` | [compare](https://github.com/WKampfisk/VideoAdCreator/compare/main...execute-plan/23bb9ab2-pr-0-ranker-catalogs-test-runner?expand=1) |
| PR-1 ProjectPlan entity | `execute-plan/23bb9ab2-pr-1-one-entity-rls` | [compare](https://github.com/WKampfisk/VideoAdCreator/compare/execute-plan/23bb9ab2-pr-0-ranker-catalogs-test-runner...execute-plan/23bb9ab2-pr-1-one-entity-rls?expand=1) |
| PR-2 Pure functions | `execute-plan/23bb9ab2-pr-2-pure-functions` | [compare](https://github.com/WKampfisk/VideoAdCreator/compare/execute-plan/23bb9ab2-pr-1-one-entity-rls...execute-plan/23bb9ab2-pr-2-pure-functions?expand=1) |
| PR-3a Persist skeleton | `execute-plan/23bb9ab2-pr-3a-persist-skeleton-no-llm` | [compare](https://github.com/WKampfisk/VideoAdCreator/compare/execute-plan/23bb9ab2-pr-2-pure-functions...execute-plan/23bb9ab2-pr-3a-persist-skeleton-no-llm?expand=1) |
| PR-3b Plot LLM | `execute-plan/23bb9ab2-pr-3b-plot-llm` | [compare](https://github.com/WKampfisk/VideoAdCreator/compare/execute-plan/23bb9ab2-pr-3a-persist-skeleton-no-llm...execute-plan/23bb9ab2-pr-3b-plot-llm?expand=1) |
| PR-4 linkApp | `execute-plan/23bb9ab2-pr-4-linkapp-payloads` | [compare](https://github.com/WKampfisk/VideoAdCreator/compare/execute-plan/23bb9ab2-pr-3b-plot-llm...execute-plan/23bb9ab2-pr-4-linkapp-payloads?expand=1) |
| PR-7 PaymentLink | `execute-plan/23bb9ab2-pr-7-paymentlink-redirects` | [compare](https://github.com/WKampfisk/VideoAdCreator/compare/execute-plan/23bb9ab2-pr-4-linkapp-payloads...execute-plan/23bb9ab2-pr-7-paymentlink-redirects?expand=1) |
| PR-3c Prompt emit | `execute-plan/23bb9ab2-pr-3c-prompt-emit-export` | [compare](https://github.com/WKampfisk/VideoAdCreator/compare/execute-plan/23bb9ab2-pr-7-paymentlink-redirects...execute-plan/23bb9ab2-pr-3c-prompt-emit-export?expand=1) |
| PR-5 Studio hydrate | `execute-plan/23bb9ab2-pr-5-studio-plan-hydrate` | [compare](https://github.com/WKampfisk/VideoAdCreator/compare/execute-plan/23bb9ab2-pr-3c-prompt-emit-export...execute-plan/23bb9ab2-pr-5-studio-plan-hydrate?expand=1) |
| PR-6 Plan UI | `execute-plan/23bb9ab2-pr-6-plan-ui-no-agent-chat` | [compare](https://github.com/WKampfisk/VideoAdCreator/compare/execute-plan/23bb9ab2-pr-5-studio-plan-hydrate...execute-plan/23bb9ab2-pr-6-plan-ui-no-agent-chat?expand=1) |
| PR-8 Agent + skill | `execute-plan/23bb9ab2-pr-8-agent-tui-skill` | [compare](https://github.com/WKampfisk/VideoAdCreator/compare/execute-plan/23bb9ab2-pr-6-plan-ui-no-agent-chat...execute-plan/23bb9ab2-pr-8-agent-tui-skill?expand=1) |
| PR-9 Promote | `execute-plan/23bb9ab2-pr-9-promote-to-videoproject` | [compare](https://github.com/WKampfisk/VideoAdCreator/compare/execute-plan/23bb9ab2-pr-8-agent-tui-skill...execute-plan/23bb9ab2-pr-9-promote-to-videoproject?expand=1) |
| PR-10 Rhai + X Ads | `execute-plan/23bb9ab2-pr-10-optional-rhai-x-ads` | [compare](https://github.com/WKampfisk/VideoAdCreator/compare/execute-plan/23bb9ab2-pr-9-promote-to-videoproject...execute-plan/23bb9ab2-pr-10-optional-rhai-x-ads?expand=1) |

Tip of stack vs `main`: 36 files, +10782 / −9.

Do **not** run `npx base44 agents push` from a tree that lacks `ai_build.jsonc` — full sync would drop the live `ai_build` agent.
