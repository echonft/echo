import type { NftIndex } from '@echo/model/types/nft'
import { PathError } from '@echo/routing/constants/errors/path-error'
import { throwError } from '@echo/utils/helpers/throw-error'
import { applySpec, complement, equals, head, last, length, partialRight, pipe, split, when } from 'ramda'

export function getNftIndexFromSearchParam(param: string): NftIndex {
  return pipe(
    split('.'),
    when(pipe(length, complement(equals(2))), throwError(PathError.SearchParametersInvalid)),
    applySpec<NftIndex>({
      collection: {
        slug: head
      },
      tokenId: pipe(last, partialRight(parseInt, [10]))
    })
  )(param)
}
