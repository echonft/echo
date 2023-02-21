import { FirestoreConverter } from '../../../types/converter'
import { ConvertSubcollectionOptions } from '../../../types/converter/subcollection/convert-subcollection-options'
import { FirestoreData } from '../../../types/model/data/abstract/firestore-data'
import { convertSubcollection } from './convert-subcollection'
import { CollectionReference, DocumentData } from 'firebase/firestore'
import { pipe, prop } from 'ramda'

export const propToSubcollection = <T extends DocumentData, V extends FirestoreData>(
  key: string,
  options: ConvertSubcollectionOptions,
  converter?: FirestoreConverter<T, V>
) => pipe(prop<CollectionReference<T>>(key), convertSubcollection<T, V>(options, converter))
