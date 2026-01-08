---
title: Discord OAuth Consolidation
status: proposed
draft_status: idea
created_at: 2026-01-08
updated_at: 2026-01-08
references: []
related_issues: []
related_prs: []
---

## Hypothesis
- OAuth 処理を共通化すると、認証フローの差分や不整合が減る。
- `Membership`/`Contract`/`AuthCallback` の重複実装を削減できる。

## Options / Alternatives
- `src/utils/discordAuth.js` に開始/コールバック処理を集約し、各ページは呼び出すだけにする。
- `useDiscordAuth` のようなカスタムフックで状態管理も含めて統一する。
- 既存のページ実装を維持し、部分的に関数共有だけ行う。

## Risks / Considerations
- リダイレクト URL や state の扱いを誤るとログインループが発生する。
- `Contract` と `Membership` の文言/挙動差が失われないよう確認が必要。
