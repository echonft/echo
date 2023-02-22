import { FirestoreData, FirestoreSubcollection } from '../../../types'
import { FirestoreConverter } from '../../../types/converter'
import { ConvertSubcollectionOptions } from '../../../types/converter/subcollection/convert-subcollection-options'
import { SubcollectionConverter } from '../../../types/converter/subcollection/subcollection-converter'
import { getDocsFromQuery } from '../../query'
import { getCollectionQueryFromRef } from '../../query/get-collection-query-from-ref'
import { zipPromisesToObject } from '@echo/utils'
import { CollectionReference, DocumentData } from 'firebase/firestore'
import { andThen, ifElse, juxt, map, pipe } from 'ramda'

export const convertSubcollection = <T extends DocumentData, V extends FirestoreData>(
  options: ConvertSubcollectionOptions,
  converter?: FirestoreConverter<T, V>
): SubcollectionConverter<T, V> =>
  pipe(
    juxt<[CollectionReference<T>], Promise<string>, Promise<V[] | undefined>>([
      (collectionReference) => Promise.resolve(collectionReference.path),
      ifElse(
        (_) => options.getDocs,
        pipe(
          getCollectionQueryFromRef<T>(options.constraints),
          getDocsFromQuery,
          andThen(pipe(map(converter!), (promises) => Promise.all(promises)))
        ),
        () => Promise.resolve(undefined)
      )
    ]),
    (promises) => Promise.all(promises),
    zipPromisesToObject<FirestoreSubcollection<V>>(['path', 'data'])
  )
