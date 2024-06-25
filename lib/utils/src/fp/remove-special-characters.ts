/**
 * Removes all special characters, except dash and underscore
 * @param str
 */
export function removeSpecialCharacters<T extends string>(str: T) {
  return str.replace(/[^a-zA-Z0-9-_]/g, '') as T
}
