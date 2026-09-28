import { Actor, log } from 'apify';
import Smtping, { isEmail, AuthenticationError, InsufficientCreditsError } from '@smtping/sdk';

// Verdict map, aligned with https://smtping.com/docs#result
const VERDICTS = {
  valid:          ['safe', 'Send'],
  alias:          ['safe', 'Send, privacy alias forwarding to a real mailbox'],
  catchall:       ['judgement', 'Send to engaged contacts only, exclude from cold outreach'],
  valid_catchall: ['judgement', 'Catch-all domain with positive signals, lower risk'],
  unknown:        ['judgement', 'No usable answer, retry in a few hours (not charged)'],
  invalid:        ['do_not_send', 'Remove, will bounce'],
  spamtrap:       ['do_not_send', 'Remove immediately, spamtrap'],
  disposable:     ['do_not_send', 'Remove, throwaway address'],
  blacklisted:    ['do_not_send', 'Remove, domain on blocklists'],
  complainer:     ['do_not_send', 'Remove, history of spam complaints'],
  spambot:        ['do_not_send', 'Remove, automated clicker'],
  inbox_full:     ['do_not_send', 'Remove, mailbox over quota, will bounce'],
  typo:           ['do_not_send', 'Remove or correct, misspelled domain'],
};
const classify = (r) => {
  const s = String(r.status || '').toLowerCase().replace(/-/g, '_');
  const key = s === 'catch_all' ? 'catchall' : s;
  const [band, action] = VERDICTS[key] || (s === 'error' ? ['error', 'Request failed, retry'] : ['judgement', 'Review manually']);
  return { ...r, band, action };
};

await Actor.init();

const input = (await Actor.getInput()) || {};
const {
  apiKey,
  emails = [],
  fileUrl,
  outputFilter = 'all',
  bulkThreshold = 50,
  concurrency = 5,
} = input;

if (!apiKey) await Actor.fail('Missing SMTPing API key. Get one at https://smtping.com/pricing');

const EMAIL_RE = /[^\s,;<>"']+@[^\s,;<>"']+\.[a-z]{2,}/gi;
let raw = [...emails];

if (fileUrl) {
  log.info('Downloading list', { fileUrl });
  const res = await fetch(fileUrl);
  if (!res.ok) await Actor.fail(`Could not download list: HTTP ${res.status}`);
  raw = raw.concat((await res.text()).match(EMAIL_RE) || []);
}

const list = [...new Set(raw.map((e) => String(e || '').trim().toLowerCase()).filter(isEmail))];
if (!list.length) await Actor.fail('No valid email address found in the input.');
log.info(`${list.length} unique addresses to verify`);

const client = new Smtping({ apiKey, userAgent: 'smtping-apify/1.0.0' });
const keep = {
  all: () => true,
  safe_judgement: (r) => r.band === 'safe' || r.band === 'judgement',
  safe: (r) => r.band === 'safe',
}[outputFilter] || (() => true);

let results;
try {
  if (list.length >= bulkThreshold) {
    const job = await client.bulk.create(list);
    log.info('Bulk job created', { jobId: job.jobId });
    await Actor.setStatusMessage(`Bulk job ${job.jobId} running`);
    results = await client.bulk.wait(job.jobId, {
      timeout: 60 * 60000,
      onProgress: (s) => {
        const pct = s.progress ?? (s.processedEmails && s.totalEmails ? Math.round((100 * s.processedEmails) / s.totalEmails) : null);
        if (pct != null) Actor.setStatusMessage(`Verifying: ${pct}%`);
      },
    });
  } else {
    results = await client.verifyMany(list, { concurrency });
  }
} catch (err) {
  if (err instanceof AuthenticationError) await Actor.fail('Invalid SMTPing API key.');
  if (err instanceof InsufficientCreditsError) await Actor.fail('Not enough SMTPing credits. Top up at https://smtping.com/pricing');
  throw err;
}

results = results.map(classify);
const summary = { total: results.length, safe: 0, judgement: 0, do_not_send: 0, error: 0, byStatus: {} };
for (const r of results) {
  summary[r.band] = (summary[r.band] || 0) + 1;
  summary.byStatus[r.status] = (summary.byStatus[r.status] || 0) + 1;
}

const kept = results.filter(keep);
await Actor.pushData(kept);
await Actor.setValue('SUMMARY', summary);
if (typeof Actor.setStatusMessage === 'function') {
  await Actor.setStatusMessage(`Done: ${summary.safe} safe, ${summary.judgement} judgement, ${summary.do_not_send} do not send`, { isStatusMessageTerminal: true });
}
log.info('Summary', summary);

await Actor.exit();
