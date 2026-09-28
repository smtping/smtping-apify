# Spam Complainer Checker: 70M known complainers

Find the addresses most likely to click "Report spam". A complainer is a real, deliverable mailbox, which is exactly why a standard email verifier marks it valid. Every complaint counts against you: Google asks bulk senders to stay under a 0.3% spam rate.

The Actor is free. Each checked address uses 1 credit on your SMTPing account.

## What it detects

Addresses with a recorded history of spam complaints, from a database of 70M complainers.

On a 27,850-address B2B list, 76 complainers were found, all of them deliverable.

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
  "check": "complainer",
  "matched": true,
  "source": "in-memory-list",
  "action": "Remove. Likely to complain again."
}
```

`source` is `null` when `matched` is `false`. The `SUMMARY` record gives total, matched and clean counts.

## Need the full picture?

This Actor runs one check. For a complete verdict on every address (valid, invalid, catch-all, spamtrap, complainer, spambot, disposable, typo and more, 13 verdicts in total), use [SMTPing Email Verifier](https://apify.com/smtping/email-verifier).

Other SMTPing checkers on Apify: [Spamtrap Checker](https://apify.com/smtping/spamtrap-checker), [Disposable Email Checker](https://apify.com/smtping/disposable-email-checker), [Spambot & Bot Click Checker](https://apify.com/smtping/spambot-checker).

## Links

- Pricing: https://smtping.com/pricing
- API docs: https://smtping.com/docs#checks
- Blog: https://smtpedia.com
