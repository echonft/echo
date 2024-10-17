import type { NftCollection } from '@echo/model/types/nft/nft'
import type { OwnedErc1155Nft } from '@echo/model/types/nft/owned-erc1155-nft'
import type { OwnedErc721Nft } from '@echo/model/types/nft/owned-erc721-nft'
import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'
import type { Erc721Token } from '@echo/model/types/token/erc721-token'
import type { User } from '@echo/model/types/user/user'
import { assoc, dissoc, modify, pipe } from 'ramda'

export function tokenToNft<T extends Erc721Token | Erc1155Token>(
  owner: User
): (token: T) => T extends Erc721Token ? Omit<OwnedErc721Nft, 'attributes'> : Omit<OwnedErc1155Nft, 'attributes'> {
  return function <T extends Erc721Token | Erc1155Token>(
    token: T
  ): T extends Erc721Token ? Omit<OwnedErc721Nft, 'attributes'> : Omit<OwnedErc1155Nft, 'attributes'> {
    const { contract } = token
    return pipe(
      modify<'collection', Omit<NftCollection, 'contract'>, NftCollection>('collection', assoc('contract', contract)),
      dissoc('contract'),
      assoc('owner', owner)
    )(token) as unknown as T extends Erc721Token
      ? Omit<OwnedErc721Nft, 'attributes'>
      : Omit<OwnedErc1155Nft, 'attributes'>
  }
}
