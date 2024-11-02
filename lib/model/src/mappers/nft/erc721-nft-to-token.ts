import type { Erc721Nft, NftCollection } from '@echo/model/types/nft'

import type { Erc721Token } from '@echo/model/types/token'
import { assoc, dissoc, modify, pipe } from 'ramda'

export function erc721NftToToken(nft: Erc721Nft): Erc721Token {
  const contract = nft.collection.contract
  return pipe<
    [Erc721Nft],
    Omit<Erc721Nft, 'attributes'>,
    Omit<Erc721Nft, 'attributes' | 'owner'>,
    Omit<Erc721Token, 'collection'> & Record<'collection', NftCollection>,
    Erc721Token
  >(
    dissoc('attributes'),
    dissoc('owner'),
    assoc('contract', contract),
    modify<'collection', NftCollection, Erc721Token['collection']>('collection', dissoc('contract'))
  )(nft)
}
