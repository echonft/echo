import { CollectionName } from '../../config/collection-name'
import { convertDefault } from '../converter/convert-default'
import { mapDefault } from '../mapper/map-default'
import { getDocRefFromPath } from './get-doc-ref-from-path'
import { onSnapshot, Unsubscribe } from 'firebase/firestore'
import { pipe } from 'ramda'

export const subscribeToDocument = <W>(
  onNext: (model: Promise<W>) => void,
  path: CollectionName,
  ...pathSegments: string[]
): Unsubscribe =>
  onSnapshot(getDocRefFromPath(path, ...pathSegments), (snapshot) => {
    void pipe(convertDefault, mapDefault, onNext)(snapshot)
  })
