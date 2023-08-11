import { FirestoreDocumentData } from '../../types/model/data/abstract/firestore-document-data'
import { defaultMapper } from './default-mapper'
import { toPromise } from '@echo/utils'
import { andThen, call, converge, head, identity, pipe, prop, split } from 'ramda'

export const mapDefault = <T extends FirestoreDocumentData, V>(snapshot: Promise<T>): Promise<V> =>
  (
    andThen(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      converge(call, [pipe(prop<string>('refPath'), split('/'), head, defaultMapper), pipe(identity, toPromise)])
    ) as (snapshot: Promise<T>) => Promise<V>
  )(snapshot)
