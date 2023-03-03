import { FirestoreSwap, FirestoreSwapData } from '../../types'
import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { convertRootCollectionDocumentSnapshot } from '../../utils/converter/convert-root-collection-document-snapshot'
import { nestedDocumentArrayProp } from '../../utils/converter/nested-document-array-prop'
import { refProp } from '../../utils/converter/ref-prop'
import { convertOffer } from '../offer/convert-offer'
import { convertSwapActivity } from './convert-swap-activity'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertSwap: FirestoreConverter<FirestoreSwap, FirestoreSwapData> = pipe(
  convertRootCollectionDocumentSnapshot,
  juxt([
    propToPromise('refPath'),
    propToPromise('id'),
    propToPromise('state'),
    refProp('offer', convertOffer),
    nestedDocumentArrayProp('activities', convertSwapActivity),
    propToPromise('expiresAt'),
    propToPromise('createdAt')
  ]),
  promiseAll,
  zipPromisesToObject<FirestoreSwapData>(['refPath', 'id', 'state', 'offer', 'activities', 'expiresAt', 'createdAt'])
)
