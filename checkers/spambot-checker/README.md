# Spambot & Bot Click Checker: 1M known bot clickers

Find the addresses behind fake opens and clicks. Security scanners and bots open every message and click every link: they inflate your metrics, trigger false positives in your analytics and hide real engagement.

The Actor is free. Each checked address uses 1 credit on your SMTPing account.

## What it detects

Addresses associated with automated clicking, from a database of 1M spambots and bot clickers.

On a 27,850-address B2B list, 24 spambots were found.

## Why SMTPing

- **Price.** From **$0.15 per 1,000** on the 1M pack. Pay-as-you-go credits never expire.
- **25 free credits every day** on every account, no card required.
- **Explained matches.** Every match returns a `source` field, useful when a customer disputes a result.
- **Fast.** List and pattern lookups, no SMTP connection: 1,000 addresses per call, up to 100,000 per run.
- **No email is sent.**

## How to use

1. Create a free account at [app.smtping.com](https://app.smtping.com) and copy your API key.
2. Paste the key, then paste your addresses or a public CSV/TXT URL.
3. Choose which rows to keep and click **Start**.

## Output

```json
{
  "email": "someone@example.com",
  "check": "spambot",
  "matched": true,
  "source": "in-memory-list",
  "action": "Remove, or exclude from engagement metrics."
}
```

`source` is `null` when `matched` is `false`. The `SUMMARY` record gives total, matched and clean counts.

## Need the full picture?

This Actor runs one check. For a complete verdict on every address (valid, invalid, catch-all, spamtrap, complainer, spambot, disposable, typo and more, 13 verdicts in total), use [SMTPing Email Verifier](https://apify.com/smtping/email-verifier).

Other SMTPing checkers on Apify: [Spamtrap Checker](https://apify.com/smtping/spamtrap-checker), [Disposable Email Checker](https://apify.com/smtping/disposable-email-checker), [Spam Complainer Checker](https://apify.com/smtping/complainer-checker).

## Links

- Pricing: https://smtping.com/pricing
- API docs: https://smtping.com/docs#checks
- Blog: https://smtpedia.com
