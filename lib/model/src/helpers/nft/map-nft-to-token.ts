import type { Erc721Nft, Nft, NftCollection } from '@echo/model/types/nft'
import type { Erc1155Token, Erc721Token, NftToken, NftTokenCollection, NftTokenNft } from '@echo/model/types/token'
import { assoc, dissoc, modify, pipe } from 'ramda'

export function mapNftCollectionToNftTokenCollection(collection: NftCollection): NftTokenCollection {
  return dissoc('contract', collection)
}

export function mapNftToNftTokenNft(nft: Nft): NftTokenNft {
  return pipe<[Nft], Omit<Nft, 'attributes'>, Omit<Nft, 'attributes' | 'owner'>, NftTokenNft>(
    dissoc('attributes'),
    dissoc('owner'),
    modify('collection', mapNftCollectionToNftTokenCollection)
  )(nft)
}

export function mapNftToToken<T extends Nft>(nft: T): T extends Erc721Nft ? Erc721Token : Erc1155Token {
  const contract = nft.collection.contract
  return pipe<[T], Omit<NftToken, 'contract'>, NftToken>(
    mapNftToNftTokenNft,
    assoc('contract', contract)
  )(nft) as T extends Erc721Nft ? Erc721Token : Erc1155Token
}
