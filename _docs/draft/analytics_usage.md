---
title: Analytics & Error Reporting Hooks (Usage)
status: proposed
draft_status: exploring
created_at: 2025-12-07
updated_at: 2025-12-07
references:
  - ../guide/design/design_tokens.md
  - ../plan/Membership/roadmap/plan.md
---

## Overview
フロントエンドに no-op の計測/エラー報告フックを挿入済み（`src/analytics.js`）。環境変数が未設定のときは何もしないため、後日 GA4 / Sentry を有効化するだけで実動する。

## 環境変数
- `VITE_GA4_MEASUREMENT_ID`: GA4 の Measurement ID（例: `G-XXXXXXX`）。未設定なら `trackEvent` は no-op。
- `VITE_SENTRY_DSN`: Sentry DSN。未設定なら `captureError` は DEV のみ console に出力。

## フロント実装箇所
- `src/analytics.js`: `trackEvent(name, params)` / `captureError(error, context)` を定義。
- `src/App.jsx`:  
  - `trackEvent`: `login_start`, `login_success`, `checkout_start`  
  - `captureError`: OAuth交換失敗、Checkout作成失敗など

## 有効化手順 (GA4)
1. Cloudflare Pages の環境変数に `VITE_GA4_MEASUREMENT_ID` を設定（Production/Preview）。  
2. `src/analytics.js` のコメントアウト部分を gtag 呼び出しに置き換える。例:
   ```js
   export function trackEvent(name, params = {}) {
     if (!GA_ID) return;
     window.gtag?.("event", name, { ...params });
   }
   ```
3. `_docs/plan/` または `guide/` に計測ポリシーを追記（どのイベントを計測するか）。

## 有効化手順 (Sentry)
1. Cloudflare Pages の環境変数に `VITE_SENTRY_DSN` を設定。  
2. Sentry SDK を導入し、`captureError` 内で `Sentry.captureException(error, { extra: context })` を呼び出すよう差し替え。  
3. リリース/環境タグの付与ポリシーを決めて設定（例: `release`, `environment`）。  

## 追加で入れたいイベント案
- `checkout_success` / `checkout_cancel`（`checkout` パラメータで判定可）  
- LP CTA クリック（Discord招待ボタン）  
- ロール反映確認の再同期アクションが入る場合、そのトリガーイベント

## 注意
- DSN や Measurement ID はフロントから見えるため、秘匿が必要な値は Functions 側で処理する。  
- 本番/プレビューで分ける場合は環境変数を切り替える。  
