import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { FirestoreNonce } from '../../types/model/collections/nonce/firestore-nonce'
import { FirestoreNonceData } from '../../types/model/data/nonce/firestore-nonce-data'
import { convertRootCollectionDocumentSnapshot } from '../../utils/converters/convert-root-collection-document-snapshot'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertNonce: FirestoreConverter<FirestoreNonce, FirestoreNonceData> = pipe(
  convertRootCollectionDocumentSnapshot,
  juxt([propToPromise('refPath'), propToPromise('id'), propToPromise('nonce')]),
  promiseAll,
  zipPromisesToObject<FirestoreNonceData>(['refPath', 'id', 'nonce'])
)
