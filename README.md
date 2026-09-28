# SMTPing Email Verifier: 13 verdicts, from $0.15 per 1,000

Verify and clean email lists before you send. Most verifiers stop at valid, invalid and catch-all. SMTPing also flags **spamtraps, complainers, spambots, blacklisted domains and disposables**, the addresses that pass a basic SMTP check and still damage your sender reputation.

The Actor is free. Verifications use credits on your SMTPing account.

## Why SMTPing

- **Price.** From **$0.15 per 1,000** on the 1M pack, $0.38 per 1,000 on 100k. Credits never expire on pay-as-you-go.
- **Unknown is free.** When a server gives no reliable answer, the result is `unknown` and you are not charged. Duplicates and rejected requests are free too.
- **25 free credits every day** on every account, no card required.
- **Rich verdicts.** 13 statuses in 3 groups, each with a recommended action, plus free-provider, role-account and typo flags.
- **No email is sent.** The SMTP conversation stops before any message is transmitted.

## How to use

1. Create a free account at [smtping.com](https://smtping.com) and copy your key from Dashboard > API.
2. Paste the key, then paste your addresses or a public CSV/TXT URL.
3. Choose which rows to keep and click **Start**.

From 50 addresses, the Actor submits one bulk job (up to 100,000 per run) and shows live progress.

## Verdicts and groups

### safe: send

| Verdict | Meaning |
| --- | --- |
| `valid` | Mailbox exists and accepts mail |
| `alias` | Privacy alias forwarding to a real mailbox |

### judgement: decide per campaign

| Verdict | Meaning | Recommended action |
| --- | --- | --- |
| `catchall` | Domain accepts every address, this mailbox cannot be confirmed | Send to engaged contacts, exclude from cold outreach |
| `valid_catchall` | Catch-all domain with positive signals for this address | Lower risk than `catchall` |
| `unknown` | No usable answer (greylisting, timeouts) | Retry in a few hours; not charged |

### do_not_send: remove

| Verdict | Meaning |
| --- | --- |
| `invalid` | Mailbox or domain cannot receive mail; will bounce |
| `spamtrap` | Exists only to catch senders; the most damaging address on a list |
| `disposable` | Temporary, throwaway address |
| `blacklisted` | Domain appears on blocklists |
| `complainer` | History of marking mail as spam |
| `spambot` | Automated clicker that inflates engagement metrics |
| `inbox_full` | Mailbox over quota; mail bounces |
| `typo` | Misspelled domain (gmial.com); correct it or remove |

Real example, a 27,850-address B2B list: 150 spamtraps (0.5%), 76 complainers and 24 spambots, none of which a basic valid/invalid check would remove.

## Output

One dataset row per address:

```json
{
  "email": "john@example.com",
  "status": "valid",
  "band": "safe",
  "action": "Send",
  "statusDescription": "safe to send",
  "isFreeDomain": false,
  "isRoleBasedDomain": false,
  "isTypos": false,
  "domain": "example.com"
}
```

The `SUMMARY` record in the key-value store gives counts per group and per verdict. Export as CSV, JSON or Excel from the Output tab, or connect Make, Zapier or n8n.

## Input

| Field | Description |
| --- | --- |
| SMTPing API key | Required, stored as a secret |
| Email addresses | One per line; duplicates removed |
| List URL | Public CSV or TXT; every address found is verified |
| Rows to keep | `all`, `safe_judgement` or `safe` |
| Bulk threshold | Size from which one bulk job is used (default 50) |

## Links

- Pricing: https://smtping.com/pricing
- API docs and full verdict reference: https://smtping.com/docs
- Node, Python and PHP SDKs, MCP server: https://smtping.com/docs
- Blog: https://smtpedia.com
