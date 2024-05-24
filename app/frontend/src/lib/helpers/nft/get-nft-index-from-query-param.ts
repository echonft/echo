import type { NftIndex } from '@echo/model/types/nft-index'
import { throwError } from '@echo/utils/fp/throw-error'
import { applySpec, complement, equals, head, last, length, partialRight, pipe, split, when } from 'ramda'

export function getNftIndexFromQueryParam(param: string): NftIndex {
  return pipe(
    split('|'),
    when(pipe(length, complement(equals(2))), throwError('invalid NFT parameter')),
    applySpec<NftIndex>({
      collection: {
        slug: head
      },
      tokenId: pipe(last, partialRight(parseInt, [10]))
    })
  )(param)
}
