(function (root) {
  'use strict';
  const LIMIT = 100000;
  function analyze(text) {
    const chars = Array.from(text).length;
    if (chars > LIMIT) return { error: 'limit', chars };
    if (!text.trim()) return { error: 'empty', chars: 0 };
    const lines = text.split(/\r\n|\r|\n/);
    const issues = [];
    let offset = 0, fence = null, paragraph = [], paragraphStart = 0;
    let paragraphCount = 0, links = 0, previousTable = false;
    function endParagraph() {
      if (!paragraph.length) return;
      paragraphCount++;
      const value = paragraph.join(' ');
      const han = (value.match(/\p{Script=Han}/gu) || []).length;
      const words = (value.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g) || []).length;
      if (han > 220 || words > 120) issues.push({ type: 'long', line: paragraphStart + 1, start: starts[paragraphStart], end: starts[paragraphStart] + lines[paragraphStart].length });
      paragraph = [];
    }
    const starts = [];
    for (const line of lines) { starts.push(offset); offset += line.length; const sep = text.slice(offset).match(/^(\r\n|\r|\n)/); if (sep) offset += sep[0].length; }
    lines.forEach((line, i) => {
      const add = type => issues.push({ type, line: i + 1, start: starts[i], end: starts[i] + line.length });
      const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
      if (fenceMatch) {
        previousTable = false;
        if (!fence) { endParagraph(); fence = fenceMatch[1]; add('code'); }
        else if (fenceMatch[1][0] === fence[0] && fenceMatch[1].length >= fence.length) fence = null;
        return;
      }
      if (fence) return;
      const urls = line.match(/https?:\/\/[^\s<>"）)]+/gi) || [];
      if (urls.length) { links += urls.length; add('link'); }
      const separator = value => /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(value || '');
      const table = /^\s*\|?.+\|.+\|/.test(line) || separator(line) || (line.includes('|') && (separator(lines[i+1]) || previousTable));
      if (table && !previousTable) add('table');
      previousTable = table;
      if (/\$\$|\\\[|\\\(|\$[^$\n]+\$/.test(line)) add('formula');
      if (!line.trim()) endParagraph();
      else { if (!paragraph.length) paragraphStart = i; paragraph.push(line); }
    });
    endParagraph();
    if (fence) issues.push({type:'unclosed',line:lines.length,start:starts.at(-1),end:text.length});
    issues.sort((a,b) => a.line - b.line || a.type.localeCompare(b.type));
    return { chars, paragraphs: paragraphCount, links, issues };
  }
  const api = { analyze, LIMIT };
  if (typeof module !== 'undefined' && module.exports) module.exports=api;
  else root.ListeningDraftCheck=api;
})(typeof window !== 'undefined' ? window : this);
