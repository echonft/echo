import { FirestoreConverter } from '../../../types/converter'
import { ConvertSubcollectionOptions } from '../../../types/converter/subcollection/convert-subcollection-options'
import { SubcollectionConverter } from '../../../types/converter/subcollection/subcollection-converter'
import { getCollectionDocs } from '../../collection/get-collection-docs'
import { orderCollection } from '../../collection/order-collection'
import { pageCollection } from '../../collection/page-collection'
import { FirestoreData, FirestoreSubcollection } from '@echo/firestore'
import { zipPromisesToObject } from '@echo/utils'
import { CollectionReference, DocumentData, Query } from '@google-cloud/firestore'
import { andThen, ifElse, isNil, juxt, map, pipe, when } from 'ramda'

export const convertSubcollection = <T extends DocumentData, V extends FirestoreData>(
  options: ConvertSubcollectionOptions,
  converter?: FirestoreConverter<T, V>
): SubcollectionConverter<T, V> =>
  pipe(
    juxt([
      (collectionReference) => Promise.resolve(collectionReference.path),
      ifElse(
        (_collectionReference) => options.getDocs,
        pipe(
          when<CollectionReference<T>, Query<T>>(
            (_collectionReference) => !isNil(options.orderBy),
            orderCollection(options?.orderBy?.fieldPath, options?.orderBy?.direction)
          ),
          when<CollectionReference<T> | Query<T>, Query<T>>(
            (_collectionReference) => !isNil(options.paging),
            pageCollection(options?.paging?.limit, options?.paging?.offset)
          ),
          getCollectionDocs,
          andThen(pipe(map(converter!), (promises) => Promise.all(promises)))
        ),
        () => Promise.resolve(undefined)
      )
    ]),
    (promises) => Promise.all(promises),
    zipPromisesToObject<FirestoreSubcollection<V>>(['path', 'data'])
  )
