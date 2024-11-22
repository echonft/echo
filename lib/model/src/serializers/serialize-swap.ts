import type { Swap } from '@echo/model/types/swap'

export function serializeSwap<T extends Pick<Swap, 'slug'>>(swap: T): Lowercase<string> {
  return swap.slug
}
