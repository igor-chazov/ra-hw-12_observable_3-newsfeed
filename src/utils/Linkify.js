export default function linkify(text) {
  const textWithLinks = text.replace(/((http:\/\/|https:\/\/){1}(www)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-?%#&-]*)*\/?)/gi, '<a href="$1">$1</a>');
  return textWithLinks;
}
