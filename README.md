# Listening Script Kit / 长文节目工具箱

Three small, local-only tools for turning an AI-written long text into a script you can actually listen to: build a writing prompt, review patterns that need attention, and export the narration separately from its references.

[Use the live toolkit](https://godgod126.github.io/listening-script-kit/) · [打开中文工具箱](https://godgod126.github.io/listening-script-kit/?lang=zh)

[Download the v1.0.1 ZIP](https://github.com/GODGOD126/listening-script-kit/releases/download/v1.0.1/listening-script-kit-v1.0.1.zip) · [Release notes](https://github.com/GODGOD126/listening-script-kit/releases/tag/v1.0.1)
Extract the whole folder before opening `index.html`; opening a file inside a ZIP may leave the scripts unavailable. The release contains only this public kit, with no app code or voice models. The hosted page is the simplest way to try it on a phone.

**No account, API key, package install, analytics, or cloud upload.** Download this repository and open `index.html` in a modern browser. All three tools work without a server. The kit does not generate content or speech, verify facts, or replace a listening app.

## Try it

1. Open `index.html`, then select English or 中文.
2. Choose a subject and add source notes. Generate a prompt to use in your preferred AI writing tool. The kit itself does not contact that tool.
3. Paste **only the spoken script** into the review step. Long paragraphs, links, Markdown tables, code fences, and possible formulas are suggestions to inspect, not automatic errors. The text is never rewritten.
4. Keep the title, narration, and reference notes in their separate fields. Copy or download the narration as TXT. Download a second TXT to retain the references.

If automatic clipboard access is unavailable, use **Manual copy** or download TXT. Closing the page loses unsaved input; this is intentional. The kit does not use browser storage.

## Why references stay separate

A source URL is valuable evidence but rarely useful when a voice reads out its punctuation. A table can contain useful information while still needing spoken sentences. This kit flags such patterns and leaves the writing decision to you. It does not remove citations, determine copyright, or certify that a script is safe or accurate.

The review limit is 100,000 Unicode characters. An over-limit draft is rejected without truncating or altering it. Review output identifies line numbers; review suggestions can include false positives. Prompt material is limited to 15,000 characters, with an explicit warning before a prompt is built if the limit is exceeded.

## Files and reuse

| File | Purpose |
| --- | --- |
| `lib/prompt-core.js` | Bilingual writing prompts for six kinds of listening script |
| `lib/draft-check.js` | Pure text-pattern analyzer, usable in a browser or Node |
| `lib/narration.js` | One narration serializer shared by copy and TXT |
| `examples/narration-export-zh.html` | Self-contained Chinese export example |
| `examples/narration-export-en.html` | Self-contained English export example |
| `tests/core.test.cjs` | Representative source, Unicode, boundary, and export checks |

The source files are plain JavaScript. To run the checks with Node already installed:

```sh
npm test
```

There are no dependencies and no install step. See [LICENSE](LICENSE) for MIT terms. The license covers this code and its original examples; linked third-party source material retains its own terms.

## A complete listening example

[Voyager: complete English and Chinese scripts, sources, and audio](https://mylisten.vibestation.cn/guides/voyager-listening-case/en/). It shows why entering interstellar space and leaving the solar system are different questions. The AI-assisted writing was checked against NASA material. Audio was made with the models and native code archived in 「自听」MyListen 1.1.5 Build 83 using a separate Mac mini tool, not recorded on an iPhone.


[The bilingual episode library](https://mylisten.vibestation.cn/library/en/) also provides map-projection and QR-code explainers, with complete audio, matching scripts, public sources and reusable prompts. The map example includes an interactive local scale illustration. Audio was generated with archived Build 83 models and native code in a separate Mac mini tool, not recorded on an iPhone.

## About this project

Created by Ryan Zhu, developer of [「自听」MyListen](https://mylisten.vibestation.cn/en/), with AI assistance. The kit is an independent preparation resource. It works with other listening tools too.

「自听」MyListen turns your text into saved audio episodes with local voice models on iPhone and iPad. It supports background and Lock Screen listening, saved progress, and M4A export. The app can be downloaded and tried; full features unlock through an in-app purchase. **No subscription and no ads.** The app's commercial terms are separate from this free MIT-licensed kit.

[中文说明](README.zh-CN.md) · [Product facts and limits](https://mylisten.vibestation.cn/guides/product-facts/en/)

## Implementation notes

[Unicode counts, original-text selection, and narration export](docs/text-review-contracts.md) explains the checked design contracts with runnable examples and explicit limits.
