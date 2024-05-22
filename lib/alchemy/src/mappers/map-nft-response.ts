import { type Attribute, type NftResponse } from '@echo/alchemy/types/response/nft-response'
import { getBlurUrlForNft } from '@echo/model/helpers/nft/get-blur-url-for-nft'
import { getOpenSeaUrlForNft } from '@echo/model/helpers/nft/get-open-sea-url-for-nft'
import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { NftAttribute } from '@echo/model/types/nft-attribute'
import type { User } from '@echo/model/types/user'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { pathIsNil } from '@echo/utils/fp/path-is-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import {
  always,
  applySpec,
  head,
  ifElse,
  invoker,
  isNil,
  map,
  partial,
  partialRight,
  path,
  pathEq,
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
        // FIXME Contract[] Not sure if thats the proper behaviour
        blurUrl: pipe(
          prop('tokenId'),
          partialRight(parseInt, [10]),
          partial(getBlurUrlForNft, [head(collection.contracts)])
        ),
        collection: always(collection),
        name: prop('name'),
        openSeaUrl: pipe(
          prop('tokenId'),
          partialRight(parseInt, [10]),
          // FIXME Contract[] Not sure if thats the proper behaviour
          partial(getOpenSeaUrlForNft, [head(collection.contracts)])
        ),
        owner: always(owner),
        // Not all links are always provided so add either cached or original if pngUrl does not exist
        pictureUrl: pipe(
          ifElse(
            pathIsNil(['image', 'cachedUrl']),
            ifElse(
              pathIsNil(['image', 'pngUrl']),
              nonNullableReturn(path(['image', 'originalUrl'])),
              nonNullableReturn(path(['image', 'pngUrl']))
            ),
            nonNullableReturn(path(['image', 'cachedUrl']))
          ),
          removeQueryFromUrl
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
