import { mapUndefinedPropsToDeleteField } from '@echo/firestore/helpers/crud/map-undefined-props-to-delete-field'
import type { DocumentReference, FirestoreDataConverter, UpdateData } from 'firebase-admin/lib/firestore'
import { mergeLeft } from 'ramda'

export async function cleanAndUpdateDocumentRef<T>(
  ref: DocumentReference<T>,
  model: Partial<Omit<T, 'id'>>,
  converter: FirestoreDataConverter<T>
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const updateData = mergeLeft(mapUndefinedPropsToDeleteField<T>(model), converter.toFirestore(model)) as UpdateData<T>
  return ref.update(updateData)
}
