---
title: LP Performance Optimizations Intent
status: active
draft_status: n/a
created_at: 2026-01-08
updated_at: 2026-01-08
references:
  - _docs/archives/plan/Membership/performance-optimizations/plan.md
  - _docs/archives/survey/UI/lp-image-size-variants.md
  - _docs/archives/survey/UI/google-fonts-nonblocking.md
related_issues: []
related_prs: []
---

## Overview
LP の初期表示と転送量を抑え、Lighthouse の主要指標を改善するための意思決定を記録する。

## Decision
- Tailwind CDN を廃止し、ビルド生成 CSS へ移行する。
- ルート単位のコード分割と `Suspense` により初期 JS を削減する。
- 画像は 320/480 など小さなバリアントを追加し、`srcset` で最適化する。
- Google Fonts は非ブロッキング読み込みへ切り替える。

## Rationale
- LCP/FCP の改善と、モバイル帯域での過大配信を抑えるため。

## Outcome
- LP での画像/フォント/JS 配信が最適化され、初期表示の負荷を削減できた。

## Approval
- 承認: penne
