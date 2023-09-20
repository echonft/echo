import type { PartialWithFieldValue, WithFieldValue } from 'firebase-admin/lib/firestore'

export type FirestoreModel<U> = PartialWithFieldValue<U> | WithFieldValue<U>
