import { AlchemyOwnedNft } from '../types'
import { mapDate } from './map-date'
import { mapNftAttribute } from './map-nft-attribute'
import { mapNftCollection } from './map-nft-collection'
import { mapNftMedia } from './map-nft-media'
import { mapNftTokenUri } from './map-nft-token-uri'
import { NftAttribute } from '@echo/model'
import { applySpec, applyToNullableProp, applyToProp } from '@echo/utils'
import { OwnedNft as AlchemyOwnedNftResponse } from 'alchemy-sdk'
import { NftMetadata } from 'alchemy-sdk/dist/src/types/types'
import { BigNumber } from 'ethers'
import { converge, ifElse, isNil, join, map, pipe, prop } from 'ramda'

export const mapNft: (nft: AlchemyOwnedNftResponse) => AlchemyOwnedNft = applySpec<
  AlchemyOwnedNftResponse,
  AlchemyOwnedNft
>({
  id: converge(join('/'), [
    pipe(prop('contract'), prop('address')),
    pipe(prop('tokenId'), (tokenId: string) => BigNumber.from(tokenId))
  ]),
  tokenId: applyToProp('tokenId', (tokenId: string) => BigNumber.from(tokenId)),
  title: prop('title'),
  description: prop('description'),
  timeLastUpdated: applyToProp('timeLastUpdated', mapDate),
  collection: applyToProp('contract', mapNftCollection),
  tokenUri: applyToNullableProp('tokenUri', mapNftTokenUri),
  media: pipe(prop('media'), map(mapNftMedia)),
  spamInfo: prop('spamInfo'),
  attributes: pipe(
    prop('rawMetadata'),
    ifElse<NftMetadata[], NftAttribute[], NftAttribute[]>(
      isNil,
      () => [],
      pipe(
        prop('attributes'),
        ifElse<Array<Record<string, never>>[], NftAttribute[], NftAttribute[]>(isNil, () => [], map(mapNftAttribute))
      )
    )
  ),
  balance: prop('balance')
})
