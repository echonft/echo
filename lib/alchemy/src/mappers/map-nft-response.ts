import { type Attribute, type NftResponse } from '@echo/alchemy/types/response/nft-response'
import { getBlurUrl } from '@echo/model/helpers/nft/get-blur-url'
import { getOpenSeaUrl } from '@echo/model/helpers/nft/get-open-sea-url'
import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { NftAttribute } from '@echo/model/types/nft-attribute'
import type { User } from '@echo/model/types/user'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import {
  always,
  applySpec,
  converge,
  ifElse,
  invoker,
  isNil,
  isNotNil,
  map,
  partialRight,
  path,
  pathEq,
  pathSatisfies,
  pipe,
  prop,
  unless
} from 'ramda'

function internalFn(collection: Collection, owner: User): (nftResponse: NftResponse) => Omit<Nft, 'id' | 'updatedAt'> {
  return function (nftResponse: NftResponse): Omit<Nft, 'id' | 'updatedAt'> {
    return pipe(
      applySpec<Omit<Nft, 'id' | 'updatedAt'>>({
        attributes: pipe(
          nonNullableReturn(path(['raw', 'metadata', 'attributes'])),
          map<Attribute, NftAttribute>(
            applySpec<NftAttribute>({
              value: pipe(prop('value'), unless(isNil, invoker(0, 'toString'))),
              trait: pipe(prop('trait_type'), unless(isNil, invoker(0, 'toString')))
            })
          )
        ),
        balance: ifElse(
          pathEq('ERC1155', ['contract', 'tokenType']),
          pipe(prop('balance'), partialRight(parseInt, [10])),
          always(1)
        ),
        blurUrl: converge<string, [(response: NftResponse) => string, (response: NftResponse) => number]>(getBlurUrl, [
          nonNullableReturn(path(['contract', 'address'])),
          pipe(prop('tokenId'), partialRight(parseInt, [10]))
        ]),
        collection: always(collection),
        name: prop('name'),
        openSeaUrl: converge<string, [(response: NftResponse) => string, (response: NftResponse) => number]>(
          getOpenSeaUrl,
          [nonNullableReturn(path(['contract', 'address'])), pipe(prop('tokenId'), partialRight(parseInt, [10]))]
        ),
        owner: always(owner),
        // Not all links are always provided so add either cached or original if pngUrl does not exist
        pictureUrl: ifElse(
          pathSatisfies(isNotNil, ['image', 'pngUrl']),
          path(['image', 'pngUrl']),
          ifElse(
            pathSatisfies(isNotNil, ['image', 'cachedUrl']),
            path(['image', 'cachedUrl']),
            path(['image', 'originalUrl'])
          )
        ),
        // Not all links are always provided so add original if thumbnailUrl does not exist
        thumbnailUrl: ifElse(
          pathSatisfies(isNotNil, ['image', 'thumbnailUrl']),
          path(['image', 'thumbnailUrl']),
          path(['image', 'originalUrl'])
        ),
        tokenId: pipe(prop('tokenId'), partialRight(parseInt, [10])),
        tokenType: path(['contract', 'tokenType'])
      })
    )(nftResponse)
  }
}

export function mapNftResponse(
  collection: Collection,
  owner: User
): (nftResponse: NftResponse) => Omit<Nft, 'id' | 'updatedAt'>
export function mapNftResponse(
  collection: Collection,
  owner: User,
  nftResponse: NftResponse
): Omit<Nft, 'id' | 'updatedAt'>
export function mapNftResponse(
  collection: Collection,
  owner: User,
  nftResponse?: NftResponse
): Omit<Nft, 'id' | 'updatedAt'> | ((nftResponse: NftResponse) => Omit<Nft, 'id' | 'updatedAt'>) {
  if (isNil(nftResponse)) {
    return internalFn(collection, owner)
  }
  return internalFn(collection, owner)(nftResponse)
}
