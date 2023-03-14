/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FirestoreOpenSeaCollectionDetailsData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToDate } from '../../utils/mapper/prop-to-date'
import { propToUrl } from '../../utils/mapper/prop-to-url'
import { OpenSeaCollectionMetadata } from '@echo/model'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, pipe } from 'ramda'

export const mapOpenSeaCollectionDetails: FirestoreMapper<
  FirestoreOpenSeaCollectionDetailsData,
  OpenSeaCollectionMetadata
> = andThen(
  pipe(
    juxt([
      // @ts-ignore
      propToPromise('floorPrice'),
      // @ts-ignore
      propToPromise('collectionName'),
      // @ts-ignore
      propToPromise('safelistRequestStatus'),
      // @ts-ignore
      propToUrl('imageUrl'),
      // @ts-ignore
      propToPromise('description'),
      // @ts-ignore
      propToUrl('externalUrl'),
      // @ts-ignore
      propToPromise('twitterUsername'),
      // @ts-ignore
      propToUrl('discordUrl'),
      // @ts-ignore
      propToDate('lastIngestedAt')
    ]),
    // @ts-ignore
    (promises) => Promise.all(promises),
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
