import { mapDate } from './map-date'
import { mapUrl } from './map-url'
import { OpenSeaCollectionMetadata } from '@echo/model'
import { applySpec, applyToNullableProp } from '@echo/utils'
import { OpenSeaCollectionMetadata as AlchemyMetadata } from 'alchemy-sdk/dist/src/types/types'
import { prop } from 'rambda'

export const mapOpenSeaCollectionMetadata: (metadata: AlchemyMetadata) => OpenSeaCollectionMetadata = applySpec<
  AlchemyMetadata,
  OpenSeaCollectionMetadata
>({
  floorPrice: applyToNullableProp('floorPrice', Number),
  collectionName: prop('collectionName'),
  safelistRequestStatus: prop('safelistRequestStatus'),
  imageUrl: applyToNullableProp('imageUrl', mapUrl),
  description: prop('description'),
  externalUrl: applyToNullableProp('externalUrl', mapUrl),
  twitterUsername: prop('twitterUsername'),
  discordUrl: applyToNullableProp('discordUrl', mapUrl),
  lastIngestedAt: applyToNullableProp('lastIngestedAt', mapDate)
})
