import { FirestoreDocumentData } from '../../types/model/data/abstract/firestore-document-data'
import { defaultMapper } from './default-mapper'
import { castAsNonNullable, toPromise } from '@echo/utils'
import { andThen, call, converge, head, identity, pipe, prop, split } from 'ramda'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const mapDefault: <T extends FirestoreDocumentData, V>(snapshot: Promise<T>) => Promise<V> = andThen(
  converge(call, [
    pipe(prop<string>('refPath'), split('/'), head, castAsNonNullable<string>, defaultMapper),
    pipe(identity, toPromise)
  ])
)
