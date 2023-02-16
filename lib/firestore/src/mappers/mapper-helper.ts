import { FirestoreDocumentSnapshot, FirestoreMapper } from '../types'
import { getDocSnapshotFromRef } from '../utils/document-snapshot/get-doc-snapshot-from-ref'
import { toPromise } from '@echo/utils'
import { DocumentData, DocumentReference } from 'firebase/firestore'
import { andThen, ifElse, isNil, map, pipe, prop, toString, zipObj } from 'ramda'

export const id: <FirestoreDocument extends DocumentData>(
  snapshot: FirestoreDocumentSnapshot<FirestoreDocument>
) => string = prop('id')

export const idPromise: <FirestoreDocument extends DocumentData>(
  snapshot: FirestoreDocumentSnapshot<FirestoreDocument>
) => Promise<string> = pipe(prop('id'), toPromise)

export const dataProp = <
  FirestoreDocument extends DocumentData,
  Key extends keyof FirestoreDocument,
  PropsValue = FirestoreDocument[Key]
>(
  key: Key
): ((snapshot: FirestoreDocumentSnapshot<FirestoreDocument>) => PropsValue) => pipe(prop('data'), prop<PropsValue>(key))

export const dataPropWithMapper = <
  FirestoreDocument extends DocumentData,
  Key extends keyof FirestoreDocument,
  MappedValue
>(
  key: Key,
  mapper: (value: FirestoreDocument[Key]) => MappedValue
): ((snapshot: FirestoreDocumentSnapshot<FirestoreDocument>) => MappedValue) =>
  pipe(prop('data'), prop<FirestoreDocument[Key]>(key), mapper)

export const dataPropPromise = <
  FirestoreDocument extends DocumentData,
  Key extends keyof FirestoreDocument,
  PropsValue = FirestoreDocument[Key]
>(
  key: Key
): ((snapshot: FirestoreDocumentSnapshot<FirestoreDocument>) => Promise<PropsValue>) => pipe(dataProp(key), toPromise)

export const dataPropWithMapperPromise = <
  FirestoreDocument extends DocumentData,
  Key extends keyof FirestoreDocument,
  MappedValue
>(
  key: Key,
  mapper: (value: FirestoreDocument[Key]) => MappedValue
): ((snapshot: FirestoreDocumentSnapshot<FirestoreDocument>) => Promise<MappedValue>) =>
  pipe(dataPropWithMapper(key, mapper), toPromise)

export const dataDoc = <
  FirestoreDocument extends DocumentData,
  Key extends keyof FirestoreDocument,
  TargetFirestoreDocument extends DocumentData,
  TargetDocument
>(
  key: Key,
  mapper: FirestoreMapper<TargetFirestoreDocument, TargetDocument>
): ((snapshot: FirestoreDocumentSnapshot<FirestoreDocument>) => Promise<TargetDocument>) =>
  pipe(dataProp(key), getDocSnapshotFromRef, andThen(mapper))

export const optionalDataDoc = <
  FirestoreDocument extends DocumentData,
  Key extends keyof FirestoreDocument,
  TargetFirestoreDocument extends DocumentData,
  TargetDocument
>(
  key: Key,
  mapper: FirestoreMapper<TargetFirestoreDocument, TargetDocument>
): ((snapshot: FirestoreDocumentSnapshot<FirestoreDocument>) => Promise<TargetDocument> | Promise<undefined | null>) =>
  pipe(
    dataProp(key),
    ifElse(
      isNil,
      toPromise,
      pipe<
        DocumentReference<TargetFirestoreDocument>[],
        Promise<FirestoreDocumentSnapshot<TargetFirestoreDocument>>,
        Promise<TargetDocument>
      >(getDocSnapshotFromRef, andThen(mapper))
    )
  )

export const dataDocs = <
  FirestoreDocument extends DocumentData,
  Key extends keyof FirestoreDocument,
  TargetFirestoreDocument extends DocumentData,
  TargetDocument
>(
  key: Key,
  mapper: FirestoreMapper<TargetFirestoreDocument, TargetDocument>
): ((snapshot: FirestoreDocumentSnapshot<FirestoreDocument>) => Promise<TargetDocument[]>) =>
  pipe(
    dataProp(key),
    ifElse(
      isNil,
      () => Promise.resolve([] as TargetDocument[]),
      pipe(
        map(
          pipe<
            DocumentReference<TargetFirestoreDocument>[],
            Promise<FirestoreDocumentSnapshot<TargetFirestoreDocument>>,
            Promise<TargetDocument>
          >(getDocSnapshotFromRef, andThen(mapper))
        ),
        (promises) => Promise.all(promises)
      )
    )
  )

const zipObject = <T, K extends keyof T, V = T[K]>(keys: K[]): ((values: V[]) => T) =>
  zipObj(map(toString, keys)) as (values: V[]) => T

export const zipPromisesToObject = <T, K extends keyof T, V = T[K]>(keys: K[]) => andThen(zipObject<T, K, V>(keys))
