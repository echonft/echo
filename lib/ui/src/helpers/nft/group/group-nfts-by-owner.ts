import type { Nft } from '@echo/model/types/nft'
import { NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import type { NftGroup } from '@echo/ui/types/nft-group'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { applySpec, assoc, groupBy, head, map, path, pipe, values } from 'ramda'

export function groupNftsByOwner(nfts: Nft[]): NftGroup[] {
  return pipe(
    groupBy(nonNullableReturn(path<string>(['owner', 'discord', 'username']))),
    values,
    map(
      applySpec<NftGroup>({
        id: pipe(head, path(['owner', 'discord', 'username'])),
        items: map(pipe(assoc('action', NFT_ACTION_OFFER)))
      })
    )
  )(nfts)
}
