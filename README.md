# SMTPing Email Verifier

Clean an email list before you send. This Actor checks every address with the [SMTPing](https://smtping.com) API and returns one row per email with its status and a simple band: **safe**, **judgement** or **avoid**.

## What you need

An SMTPing API key. Create a free account at [smtping.com](https://smtping.com), then copy the key from Dashboard > API. Verifications are billed on your SMTPing account; the Actor itself is free.

## Input

| Field | Description |
| --- | --- |
| SMTPing API key | Required. Stored as a secret. |
| Email addresses | One per line. |
| List URL | Optional public CSV or TXT file; every address in it is extracted. |
| Rows to keep | `all`, `safe_judgement` or `safe`. |
| Bulk threshold | From this size, one bulk job is used (default 50). |

## Output

Each dataset row contains `email`, `status`, `band`, `statusDescription` and extra flags (free provider, role account, MX). A `SUMMARY` record in the key-value store gives the count per band and per status.

| Band | Statuses | Action |
| --- | --- | --- |
| safe | valid, alias | Send |
| judgement | catch_all, unknown, role, others | Review or send carefully |
| avoid | invalid, spamtrap, disposable, blacklisted, complainer, spambot, inbox_full | Remove |

## Example input

```json
{
  "apiKey": "YOUR_SMTPING_KEY",
  "emails": ["john@example.com", "sales@example.org"],
  "outputFilter": "all"
}
```

## Links

- API docs: https://smtping.com/docs
- Pricing: https://smtping.com/pricing
- Node SDK: https://www.npmjs.com/package/@smtping/sdk
