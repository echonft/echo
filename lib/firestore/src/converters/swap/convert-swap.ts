import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { FirestoreSwap } from '../../types/model/collections/swap/firestore-swap'
import { FirestoreSwapData } from '../../types/model/data/swap/firestore-swap-data'
import { convertRootCollectionDocumentSnapshot } from '../../utils/converters/convert-root-collection-document-snapshot'
import { nestedDocumentArrayProp } from '../../utils/converters/nested-document-array-prop'
import { refProp } from '../../utils/converters/ref-prop'
import { convertActivity } from '../activity/convert-activity'
import { convertOffer } from '../offer/convert-offer'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertSwap: FirestoreConverter<FirestoreSwap, FirestoreSwapData> = pipe(
  convertRootCollectionDocumentSnapshot,
  juxt([
    propToPromise('refPath'),
    propToPromise('id'),
    propToPromise('state'),
    refProp('offer', convertOffer),
    nestedDocumentArrayProp('activities', convertActivity),
    propToPromise('expiresAt'),
    propToPromise('createdAt')
  ]),
  promiseAll,
  zipPromisesToObject<FirestoreSwapData>(['refPath', 'id', 'state', 'offer', 'activities', 'expiresAt', 'createdAt'])
)
