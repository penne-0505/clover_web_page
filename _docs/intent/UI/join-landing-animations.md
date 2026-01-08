---
title: JoinLanding Animation Intent
status: active
draft_status: n/a
created_at: 2026-01-08
updated_at: 2026-01-08
references:
  - _docs/archives/plan/UI/join-landing-animations/plan.md
related_issues: []
related_prs: []
---

## Overview
JoinLanding の体験を Membership と揃えるため、読み込み・スクロール連動アニメーションを採用する。

## Decision
- Framer Motion を採用し、セクション単位のフェード/スライドとスタッガーを統一する。
- `prefers-reduced-motion` を尊重し、過剰な動きを抑制する。
- 既存の CSS アニメーションとは干渉しない構成に留める。

## Rationale
- LP 全体の体感品質を合わせ、ユーザーの視線誘導を補強するため。

## Outcome
- JoinLanding で読み込み/スクロール連動のアニメーションが標準化された。

## Approval
- 承認: penne
