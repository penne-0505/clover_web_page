---
title: LP SEO Master Intent
status: active
draft_status: n/a
created_at: 2026-01-08
updated_at: 2026-01-08
references:
  - _docs/archives/plan/Membership/seo/plan.md
related_issues: []
related_prs: []
---

## Overview
LP の検索・共有に必要なメタ情報と公開ファイルを整備する判断を記録する。

## Decision
- robots.txt / sitemap.xml を公開し、検索エンジンへの通知を標準化する。
- `Seo` ユーティリティで title/description/OG/Twitter/CANONICAL を統一管理する。
- OG 共有画像とサイト基本情報は環境変数で差し替え可能にする。

## Rationale
- 共有時の表示品質と、検索エンジンへのインデックス品質を安定させるため。

## Outcome
- LP のメタ情報と公開ファイルが統一され、SEO 基盤が整備された。

## Approval
- 承認: penne
