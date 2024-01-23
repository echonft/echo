import type { Nft } from '@echo/model/types/nft'
import type { NftStack } from '@echo/ui/types/nft-stack'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { always, applySpec, converge, head, identity, ifElse, isEmpty, mergeDeepLeft, pick, pipe, prop } from 'ramda'

interface FunctionsArgs {
  nfts: NonEmptyArray<Nft>
}
export function getNftStackFromArray(nfts: Nft[]): NftStack | undefined {
  return ifElse(
    isEmpty,
    always(undefined),
    pipe(
      applySpec<FunctionsArgs>({ nfts: identity }),
      converge<
        NftStack,
        [(args: FunctionsArgs) => Omit<NftStack, 'nfts'>, (args: FunctionsArgs) => Pick<NftStack, 'nfts'>]
      >(mergeDeepLeft, [
        pipe<[FunctionsArgs], NonEmptyArray<Nft>, Nft, Omit<NftStack, 'nfts'>>(
          prop('nfts'),
          head,
          pick(['owner', 'collection', 'pictureUrl', 'tokenId'])
        ),
        identity
      ])
    )
  )(nfts)
}
