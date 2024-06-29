import type { Nullable } from '@echo/utils/types/nullable'

/**
 * Removes all special characters, except dash and underscore
 * @param str
 */
export function removeSpecialCharacters<T extends Nullable<string>>(str: T): T {
  return str?.replace(/[^a-zA-Z0-9-_]/g, '') as T
}
