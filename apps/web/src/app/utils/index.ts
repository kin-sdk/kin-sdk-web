export function elipsify(str = '', len = 10) {
  if (str.length > 30) {
    return str.substr(0, len) + '...' + str.substr(str.length - len, str.length)
  }
  return str
}
