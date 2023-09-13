import type { PartialWithFieldValue, WithFieldValue } from 'firebase-admin/firestore'

export type FirestoreModel<U> = PartialWithFieldValue<U> | WithFieldValue<U>
