/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FirestoreOpenSeaCollectionDetailsData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { dateProp } from '../date-prop'
import { urlProp } from '../url-prop'
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
      urlProp('imageUrl'),
      // @ts-ignore
      propToPromise('description'),
      // @ts-ignore
      urlProp('externalUrl'),
      // @ts-ignore
      propToPromise('twitterUsername'),
      // @ts-ignore
      urlProp('discordUrl'),
      // @ts-ignore
      dateProp('lastIngestedAt')
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
