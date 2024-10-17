import type { Erc721Nft } from '@echo/model/types/nft/erc721-nft'
import type { NftCollection } from '@echo/model/types/nft/nft'
import type { Erc721Token } from '@echo/model/types/token/erc721-token'
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
