import { mapUndefinedPropsToDeleteField } from './map-undefined-props-to-delete-field'
import { firestore } from 'firebase-admin'
import { DocumentReference, FirestoreDataConverter } from 'firebase-admin/firestore'
import { mergeLeft } from 'ramda'
import UpdateData = firestore.UpdateData

export async function cleanAndUpdateDocumentRef<T>(
  ref: DocumentReference<T>,
  model: T,
  converter: FirestoreDataConverter<T>
) {
  const updateData = mergeLeft(mapUndefinedPropsToDeleteField<T>(model), converter.toFirestore(model)) as UpdateData<T>
  return ref.update(updateData)
}
