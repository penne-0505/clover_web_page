---
title: Discord OAuth Consolidation Plan
status: proposed
draft_status: n/a
created_at: 2026-01-08
updated_at: 2026-01-08
references:
  - ../../../draft/Membership/discord-oauth-consolidation.md
related_issues: []
related_prs: []
---

## Overview
Discord OAuth の開始・コールバック処理を共通化し、`Membership`/`Contract`/`AuthCallback` の重複実装を削減する。既存の挙動（戻り先、エラー分岐、セッション更新）を維持しつつ、保守性を高める。

## Scope
- **Frontend**
  - `src/utils/discordAuth.js` に共通ロジックを集約（認可URL生成、コード交換、ユーザー永続化、リダイレクト整理）。
  - `src/pages/Membership.jsx`, `src/pages/Contract.jsx`, `src/pages/AuthCallback.jsx` を共通関数ベースに置換。
- **Telemetry**
  - `trackEvent`/`captureError` の呼び出しは維持し、イベント名の変更は行わない。

## Non-Goals
- `functions/discord-oauth.js` / `functions/auth.js` の API 仕様変更。
- OAuth プロバイダ追加や UI 文言の全面的な刷新。
- セッション管理方式の変更（Cookie/JWT 等）。

## Requirements
- **Functional**
  - `createDiscordOAuthState` / `consumeDiscordOAuthState` の `returnTo` 仕様を維持する。
  - 既存のエラー導線（/membership への戻り、バナー表示、`auth` クエリ）を壊さない。
  - Discord ユーザー情報の保存形式（`sessionStorage`）を維持する。
- **Non-Functional**
  - 既存の環境変数・Cloudflare Functions を前提に挙動を変えない。
  - 依存ライブラリの追加は最小限とする。

## Tasks
1. 既存フロー差分の棚卸し（Membership / Contract / AuthCallback）。
2. 共通関数の設計と配置（例: `buildDiscordAuthorizeUrl`, `exchangeDiscordCode`, `persistDiscordUser`）。
3. 各ページの OAuth 処理を共通関数へ置換。
4. エラー/リダイレクトの分岐を既存挙動に合わせて整理。
5. 必要なら doc 追記（実装メモ・運用注意点）。

## Test Plan
- **Manual**
  - `/membership` からログイン開始 → 認証完了 → `/membership` に戻る。
  - `/contract?plan=sub_monthly` からログイン開始 → 認証完了 → `/contract` に戻る。
  - `/auth/callback` に `code` なし/不正 `state` を渡した場合の遷移確認。
  - `/discord-oauth` 失敗時のエラー表示・リダイレクト挙動を確認。

## Deployment / Rollout
- 通常のデプロイフローで反映。
- 問題が出た場合は該当コミットをロールバック。

## Open Questions
- `/auth/callback` は維持する（Discord 側の Redirect URI 互換性を優先）。
- `Membership`/`Contract` のエラーメッセージ差分は維持する（導線と文言を現行踏襲）。
