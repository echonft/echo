import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentData, DocumentReference } from 'firebase-admin/firestore'

export async function getReferenceData<AppModelType, DbModelType extends DocumentData>(
  ref: DocumentReference<AppModelType, DbModelType>
): Promise<Nullable<AppModelType>> {
  const snapshot = await ref.get()
  if (snapshot.exists) {
    return snapshot.data()
  } else {
    return undefined
  }
}
