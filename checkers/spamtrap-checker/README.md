# Spamtrap Checker: 150M known spamtraps

Find spamtraps in your email list before they hit your sender reputation. A spamtrap has no human reader: every message sent to one is treated by mailbox providers as proof of poor list hygiene, and a handful can move a domain from the inbox to the spam folder or onto a blocklist.

The Actor is free. Each checked address uses 1 credit on your SMTPing account.

## What it detects

Pristine, recycled and typo traps, checked against a database of 150M known spamtraps.

On a 27,850-address B2B list, 150 spamtraps (0.5%) were found; a standard valid/invalid check keeps every one of them.

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
  "check": "spamtrap",
  "matched": true,
  "source": "recycled-list",
  "action": "Remove immediately. The most damaging address on any list."
}
```

| `source` | Meaning |
| --- | --- |
| `recycled-list` | A known recycled-spamtrap dataset |
| `legacy-domain` | A domain retired and repurposed as a trap |
| `mx-pattern` | The domain's MX records match a known trap operator |
| `pattern` | The address matches a known harmful pattern |
| `in-memory-list` | A curated list held in the engine |

`source` is `null` when `matched` is `false`. The `SUMMARY` record gives total, matched and clean counts.

## Need the full picture?

This Actor runs one check. For a complete verdict on every address (valid, invalid, catch-all, spamtrap, complainer, spambot, disposable, typo and more, 13 verdicts in total), use [SMTPing Email Verifier](https://apify.com/smtping/email-verifier).

Other SMTPing checkers on Apify: [Disposable Email Checker](https://apify.com/smtping/disposable-email-checker), [Spam Complainer Checker](https://apify.com/smtping/complainer-checker), [Spambot & Bot Click Checker](https://apify.com/smtping/spambot-checker).

## Links

- Pricing: https://smtping.com/pricing
- API docs: https://smtping.com/docs#checks
- Blog: https://smtpedia.com
