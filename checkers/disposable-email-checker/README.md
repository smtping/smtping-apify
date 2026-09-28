# Disposable Email Checker: 3,500+ domains monitored daily

Detect temporary and throwaway email addresses. Disposable inboxes stop existing within minutes or days: they inflate signup counts, abuse free trials and turn into hard bounces on your next campaign.

The Actor is free. Each checked address uses 1 credit on your SMTPing account.

## What it detects

Temporary and throwaway providers, from a list of 3,500+ disposable domains refreshed every day.

New disposable domains appear every day; a static list goes stale within weeks.

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
  "check": "disposable",
  "matched": true,
  "source": "in-memory-list",
  "action": "Remove, or block at signup. The address will stop existing shortly."
}
```

`source` is `null` when `matched` is `false`. The `SUMMARY` record gives total, matched and clean counts.

## Need the full picture?

This Actor runs one check. For a complete verdict on every address (valid, invalid, catch-all, spamtrap, complainer, spambot, disposable, typo and more, 13 verdicts in total), use [SMTPing Email Verifier](https://apify.com/smtping/email-verifier).

Other SMTPing checkers on Apify: [Spamtrap Checker](https://apify.com/smtping/spamtrap-checker), [Spam Complainer Checker](https://apify.com/smtping/complainer-checker), [Spambot & Bot Click Checker](https://apify.com/smtping/spambot-checker).

## Links

- Pricing: https://smtping.com/pricing
- API docs: https://smtping.com/docs#checks
- Blog: https://smtpedia.com
