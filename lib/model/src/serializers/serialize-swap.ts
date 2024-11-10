import type { Slug } from '@echo/model/types/slug'
import type { Swap } from '@echo/model/types/swap'

export function serializeSwap<T extends Pick<Swap, 'slug'>>(swap: T): Slug {
  return swap.slug
}
