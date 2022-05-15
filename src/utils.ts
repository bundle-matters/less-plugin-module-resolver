// https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
export function escapeRegex(str: string) {
  // $& means the whole matched string
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}
