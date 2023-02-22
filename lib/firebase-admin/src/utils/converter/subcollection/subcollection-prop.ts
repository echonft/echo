import { FirestoreConverter } from '../../../types/converter/firestore-converter'
import { ConvertSubcollectionOptions } from '../../../types/converter/subcollection/convert-subcollection-options'
import { convertSubcollection } from './convert-subcollection'
import { FirestoreData } from '@echo/firestore'
import { CollectionReference, DocumentData } from '@google-cloud/firestore'
import { pipe, prop } from 'ramda'

export const subcollectionProp = <T extends DocumentData, V extends FirestoreData>(
  key: string,
  options: ConvertSubcollectionOptions,
  converter: FirestoreConverter<T, V>
) => pipe(prop<CollectionReference<T>>(key), convertSubcollection<T, V>(options, converter))
