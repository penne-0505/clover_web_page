---
title: Documentation Alignment
status: proposed
draft_status: idea
created_at: 2026-01-08
updated_at: 2026-01-08
references:
  - ../../../README.md
  - ../../../CONTRIBUTING.md
related_issues: []
related_prs: []
---

## Hypothesis
- README/CONTRIBUTING の記述と実装の差異を解消すると、オンボーディングがスムーズになる。
- Tailwind 運用や lint 状況の誤記がなくなることで、作業ミスが減る。

## Options / Alternatives
- 最小修正で差分のみを更新する（低コスト・低リスク）。
- `_docs/guide/` に詳細手順を移し、README は入口に絞る。
- 記述は現状のまま維持する（短期コストは低いが混乱が残る）。

## Notes
- `package.json`, `src/styles.css`, `tailwind.config.js` を根拠に記述を合わせる。
