import type { Slug } from '@echo/model/types/slug'
import { pipe, replace, toLower } from 'ramda'

/**
 * Converts a string to a slug
 * 1) lowercase
 * 2) replace spaces with "-"
 * 3) remove special characters
 * @param str
 */
export function toSlug(str: string): Slug {
  return pipe(toLower, replace(/\s+/g, '-'), replace(/[^a-zA-Z0-9-_]/g, ''))(str) as Slug
}
