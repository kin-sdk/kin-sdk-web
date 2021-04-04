import * as shaJs from 'sha.js'

export function hash(data) {
  const hasher = new shaJs.sha256()
  hasher.update(data, 'utf8')
  return hasher.digest()
}
