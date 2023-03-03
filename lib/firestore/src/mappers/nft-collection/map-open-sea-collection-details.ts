import { FirestoreOpenSeaCollectionDetailsData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToDate } from '../../utils/mapper/prop-to-date'
import { propToUrl } from '../../utils/mapper/prop-to-url'
import { OpenSeaCollectionMetadata } from '@echo/model'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, pipe } from 'ramda'

export const mapOpenSeaCollectionDetails: FirestoreMapper<
  FirestoreOpenSeaCollectionDetailsData,
  OpenSeaCollectionMetadata
> = andThen(
  pipe(
    juxt([
      propToPromise('floorPrice'),
      propToPromise('collectionName'),
      propToPromise('safelistRequestStatus'),
      propToUrl('imageUrl'),
      propToPromise('description'),
      propToUrl('externalUrl'),
      propToPromise('twitterUsername'),
      propToUrl('discordUrl'),
      propToDate('lastIngestedAt')
    ]),
    promiseAll,
    zipPromisesToObject<OpenSeaCollectionMetadata>([
      'floorPrice',
      'collectionName',
      'safelistRequestStatus',
      'imageUrl',
      'description',
      'externalUrl',
      'twitterUsername',
      'discordUrl',
      'lastIngestedAt'
    ])
  )
)
