import { FirestoreNonce, FirestoreNonceData } from '../../types'
import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { convertRootCollectionDocumentSnapshot } from '../../utils/converter/convert-root-collection-document-snapshot'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertNonce: FirestoreConverter<FirestoreNonce, FirestoreNonceData> = pipe(
  convertRootCollectionDocumentSnapshot,
  juxt([propToPromise('refPath'), propToPromise('id'), propToPromise('nonce')]),
  promiseAll,
  zipPromisesToObject<FirestoreNonceData>(['refPath', 'id', 'nonce'])
)
