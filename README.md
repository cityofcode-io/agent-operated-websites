# Building excellent websites — a guide for AI agents

> **Status:** Draft 5 · 2026-09-24 · for use and iteration
> **Audience:** agents building and maintaining websites, and the people delegating that work.
> **Scope:** platform-neutral quality guidance; your platform's documentation governs its
> authoring, publishing and recovery contracts.

Find and fix defects before the owner has to point them out: build a site that serves its
visitors, inspect it in a browser, measure it, improve it until you can show why it is ready.

**Target: 100 in Lighthouse Performance, Accessibility, Best Practices and SEO, on mobile and
desktop — plus the content, visual, accessibility and task checks no score can make.**

Read [§1](#1-session-contract) and [§2](#2-preflight-before-the-first-write) always, then take
[§3](#3-the-build-loop) for a new site, redesign or migration, or [§4](#4-the-change-loop) for a
change to a working site. [§5](#5-the-checks)–[§7](#7-recipes) are lookup;
[§8](#8-report) is what you hand over.

## 1. Session contract

These hold everywhere; later sections do not repeat them.

1. **A successful write proves a write.** A success message, a passing preview or a provider's
   "configured" says nothing about what visitors get. Every claim in your report names its
   evidence: a rendered page, a test submission that arrived, a saved report.
2. **Scores are necessary, not sufficient.** Four 100s do not show that the offer makes sense or a
   contact request arrives. A missing paragraph, a broken task or a known accessibility barrier is
   a defect at any score. Automated accessibility tests cover part of WCAG; Lighthouse Best
   Practices is not a security audit.
3. **Never manufacture green.** Do not disable audits, hide real content, block a required third
   party only during testing or silence errors. Isolate a dependency to price it; the final
   measurement includes everything visitors receive.
4. **Authority.** Fix reversible defects inside the agreed scope without asking. Ask the owner when
   intent is missing, when a remedy changes scope, cost or required functionality, and before an
   irreversible action they have not authorized. Authorization to publish comes from the task;
   where the platform has a private preview, show a visible change there first, or record why not.
   Ask for a missing credential — never search the owner's machine.
5. **After any error, read the state again** before you claim success or damage.
6. **Keep a site notebook** where the next session finds it — platform, repository or project:
   URL matrix, audit settings, accepted baseline, known constraints, the platform's answers from
   §2, the owner's decisions and why. Read it first, update it last.
7. **One status vocabulary**, first match wins:

| Status | Use when |
|---|---|
| **verification incomplete** | a required check could not run — list it under Unverified |
| **defects remain** | checks ran and a known, fixable defect is still open |
| **exceptions remain** | every open gap is a proven constraint: cause shown, fixes attempted, impact measured |
| **target met** | all required checks ran, the [§7](#7-recipes) three-run median is 100 in each category for every measured URL/device, without rounding up, and no known defect remains in the declared scope |

## 2. Preflight: before the first write

1. **Read** the brief, the existing site and the notebook.
2. **Prove the tools run** — browser, Lighthouse, axe — before planning around them. An inventory
   made without a browser misses everything that only renders.
3. **Put these questions to the platform's documentation** — not its marketing — and write the
   answers in the notebook. They are also fair criteria for comparing platforms.
   - **Which writes are public at once, and which wait for a publish?** Page content is often
     draft-gated while templates, navigation and settings go live on write. A live write has no
     rehearsal: prepare it under a new name, or schedule it like a deployment.
   - **What does a preview render?** Draft content previewed on the *live* templates verifies the
     old template, not the one you are about to edit.
   - **Which writes are checked before they commit?** Validation, a test render and a saved
     revision are three different protections; none implies another.
   - **What does a revision or backup cover?** One that leaves out templates, configuration,
     files or external services restores less than you expect.
   - **How is a whole site restored, and can the restore be undone?**
   - **What does the owner keep on leaving?** Export formats, readable data, the domain. Record
     "no export" too.
4. **Take a recovery point** before changing an existing site, and know what it covers.
5. **Record the baseline** before editing an existing site; for a new site, measure the first
   working candidate.

## 3. The build loop

**Understand → build → inspect → measure → diagnose → improve → verify → report.**

1. **Understand.** Write the working brief: who visits, what they need to learn or do, the primary
   action, required pages and content, brand, constraints, authorization to publish. Infer facts
   from the existing site; ask the owner only for business decisions. Write the visitor tasks down
   now, so success cannot later be redefined around what happens to work.
2. **Build** a coherent design with real content through the platform's supported mechanisms.
3. **Inspect** the rendered site: read it, follow its links, operate its controls, examine
   screenshots — mobile as deliberately as desktop.
4. **Measure** with the [§7 recipes](#7-recipes); tie every result to a URL, a revision and an
   environment.
5. **Diagnose** each finding from the audit's affected elements, requests and trace — not its title.
6. **Improve** one cause at a time, then re-measure, or you cannot tell which remedy worked. Broken
   tasks and inaccessible content come before small performance gains.
7. **Verify** the full [§5 check set](#5-the-checks) on the final candidate, and after authorized
   publication, the public origin.
8. **Report** with [§8](#8-report). Routine diagnosis is never the owner's homework.

**Stop rule:** two iterations on one finding without improvement → stop and re-diagnose: your
implementation, the platform, a required dependency or measurement noise? A proven external
constraint becomes an exception with attempted fixes, remaining impact and the decision or
capability needed — never a disguised pass.

## 4. The change loop

A changed paragraph must not cost the owner a review of the whole site, and a restyle must not
break a page nobody opened.

**Notebook → recovery point → change → re-check the reach → preview → publish → verify → report.**

1. Read the notebook and take a recovery point ([§2](#2-preflight-before-the-first-write)).
2. Make the change in a draft wherever the platform has one.
3. Re-inspect and re-measure what the change can reach:

| Change | Reaches | Minimum re-check |
|---|---|---|
| Copy or image on one page | That page | Visual check narrow and wide, its links, one Lighthouse run per device, axe |
| New page or component | The page, navigation, sitemap | Full §5 check set for the page; crawl the new links; one existing page for regressions |
| Shared template, layout, navigation, design token, site setting, font or script | Every page using it | A deployment: every affected page type, all critical flows |
| New third-party integration | Performance, privacy and failure behaviour site-wide | As above, plus its measured cost and what visitors see when it is down |
| Redesign or platform move | Everything | The [build loop](#3-the-build-loop) against a fresh baseline |

4. Review the preview yourself before the owner sees it — they see the result of your review, not
   its input.
5. Publish, then verify at the public origin; if publishing is outside the task, report a verified
   candidate with public verification pending.
6. Report the delta with [§8](#8-report) and update the notebook.

A single run flags a possible regression; when a small change moves a score, widen the check
instead of explaining it away. For recurring work, put the checks into the site's CI or monitoring
against the accepted baseline, and note who owns the alerts and when the restore was last tested.

## 5. The checks

Each line: the check, then what makes it fail. Thresholds are in [§6](#6-numbers).

### Content and visitor tasks

- **First viewport states what is offered, for whom, and the next action.** Fails when any of
  the three is missing from the first screen.
- **Claims carry specific evidence.** Invented testimonials, stock claims and placeholder copy make
  a finished layout untrustworthy.
- **Pages answer visitor questions** — descriptive titles and navigation labels, one clear
  hierarchy, related information together.
- **Real content from the start.** Long headings, empty lists and translated text expose layouts
  that sample copy hides.
- **Complete each written task end to end.** Business site: find the service, judge the fit, reach
  contact details, send a test enquiry to a test sink and confirm it arrived. Publication: find and
  read an article, then locate related material.

### Migration fidelity

- **Inventory every source URL, download and interaction** before replacing anything — in a
  browser: rendered copy, computed styles, screenshots, asset sources, redirects. Markup under a
  site builder's scripts and hashed class names tells you less.
- **A source host that refuses server-side image requests** still serves the browser session — fetch
  the files there.
- **Name every asset for the next session** — `hero-office.webp`, not `image3.png`.
- **Prove the copy moved:** word-level diff of source and result per page; account for every
  missing token and record intentional changes.
- **Approved legal text moves character for character.** Flag factual changes to its owner.
- **Old URLs redirect** to their new equivalents in one hop.

### Design and responsiveness

- **One small system** of type, spacing, colours and widths, held in tokens. A value repeated by
  hand is a future inconsistency.
- **Brand and content decide the composition.** A repeated hero-and-cards layout is a default, not
  a decision.
- **Typography is navigation.** Distinguishable headings, body measure 60–75 characters as a start,
  line breaks and font loading checked. Fix cramped text through measure, spacing or layout before
  shrinking it.
- **Images explain the subject.** Keep it visible in the crop at every test width; no text baked
  into images; flat colour and simple decoration are CSS, not downloads.
- **Check every test width, then the real breakpoints:** content order, navigation, touch controls,
  no horizontal scroll.
- **Screenshot the first viewport, the full page and each interaction state,** after scrolling
  through lazy content and waiting for images and fonts. Compare related pages side by side for
  alignment, rhythm and density.
- Your visual review finds layout defects. Whether customers understand or prefer the design needs
  feedback from people; claim neither.

### Accessibility and interaction

Working target: [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/) A and AA — a baseline, not a
conformance claim.

- **Native elements for their jobs:** links navigate, buttons act, labels identify inputs.
  Hand-made replacements lose keyboard behaviour and semantics.
- **Structure:** one meaningful heading hierarchy, uniquely named landmarks, page language, a skip
  link, useful image alternatives — empty for decorative images.
- **Contrast, target size, reflow, zoom and text spacing** meet the [§6](#6-numbers) thresholds;
  no meaning carried by colour alone.
- **Operate everything with a keyboard.** Visible focus, logical order; dialogs take focus and
  restore it; sticky headers never cover the focused element.
- **Status and error messages are announced**, not only shown.
- **When present:** captions and transcripts for media, a single-pointer alternative to every
  drag, a login that works with paste and password managers.
- **Motion** that starts by itself and lasts over five seconds can be paused; honour
  `prefers-reduced-motion` as good practice beyond AA.
- **Test states, not pages.** Forms: empty, invalid, server error, success — errors name the field
  and the remedy and keep entered data. Search: match, no match, long query. Menus and dialogs:
  open and closed at narrow widths.
- **Run axe on every important state**, not only initial load, and read `incomplete` as well as
  `violations`. Check names and reading order in the browser's accessibility tree; use assistive
  technology where you have it; list what you could not check as unverified. [Lighthouse
  accessibility scoring](https://developer.chrome.com/docs/lighthouse/accessibility/scoring/)
  excludes manual checks.

### Loading and stability

| Signal | Tells you |
|---|---|
| Largest Contentful Paint (LCP) | When the largest visible content arrives |
| Cumulative Layout Shift (CLS) | Whether content moves unexpectedly |
| Interaction to Next Paint (INP) | How promptly interactions paint — judge it in field data, diagnose single interactions locally |
| Total Blocking Time (TBT) | Main-thread blocking in a lab load; it is not INP |

- **Images at useful sizes:** match rendered dimensions and pixel density; accurate `srcset` and
  `sizes` where the platform has variants; compare WebP and AVIF against the source for bytes and
  artifacts; never upscale; intrinsic dimensions or a reserved aspect ratio on every image.
- **Find the actual LCP element in the report** — it can be text. An LCP image is discoverable in
  the initial HTML, never lazy-loaded, fetched at high priority. Lazy-load what is offscreen, not
  "everything except a guessed hero". A CSS-background hero hides from the preload scanner: measure
  its discovery delay and reserve its space. Preload only what measurably helps.
- **Fonts:** few faces, subset to the site's languages, text visible while loading, fallback
  metrics matched so the swap does not shift; self-host where the licence allows.
- **Scripts:** load what needed behaviour requires, defer the rest, price analytics, embeds and
  widgets before adding them.
- **Verify delivery in the network waterfall:** redirects, compression, cache headers, duplicates,
  errors. Measure transferred bytes — `Content-Length` is absent on chunked responses. Keep cold and
  repeat visits apart. The [Chrome Performance
  panel](https://developer.chrome.com/docs/devtools/performance) explains what the audit cannot.
- **No field data yet?** Record the absence; a lab score is not a substitute.

### Discoverability and reliability

- **Every indexable page:** accurate title, useful description, correct canonical, language,
  social preview metadata, favicon, crawlable links; `hreflang` when language variants exist.
  Verify in the rendered head.
- **Structured data describes visible content** and validates. Invented ratings or facts are a
  defect.
- **Crawl every intended page, link, anchor, download and asset** and compare with the inventory
  so orphans surface. Judge each non-200 by its expected outcome: redirects in one hop, a real 404
  with a useful page for unknown URLs, a sitemap of exactly the canonical indexable pages, intended
  robots directives, private previews, no stray `noindex`.
- **HTTPS everywhere,** no mixed content, console errors or failed requests; no secrets in client
  code or reports.
- **Forms validate on the server too,** and someone owns the inbox they deliver to.
- **Privacy:** third parties and form fields match the owner's approved choices; analytics that
  needs consent waits for it.
- **Legally required pages** — imprint, privacy notice, terms — depend on jurisdiction and
  business. Ask the owner; have them in place before publication.
- **Domain changes: inspect DNS before advising.** Query the records you will touch and those that
  must survive — `www`, apex, MX, TXT — and quote them with their TTLs. A public lookup does not
  list a whole zone; ask for the zone file when in doubt. An unmeasured downtime estimate is a
  guess. Afterwards verify TLS, canonical redirects and the public pages at the final origin.

## 6. Numbers

| What | Threshold |
|---|---|
| Lighthouse | median of 3 runs = 100, each category, each URL/device |
| Test widths | 320, 390, 768, 1440 CSS px, then the real breakpoints |
| Text contrast | 4.5:1; 3:1 for large text (≥ 24 px, or ≥ 18.66 px bold) |
| Non-text contrast (controls, focus indicators, meaningful graphics) | 3:1 |
| Pointer target | 24 × 24 CSS px; WCAG 2.5.8 exempts inline, sufficiently spaced and essential targets |
| Zoom / reflow | usable at 200 % zoom and at 320 CSS px width without two-dimensional scrolling |
| Text spacing | survives line height 1.5, paragraph spacing 2 em, letter 0.12 em, word 0.16 em |
| Field [Core Web Vitals](https://web.dev/articles/vitals), 75th percentile, per device class | LCP ≤ 2.5 s · INP ≤ 200 ms · CLS ≤ 0.1 — good-experience thresholds, not the formula for a Lighthouse 100 |
| Stop rule | 2 iterations without improvement |

## 7. Recipes

### Choose the instrument

| Tool | Use it for |
|---|---|
| Lighthouse CLI | Repeatable lab audits and improvement findings |
| Playwright | Visitor tasks, rendered states, console and request failures |
| axe-core | Accessibility findings per rendered state |
| Browser Network and Performance panels | Explaining slow resources, rendering, interactions |
| [PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about) | Public-URL lab checks and Chrome UX Report field data — record URL or origin scope and period |
| Link crawler, HTTP client, platform diagnostics | URL coverage, redirects, headers, delivery errors |

An origin-wide field result is not proof about one page. Never send preview credentials to a
public service; audit private previews locally.

### Make measurements comparable

- **Record** URL, revision, date, tool and browser versions, machine, device preset, throttling,
  cache and authentication state. Same setup before and after.
- **Audit a production build or a realistic preview.** A preview banner, access gate or indexing
  restriction is a recorded environment difference, not a reason to relax the target.
- **Matrix:** home page, every distinct page template, unusually heavy pages; every critical flow
  and dynamic state separately. The crawl covers all pages.
- **Clean profile, no extensions, idle machine, sequential runs.** Default mobile configuration
  and the desktop preset — a resized window is not the other device.
- **Final verification of a build:** three runs per URL/device on an unchanged candidate, whatever
  status results; single runs serve diagnosis and §4 re-checks. Report each category's median and
  range and keep the raw reports. A median is no permission to discard a poor run — investigate
  unexplained spread. [Lighthouse on
  variability](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md).

### Set up once

The scripts live beside this guide in its repository; fetch them with the guide. They need Chrome
and Node 22.19 or later (Lighthouse 13), and the lockfile pins every version, so nothing moves
mid-comparison. A project with pinned tooling uses its own.

```sh
git clone --depth 1 https://github.com/cityofcode-io/agent-operated-websites.git website-audit
cd website-audit && npm ci && npx playwright install chromium
```

Run both scripts from that directory; they write to `reports/`.

### Run Lighthouse, three times per device

`./lighthouse.sh <url> [name]`, once per matrix URL. Each run writes a new timestamped directory,
so a rerun never overwrites the baseline, then prints one median line per device and category —
`home-mobile performance: median 100 [99–100]`. An empty directory, a runtime error, a missing
score or a group without exactly three runs — a failed invocation included — is an error, never
a pass. Flags: [Lighthouse CLI](https://github.com/GoogleChrome/lighthouse). For diagnosis read
`audits` and their `details`, `runWarnings` and the manual checks in the saved JSON.

### Check the rendered page

`node check-page.mjs <url> [name] [report-directory]` — an initial-load smoke check at 390 and
1440 px, not the matrix: console and request failures, horizontal overflow, axe findings with the
WCAG 2.2 `target-size` rule enabled, a first-viewport screenshot. It exits non-zero on any error
or axe violation. HTTP errors are labelled `own` or `third-party`; judge a third-party failure by
what the visitor loses, and give a page meant to answer 404 its own assertion. Add the site's own
assertions by accessible role and label — open navigation, follow the primary action, test form
and search outcomes — wait for the real ready state on client-rendered sites, re-run axe after
opening hidden content, and extend to your visitors' browsers. [Playwright accessibility
testing](https://playwright.dev/docs/accessibility-testing).

### Turn a finding into a fix

Record every iteration as **finding → cause → change → new evidence**. When an audit's meaning is
uncertain, read its linked documentation; audit names change.

| Finding | Diagnose before editing | Remedy to test |
|---|---|---|
| Slow LCP | Name the element; separate response time, discovery, download and render delay | Fix the measured delay: caching, discoverability, encoding or blocking work |
| Layout shifts | Which elements moved, and what loaded just before | Reserve media and widget space; correct font fallback metrics |
| Long tasks, poor interaction | Record the interaction and its main-thread work | Reduce, defer or split the work; re-test the same interaction |
| Required third-party embed lowers a score | Measure with and without it; confirm with the owner that it is required | Load it on the visitor's request behind a static placeholder, or defer it past the initial task; if it must load at once, record an exception with its measured cost |
| Visually weak page despite 100s | Compare with the brief: hierarchy, copy, composition | Revise the concrete weakness; recheck visual and technical quality |

One recorded pass — the home page of a company site migrated off a site builder, desktop preset;
one site, not a benchmark:

| Finding | Cause | Change | New evidence |
|---|---|---|---|
| Heavy first view | 1792 × 1024 hero shipped as a 4.2 MB PNG | Re-encoded as WebP at the same dimensions | Hero 252 KB |
| CLS 0.408 | Images without intrinsic dimensions | Every `<img>` emits width and height | CLS 0.002 |
| A request for a flat-colour hero background | A one-colour image is not an image | Colour sampled into a design token | One request fewer |

Whole pass: first view 6.8 MB → 605 KiB, requests 27 → 13, performance 76 → 100. The rows are
not the full account — leaving the builder removed its scripts, and self-hosted font subsets
removed the last third-party origin. Two audits stayed flagged (image variants the platform did
not offer, LCP discovery on a CSS background) and were reported as exceptions.

## 8. Report

One structure for a build and a change; a change fills the ◆ lines plus whatever it touched. Link
artifacts instead of describing them, after removing credentials, signed preview URLs and personal
form data.

```text
◆ Site / request or candidate revision / date / guide revision:
◆ Status: target met | exceptions remain | defects remain | verification incomplete
◆ Publication: preview only | published and verified | public verification pending
◆ Changed: what, where, by which mechanism — draft-gated or live on write
◆ Reach: pages and page types affected
◆ Recovery: recovery point, what it covers, how to restore
  Scope: pages, templates, visitor tasks, browsers and viewports checked
  Environment: tool and browser versions, machine, presets, cache/auth state
◆ Lighthouse: per URL/device/category — baseline → final (median [min–max] for target met), report links
  Metrics: LCP, CLS, TBT; field LCP/INP/CLS with period and scope, or unavailable
◆ Checks: task/state → visual, functional, accessibility result → screenshot/trace
  Accessibility: automated findings, keyboard/reflow/assistive checks, remaining gaps
◆ Defects and exceptions: finding → cause/evidence → attempted fixes → impact → next action/owner
◆ Unverified: check → reason → what is needed to complete it
◆ Owner input: decisions asked (intent, tradeoffs) / defects the owner found first
◆ Notebook: updated — what was added
  Next check: triggering change or agreed review date
```

**Owner input has two halves; keep them apart.** A decision about intent or a tradeoff is the
owner's job. A defect the owner found before you is a verification miss: record which check should
have caught it and add that check to the notebook. That count is the one to drive to zero.

Before reporting a build, confirm:

- [ ] Visitor tasks completed end to end; required content present; migration differences accounted
  for.
- [ ] Visual review at all test widths with real content and dynamic states.
- [ ] Critical flows work by keyboard, including failure states.
- [ ] Crawl covers every intended page; audits cover every template and heavy page.
- [ ] Lighthouse evidence matches the claimed status.
- [ ] Automated and manual accessibility checks done; unverified items listed.
- [ ] Recovery and publication status stated; public origin verified or marked pending.

## 9. Reusable instructions for the owner

> Build or improve this website with the quality guide and the brief. Run its preflight and build
> loop. Find and fix routine defects yourself; ask me about intent and consequential tradeoffs.
> Hand me the guide's report with evidence, status, publication and recovery.

> Make this change with the quality guide's change loop. Tell me whether it is draft-gated or live
> on write, show me a preview before publishing, and hand me the report — including how to undo it.

## Revision history

| Revision | Date | Change |
|---|---|---|
| Draft 1 | 2026-09-18 | Replaces the migration-specific guide with platform-neutral education, a verification loop, reproducible evidence and ongoing quality checks. |
| Draft 2 | 2026-09-18 | Adds the change loop with checks scaled to reach, the platform questions, the site notebook, the change report and the owner-input count. |
| Draft 3 | 2026-09-18 | One place per rule: session contract, preflight, checks with failure conditions, one numbers table, one report; adds the **defects remain** status. Snippets rewritten and executed, axe `target-size` enabled, three runs the final evidence for every build. |
| Draft 4 | 2026-09-24 | Cut by a tenth: duplicated explanation, table columns and generic remedy rows removed, no rule dropped. Worked example on the 0–100 scale. |
| Draft 5 | 2026-09-24 | Published as a repository: the scripts moved out of the text into pinned, executable files; the guide keeps their contract. |

Raise the draft number and date for substantive revisions and say here what changed. Re-execute
every script you edit.

## About this guide

Written and maintained by the team behind [spun.ink](https://spun.ink), an agent-operated website
platform; it grew from migrating cityofcode.io there and the Lighthouse pass that followed. That
experience motivates the guide; it does not establish that every site or agent achieves the same.
Nothing here depends on the platform: the guide describes the job, your platform's documentation
describes the tools.
