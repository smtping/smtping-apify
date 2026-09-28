import { Actor, log } from 'apify';
import Smtping, { isEmail, AuthenticationError, InsufficientCreditsError } from '@smtping/sdk';

const CHECK = 'disposable';
const BATCH = 1000;

await Actor.init();
const { apiKey, emails = [], fileUrl, outputFilter = 'all' } = (await Actor.getInput()) || {};
if (!apiKey) await Actor.fail('Missing SMTPing API key. Get one free at https://app.smtping.com');

const EMAIL_RE = /[^\s,;<>"']+@[^\s,;<>"']+\.[a-z]{2,}/gi;
let raw = [...emails];
if (fileUrl) {
  const res = await fetch(fileUrl);
  if (!res.ok) await Actor.fail(`Could not download list: HTTP ${res.status}`);
  raw = raw.concat((await res.text()).match(EMAIL_RE) || []);
}
const list = [...new Set(raw.map((e) => String(e || '').trim().toLowerCase()).filter(isEmail))].slice(0, 100000);
if (!list.length) await Actor.fail('No valid email address found in the input.');
log.info(`${list.length} unique addresses to check for ${CHECK}`);

const client = new Smtping({ apiKey, userAgent: 'smtping-apify-disposable/1.0.0' });
let matched = 0, done = 0;
try {
  for (let i = 0; i < list.length; i += BATCH) {
    const chunk = list.slice(i, i + BATCH);
    const r = await client.request('POST', `/checks/${CHECK}/batch`, { emails: chunk });
    const rows = (r && r.results) || [];
    const out = rows.map((x) => ({
      email: x.email,
      check: CHECK,
      matched: !!x.matched,
      source: x.source ?? null,
      action: x.matched ? 'Remove, or block at signup. The address will stop existing shortly.' : 'No match',
    }));
    matched += out.filter((x) => x.matched).length;
    done += chunk.length;
    await Actor.pushData(outputFilter === 'matched' ? out.filter((x) => x.matched) : outputFilter === 'clean' ? out.filter((x) => !x.matched) : out);
    await Actor.setStatusMessage(`Checked ${done}/${list.length}, ${matched} matched`);
  }
} catch (err) {
  if (err instanceof AuthenticationError) await Actor.fail('Invalid SMTPing API key.');
  if (err instanceof InsufficientCreditsError) await Actor.fail('Not enough SMTPing credits. Top up at https://smtping.com/pricing');
  throw err;
}
const summary = { check: CHECK, total: list.length, matched, clean: list.length - matched };
await Actor.setValue('SUMMARY', summary);
await Actor.setStatusMessage(`Done: ${matched} disposable found in ${list.length} addresses`, { isStatusMessageTerminal: true });
await Actor.exit();
