import type { Erc721Token } from '@echo/model/types/erc721-token'
import type { NftCollection } from '@echo/model/types/nft'
import type { NftToken } from '@echo/model/types/nft-token'
import type { OwnedErc1155Nft } from '@echo/model/types/owned-erc1155-nft'
import type { OwnedErc721Nft } from '@echo/model/types/owned-erc721-nft'
import type { UserWithWallet } from '@echo/model/types/user'
import { assoc, dissoc, modify, pipe } from 'ramda'

export function nftTokenToNft<T extends NftToken>(
  owner: UserWithWallet
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
