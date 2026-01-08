---
title: Formatting & Lint Baseline
status: proposed
draft_status: idea
created_at: 2026-01-08
updated_at: 2026-01-08
references: []
related_issues: []
related_prs: []
---

## Hypothesis
- フォーマット/Lint の基準を導入すると、差分が減ってレビューと保守コストが下がる。
- `src/` と `functions/` のスタイルが統一され、意図しない揺れが抑制できる。

## Options / Alternatives
- Prettier のみ導入して「見た目」を先に統一する。
- ESLint + Prettier で基本ルールを定義し、エラー検知も行う。
- 導入を見送り、現状の混在を許容する（短期のコストは低いが長期負担が残る）。

## Notes
- 対象: `src/`, `functions/`, `vite.config.js`, `tailwind.config.js` など。
- ドキュメント側に運用ルールを明記する必要がある。
