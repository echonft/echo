import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { FirestoreDocumentData } from '../../types/model/data/abstract/firestore-document-data'
import { getDocSnapshotFromRef } from '../document/get-doc-snapshot-from-ref'
import { undefinedPromise } from '@echo/utils'
import { DocumentData, DocumentReference } from 'firebase/firestore'
import { allPass, andThen, complement, has, ifElse, isNil, map, pipe, prop } from 'ramda'

export const refArrayProp = <T extends DocumentData, V extends FirestoreDocumentData>(
  key: string,
  converter: FirestoreConverter<T, V>
) =>
  ifElse<[unknown], Promise<V[]>, Promise<V[]>>(
    allPass([has(key), pipe(prop(key), complement(isNil))]),
    pipe(prop<DocumentReference<T>[]>(key), map(pipe(getDocSnapshotFromRef, andThen(converter))), (promises) =>
      Promise.all(promises)
    ),
    undefinedPromise<V[]>
  )
