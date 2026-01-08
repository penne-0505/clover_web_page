---
title: Design Token Unification
status: proposed
draft_status: idea
created_at: 2026-01-08
updated_at: 2026-01-08
references:
  - ../../guide/design/design_tokens.md
related_issues: []
related_prs: []
---

## Hypothesis
- デザイントークンの参照先を統一すると、ページ間の表現ブレが減る。
- 直書きの色/影/フォント指定を減らすことで、今後のテーマ調整が容易になる。

## Options / Alternatives
- CSS変数 (`:root`) に集約し、ページ内は変数参照へ置換する。
- Tailwind theme を拡張して、ユーティリティとして統一する。
- 既存のページごとのTOKENS定義を維持する（短期変更は最小）。

## Scope Notes
- `src/styles.css` のトークンと `_docs/guide/design/design_tokens.md` を基準に整合。
- `JoinLanding` と `Supporters` など直書きが多いページから優先。
