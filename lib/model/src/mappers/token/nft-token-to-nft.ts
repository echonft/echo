import type { NftCollection, OwnedErc1155Nft, OwnedErc721Nft } from '@echo/model/types/nft'
import type { Erc721Token, NftToken } from '@echo/model/types/token'
import type { User } from '@echo/model/types/user'
import { assoc, dissoc, modify, pipe } from 'ramda'

export function nftTokenToNft<T extends NftToken>(
  owner: User
): (token: T) => T extends Erc721Token ? Omit<OwnedErc721Nft, 'attributes'> : Omit<OwnedErc1155Nft, 'attributes'> {
  return function <T extends NftToken>(
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
