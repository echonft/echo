import type { Nullable } from '@echo/utils/types/nullable'
import { toLower } from 'ramda'

export function getBlurUrlForCollection(chainId: number, slug: string): Nullable<Lowercase<string>> {
  if (chainId === 1) {
    return toLower(`https://blur.io/collection/${slug}`)
  }
  return undefined
}
