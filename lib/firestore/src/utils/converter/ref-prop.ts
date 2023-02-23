import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { FirestoreData } from '../../types/model/data/abstract/firestore-data'
import { getDocSnapshotFromRef } from '../document/get-doc-snapshot-from-ref'
import { undefinedPromise } from '@echo/utils'
import { DocumentData, DocumentReference } from 'firebase/firestore'
import { allPass, andThen, complement, has, ifElse, isNil, pipe, prop } from 'ramda'

export const refProp = <T extends DocumentData, V extends FirestoreData>(
  key: string,
  converter: FirestoreConverter<T, V>
) =>
  ifElse<[unknown], Promise<V>, Promise<V>>(
    allPass([has(key), pipe(prop(key), complement(isNil))]),
    pipe(prop<DocumentReference<T>>(key), pipe(getDocSnapshotFromRef, andThen(converter))),
    undefinedPromise<V>
  )
