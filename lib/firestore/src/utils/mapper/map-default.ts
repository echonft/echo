import { FirestoreDocumentData, FirestoreMapper } from '../../types'
import { defaultMapper } from './default-mapper'
import { andThen, call, converge, head, identity, pipe, prop, split } from 'ramda'

export const mapDefault = <T extends FirestoreDocumentData, V>(snapshot: Promise<T>): Promise<V> =>
  converge(call, [
    andThen(
      pipe<[T], string, string[], string, FirestoreMapper<T, V>>(
        prop<string>('refPath'),
        split('/'),
        head,
        defaultMapper
      )
    ),
    identity
  ])(snapshot)
