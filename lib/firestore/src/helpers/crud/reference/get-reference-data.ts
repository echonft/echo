import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'

export async function getReferenceData<T>(ref: DocumentReference<T>): Promise<Nullable<T>> {
  const snapshot = await ref.get()
  if (snapshot.exists) {
    return snapshot.data()
  } else {
    return undefined
  }
}
