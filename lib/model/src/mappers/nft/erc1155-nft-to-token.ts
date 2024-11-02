import type { Erc1155Nft, NftCollection } from '@echo/model/types/nft'

import type { Erc1155Token } from '@echo/model/types/token'
import { assoc, dissoc, modify, pipe } from 'ramda'

export function erc1155NftToToken(nft: Erc1155Nft): Erc1155Token {
  const contract = nft.collection.contract
  return pipe<
    [Erc1155Nft],
    Omit<Erc1155Nft, 'attributes'>,
    Omit<Erc1155Nft, 'attributes' | 'owner'>,
    Omit<Erc1155Token, 'collection'> & Record<'collection', NftCollection>,
    Erc1155Token
  >(
    dissoc('attributes'),
    dissoc('owner'),
    assoc('contract', contract),
    modify<'collection', NftCollection, Erc1155Token['collection']>('collection', dissoc('contract'))
  )(nft)
}
