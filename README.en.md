# Listening Script Kit / 长文节目工具箱

Three small, local-only tools for turning an AI-written long text into a script you can actually listen to: build a writing prompt, review patterns that need attention, and export the narration separately from its references.

[Use the live toolkit](https://godgod126.github.io/listening-script-kit/?lang=en) · [打开中文工具箱](https://godgod126.github.io/listening-script-kit/?lang=zh)

[Download the v1.3.1 ZIP](https://github.com/GODGOD126/listening-script-kit/releases/download/v1.3.1/listening-script-kit-v1.3.1.zip) · [Release notes](https://github.com/GODGOD126/listening-script-kit/releases/tag/v1.3.1)
Extract the whole folder before opening `index.html`; opening a file inside a ZIP may leave the scripts unavailable. The release contains only this public kit, with no app code or voice models. The hosted page is the simplest way to try it on a phone.

**No account, API key, package install, analytics, or cloud upload.** Download this repository and open `index.html` in a modern browser. All three tools work without a server. The kit does not generate content or speech, verify facts, or replace a listening app.

[Play the complete Chinese audio lesson in your browser](https://godgod126.github.io/listening-script-kit/learning/mean-median/). AI voice generated on Mac, not an iPhone recording; no account or app purchase required.

## Start with bundled complete scripts

The live and offline kit include source-checked Chinese and English map and QR-code explainers plus an original Frankenstein book discussion. Choose an example to fill the review draft, title, narration and reference fields. Existing different text is kept until you explicitly choose to replace those four fields; changing the example or language alone never rewrites your input. Prompt inputs are not replaced. The kit bundles text only. Matching episode audio pages have been withdrawn; the product page retains its original four Chinese voice samples, which are separate from these scripts.

## Try it

1. Open `index.html`, then select English or 中文.
2. Choose a subject and add source notes. Generate a prompt to use in your preferred AI writing tool. The kit itself does not contact that tool.
3. Paste **only the spoken script** into the review step. Long paragraphs, links, Markdown tables, code fences, and possible formulas are suggestions to inspect, not automatic errors. The text is never rewritten.
4. Keep the title, narration, and reference notes in their separate fields. Copy or download the narration as TXT. Download a second TXT to retain the references.

If automatic clipboard access is unavailable, use **Manual copy** or download TXT. Closing the page loses unsaved input; this is intentional. The kit does not use browser storage.

## Use the listening-script agent skill

[Read the skill](skills/listening-script/SKILL.md) · [See the worked example](skills/listening-script/references/worked-example.md)

The skill adapts research reports, articles, book notes, and AI drafts for listening while preserving numbers, source attribution, uncertainty, and the requested detail. It keeps source notes separate and does not append product advertising to your narration. It is instruction-only: no scripts, API calls, voice generation, or account access.

Copy the `skills/listening-script` folder to your agent's skill directory, or use the [open skills CLI](https://skills.sh/docs):

```sh
npx skills add GODGOD126/listening-script-kit --skill listening-script
```

The CLI is a separate tool and downloads files from GitHub. Review the skill before installing; follow the CLI prompts for your chosen agent and scope. Its installation telemetry can be disabled with `DISABLE_TELEMETRY=1`. The plain browser toolkit requires no installation.

Example request: “Use listening-script to turn this research report into a Chinese narration. Keep the detail and evidence limits; explain the tables in spoken sentences, and put URLs in separate notes.”

## Why references stay separate

[Try a study episode: mean vs median](learning/mean-median/README.md). The pack includes complete Chinese and English narrations, reusable study prompts, separate source notes and checked fictional exercises. A [separate 8m17s Chinese AI-speech demo](https://github.com/GODGOD126/listening-script-kit/releases/tag/zh-audio-demo-20261004) is available as a release attachment. It was generated on Mac, not recorded on iPhone. The toolkit remains text-only; no learning-outcome or real-device performance claim is made.

A source URL is valuable evidence but rarely useful when a voice reads out its punctuation. A table can contain useful information while still needing spoken sentences. This kit flags such patterns and leaves the writing decision to you. It does not remove citations, determine copyright, or certify that a script is safe or accurate.

The review limit is 100,000 Unicode characters. An over-limit draft is rejected without truncating or altering it. Review output identifies line numbers; review suggestions can include false positives. Prompt material is limited to 15,000 characters, with an explicit warning before a prompt is built if the limit is exceeded.

## Files and reuse

| File | Purpose |
| --- | --- |
| `lib/prompt-core.js` | Bilingual writing prompts for six kinds of listening script |
| `lib/draft-check.js` | Pure text-pattern analyzer, usable in a browser or Node |
| `lib/narration.js` | One narration serializer shared by copy and TXT |
| `lib/complete-examples.js` | Six complete bilingual scripts and source notes, with overwrite checks |
| `examples/narration-export-zh.html` | Self-contained Chinese export example |
| `examples/narration-export-en.html` | Self-contained English export example |
| `tests/core.test.cjs` | Representative source, Unicode, boundary, and export checks |

The source files are plain JavaScript. To run the checks with Node already installed:

```sh
npm test
```

There are no dependencies and no install step. See [LICENSE](LICENSE) for MIT terms. The license covers this code and its original examples; linked third-party source material retains its own terms.

## Voice samples

[Listen to the original four Chinese voice samples](https://mylisten.vibestation.cn/#listen). These are product demonstrations, not recordings of the bundled example scripts. The former complete episode library and case pages have been withdrawn. The bundled map, QR-code and Frankenstein texts and their source notes remain available in the toolkit.

## About this project

Created by Ryan Zhu, developer of [「自听」MyListen](https://mylisten.vibestation.cn/en/), with AI assistance. The kit is an independent preparation resource. It works with other listening tools too.

「自听」MyListen turns your text into saved audio episodes with local voice models on iPhone and iPad. It supports background and Lock Screen listening, saved progress, and M4A export. The app can be downloaded and tried; full features unlock through an in-app purchase. **No subscription and no ads.** The app's commercial terms are separate from this free MIT-licensed kit.

[中文说明](README.zh-CN.md) · [MyListen product page](https://mylisten.vibestation.cn/en/)

## Implementation notes

[Unicode counts, original-text selection, and narration export](docs/text-review-contracts.md) explains the checked design contracts with runnable examples and explicit limits.


The Frankenstein example is an original discussion of the 1818 three-volume novel and contains major plot events and the ending. Its source links and chapter checks stay outside the narration.
