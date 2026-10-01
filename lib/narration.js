(function (root) {
  'use strict';
  function serialize(title, body) {
    if (typeof title !== 'string' || typeof body !== 'string') throw new TypeError('Title and body must be strings.');
    const cleaned = body.replace(/\r\n?/g, '\n').trim();
    if (!cleaned) throw new Error('A spoken script is required.');
    // References are deliberately absent from this signature.
    return [title.replace(/\r\n?/g, '\n').trim(), cleaned].filter(Boolean).join('\n\n') + '\n';
  }
  const api = { serialize };
  if (typeof module !== 'undefined' && module.exports) module.exports=api;
  else root.ListeningNarration=api;
})(typeof window !== 'undefined' ? window : this);
