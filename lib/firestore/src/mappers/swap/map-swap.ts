import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreSwapData } from '../../types/model/data/swap/firestore-swap-data'
import { propToDate } from '../../utils/mapper/prop-to-date'
import { propToMappedDocument } from '../../utils/mapper/prop-to-mapped-document'
import { propToMappedDocumentArray } from '../../utils/mapper/prop-to-mapped-document-array'
import { mapOffer } from '../offer/map-offer'
import { mapSwapActivity } from './map-swap-activity'
import { Swap } from '@echo/model'
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
