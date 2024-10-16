import type { NftCollection } from '@echo/model/types/nft/nft'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'
import type { Erc721Token } from '@echo/model/types/token/erc721-token'
import type { User } from '@echo/model/types/user/user'
import { assoc, dissoc, modify, pipe } from 'ramda'

export function tokenToNft(token: Erc721Token | Erc1155Token, owner: User): Omit<OwnedNft, 'attributes'> {
  const { contract } = token
  return pipe(
    modify<'collection', Omit<NftCollection, 'contract'>, NftCollection>('collection', assoc('contract', contract)),
    dissoc('contract'),
    assoc('owner', owner)
  )(token)
}
