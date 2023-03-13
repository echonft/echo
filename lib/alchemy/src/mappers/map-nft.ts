import { AlchemyOwnedNft } from '../types'
import { mapDate } from './map-date'
import { mapNftAttribute } from './map-nft-attribute'
import { mapNftCollection } from './map-nft-collection'
import { mapNftMedia } from './map-nft-media'
import { mapNftTokenUri } from './map-nft-token-uri'
import { NftAttribute } from '@echo/model'
import { applySpec, applyToNullableProp, applyToProp } from '@echo/utils'
import { OwnedNft } from 'alchemy-sdk'
import { NftMetadata } from 'alchemy-sdk/dist/src/types/types'
import { BigNumber } from 'ethers'
import { ifElse, isNil, join, juxt, map, path, pipe, prop } from 'ramda'

export const mapNft: (nft: OwnedNft) => AlchemyOwnedNft = applySpec<OwnedNft, AlchemyOwnedNft>({
  id: pipe(juxt([path(['contract', 'address']), prop('tokenId')]), join(':')),
  tokenId: applyToProp('tokenId', (tokenId: string) => BigNumber.from(tokenId)),
  title: prop('title'),
  description: prop('description'),
  timeLastUpdated: applyToProp('timeLastUpdated', mapDate),
  collection: applyToProp('contract', mapNftCollection),
  tokenUri: applyToNullableProp('tokenUri', mapNftTokenUri),
  media: pipe(prop('media'), map(mapNftMedia)),
  spamInfo: prop('spamInfo'),
  attributes: pipe(
    prop<NftMetadata>('rawMetadata'),
    ifElse<NftMetadata[], NftAttribute[], NftAttribute[]>(
      isNil,
      () => [],
      pipe(
        prop<Array<Record<string, never>>>('attributes'),
        ifElse<[Array<Record<string, never>>], NftAttribute[], NftAttribute[]>(isNil, () => [], map(mapNftAttribute))
      )
    )
  ),
  balance: prop('balance')
})
