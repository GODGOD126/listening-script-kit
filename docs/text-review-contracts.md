# A text-review tool that keeps Unicode counts and textarea offsets separate

A document prepared for listening has two different jobs. Its narration should be understandable without a screen. Its reference notes should preserve where the claims came from. Mixing both into a single export makes a voice read URLs and Markdown tables; deleting them loses evidence.

The [Listening Script Kit](https://godgod126.github.io/listening-script-kit/) is a small, dependency-free browser project for preparing that boundary. Its reviewer flags text patterns, points back to the original input, and leaves all editing to the person using it. It neither generates speech nor verifies the truth of a script.

This article explains three implementation decisions that are useful beyond a listening tool: using different units for character limits and text selection, keeping detection separate from editing, and using one serializer for copy and export. The [source is MIT licensed](https://github.com/GODGOD126/listening-script-kit). The code and examples below were checked against the current project; this article was prepared with AI assistance.

## 1. A character count is not necessarily a selection offset

JavaScript strings use UTF-16 code units. A simple emoji may occupy two code units even though a reader sees one symbol:

```js
const text = '🙂\nhttps://example.org';
console.log(text.length);             // 22 UTF-16 code units
console.log(Array.from(text).length); // 21 Unicode code points
console.log(text.indexOf('https'));   // 3, an offset in code units
```

The reviewer counts code points for its 100,000-character input limit. It keeps issue offsets in UTF-16 code units because `textarea.selectionStart`, `textarea.selectionEnd`, `String.prototype.slice`, and `setSelectionRange` use that indexing model.

Changing the URL offset from 3 to 2 because the emoji counts as one code point selects the wrong part of the original string. The count used to communicate a limit and the index used to manipulate a browser text field serve different purposes.

Code points are not grapheme clusters either. For example, `e` followed by a combining accent is two code points, while a family emoji can contain several emoji and joining code points. This tool does not claim to count visual characters or reading time. A grapheme-based product would need an explicit policy, perhaps using `Intl.Segmenter`, and would still need to map a grapheme position back to UTF-16 before selecting text.

## 2. Locate lines without normalizing the original input

Pasted files may contain LF, CRLF, or CR line endings. The reviewer splits them to recognize logical lines, but calculates selection offsets against the untouched string:

```js
const lines = text.split(/\r\n|\r|\n/);
const starts = [];
let offset = 0;

for (const line of lines) {
  starts.push(offset);
  offset += line.length;
  const separator = text.slice(offset).match(/^(\r\n|\r|\n)/);
  if (separator) offset += separator[0].length;
}
```

Suppose the input is:

```js
const input = '🙂\r\n\r\nhttps://example.org/source';
```

The third line starts at code-unit offset 6. The first emoji contributes 2, and each CRLF contributes 2. An issue can therefore carry this small contract:

```js
{ type: 'link', line: 3, start: 6, end: input.length }
```

The caller can recover the exact original line with `input.slice(start, end)`. The selection excludes the newline, and a line number remains useful even when selection is unavailable.

Normalizing CRLF to LF is fine when serializing a new file. Doing it before locating an issue is a different operation: offsets in the normalized string are no longer guaranteed to match the input. In this project, export normalization happens later, in a separate function.

The interface also invalidates review results when the draft changes. A location found in yesterday's text is not a valid location in today's edited text. “Find in text” is available only for the reviewed input; the user is asked to run the review again after an edit.

## 3. Detection should suggest a decision, not silently make it

The reviewer identifies a limited set of patterns:

- HTTP or HTTPS URLs;
- possible Markdown tables;
- fenced code blocks and an unclosed fence;
- possible formulas using common delimiters;
- paragraphs above a simple Chinese-character or English-word threshold.

These are cues to inspect, rather than errors to remove. A URL might be the subject of the lesson. A table might need a spoken explanation. A formula detector can flag dollar-delimited text that is not mathematics. A long paragraph can be perfectly clear, and a short paragraph can still be confusing.

The analyzer returns `{ chars, paragraphs, links, issues }`, or an explicit empty-input or length-limit result. It never returns a replacement draft. This makes a useful product boundary easy to see: the tool identifies formatting work; the author decides what should be said.

The limits are also explicit. The reviewer is a heuristic, not a complete Markdown parser. It does not cover every link form, every table syntax, every language's word boundaries, factual reliability, pronunciation, or copyright. It shows at most 80 suggestions in the interface to avoid turning a long input into an unmanageable list. An over-limit input is rejected, not silently shortened.

That distinction is useful when designing AI-adjacent tools. “We found no patterns” must not turn into “this content is verified.” The clean result in this interface expressly tells the user that factual and pronunciation checks remain separate.

## 4. Keep narration and reference notes in different fields

The export screen has three inputs: an optional episode title, the narration, and reference notes. References never enter the narration serializer.

The actual serializer is deliberately small:

```js
function serialize(title, body) {
  if (typeof title !== 'string' || typeof body !== 'string') throw new TypeError('Title and body must be strings.');
  const cleaned = body.replace(/\r\n?/g, '\n').trim();
  if (!cleaned) throw new Error('A spoken script is required.');
  // References are deliberately absent from this signature.
  return [title.replace(/\r\n?/g, '\n').trim(), cleaned].filter(Boolean).join('\n\n') + '\n';
}
```

One serializer supplies automatic copy, the manual-copy textarea, and the narration TXT download. That avoids a subtle disagreement in which a download includes a title but the clipboard does not, or one path inadvertently appends reference notes.

Reference notes have their own TXT export. This is separation, not deletion: a person can keep evidence alongside the listening file while choosing exactly what is read aloud.

The review-to-export action has another guard. If the narration field already contains different text, the tool refuses to overwrite it. It tells the user what happened and leaves the existing draft in place. A button that saves one step should not destroy work in another field.

## 5. “Local processing” needs a concrete scope

The application code does not call an AI endpoint, upload a draft, use analytics, or write input to browser storage. It has no package dependencies and no backend. Opening the hosted page still downloads its static HTML, CSS, and JavaScript; following an external link is a separate network action.

The no-storage decision has a visible cost: closing or refreshing the page loses unsaved input. The interface states that before users begin, and copy/manual-copy/TXT give them ways to save their work. Local processing is not the same thing as automatic persistence.

This is also not a claim that every browser extension, hosting provider, or operating system is outside the user's trust model. The narrow claim is about this application's handling of draft text. The project includes a source check for network and storage calls, but that check is an aid to reviewing the small codebase, not a general security certification.

## 6. Verify contracts with inputs that expose the mistakes

The repository includes dependency-free Node checks:

```sh
npm test
```

The useful cases are chosen for behavior, rather than mirroring every line of the implementation:

- an emoji verifies that a count can differ from a string index;
- CRLF input verifies that slices still point at the original line;
- an unclosed code fence produces an explicit review suggestion;
- a source note containing literal HTML remains data in the prompt;
- the narration serializer produces the same intended text with or without an optional title;
- empty and over-limit inputs fail explicitly.

The browser checks serve a different purpose. The live Chinese page has been exercised with a URL after an emoji, the “Find in text” action selected the exact URL, and manual export retained the narration while excluding the reference URL. A 375-pixel layout was also checked. A Node assertion does not establish that a browser download completed or that the clipboard received the right text, so those outcomes must be reported separately.

For the hosted toolkit, the dynamic download button has been invoked, but the browser tool has not returned a completed-download event. The UI reports that a download was started, and the manual-copy path is available. This article does not present an attempted download as a verified completed file transfer.

## Reuse the boundary, not just the interface

The reusable part of this project is a set of small contracts:

1. Count code points for an explicit input limit; keep browser offsets in UTF-16.
2. Locate review issues against the unchanged original string.
3. Return suggestions without silently rewriting the author's draft.
4. Serialize narration once and keep reference notes outside that function.
5. State the cost of no storage and provide a manual saving path.

You can [try the toolkit](https://godgod126.github.io/listening-script-kit/) or read the [analyzer, serializer, and representative checks](https://github.com/GODGOD126/listening-script-kit). It can prepare text for any compatible listening tool.

Disclosure: Ryan Zhu is the developer of the toolkit and 「自听」MyListen. The project and this article were prepared with AI assistance; the described code contracts and representative examples were checked. There are no user-growth, performance, or conversion claims in this technical example.
