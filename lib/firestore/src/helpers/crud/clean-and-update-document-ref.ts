import { mapUndefinedPropsToDeleteField } from './map-undefined-props-to-delete-field'
import { DocumentReference, FirestoreDataConverter, UpdateData } from 'firebase-admin/firestore'
import { mergeLeft } from 'ramda'

export async function cleanAndUpdateDocumentRef<T>(
  ref: DocumentReference<T>,
  model: T,
  converter: FirestoreDataConverter<T>
) {
  const updateData = mergeLeft(mapUndefinedPropsToDeleteField<T>(model), converter.toFirestore(model)) as UpdateData<T>
  return ref.update(updateData)
}
