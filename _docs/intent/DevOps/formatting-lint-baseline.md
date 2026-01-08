---
title: Formatting & Lint Baseline Intent
status: active
draft_status: n/a
created_at: 2026-01-08
updated_at: 2026-01-08
references:
  - _docs/archives/draft/DevOps/formatting-lint-baseline.md
related_issues: []
related_prs: []
---

## Overview
リポジトリ全体のフォーマットと静的解析を統一し、レビューと保守の負担を減らす。

## Decision
- ESLint + Prettier を標準とし、React/Pages Functions を同一ルールで検査する。
- lint-staged と Husky で、コミット前に最低限の整形チェックを走らせる。
- 対象は `src/`, `functions/`, 設定ファイル群に限定し、段階的に拡張する。

## Rationale
- 差分の揺れを最小化し、レビューで見るべき変更点を明確化するため。

## Outcome
- `eslint.config.js` / Prettier / lint-staged の導入により、統一基準を確立した。

## Approval
- 承認: penne
