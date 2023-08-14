import { FirestoreMapper } from '../../types/mappers/firestore-mapper'
import { propToDate } from '../base/prop-to-date'
import { propToMappedDocument } from '../base/prop-to-mapped-document'
import { propToMappedDocumentArray } from '../base/prop-to-mapped-document-array'
import { mapOffer } from '../offer/map-offer'
import { mapSwapActivity } from './map-swap-activity'
import { FirestoreSwapData } from '@echo/firestore'
import { Swap } from '@echo/ui'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, omit, pipe } from 'ramda'

export const mapSwap: FirestoreMapper<FirestoreSwapData, Swap> = andThen(
  pipe(
    omit(['refPath']),
    juxt([
      propToPromise('id'),
      propToPromise('state'),
      propToMappedDocument('offer', mapOffer),
      propToMappedDocumentArray('activities', mapSwapActivity),
      propToDate('expiresAt'),
      propToDate('createdAt')
    ]),
    promiseAll,
    zipPromisesToObject<Swap>(['id', 'state', 'offer', 'activities', 'expiresAt', 'createdAt'])
  )
)
