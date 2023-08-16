import { DocumentData, DocumentReference, DocumentSnapshot } from 'firebase-admin/firestore'

export const setDocAndReturnSnapshot = <T extends DocumentData>(
  doc: DocumentReference<T>,
  data: T
): Promise<DocumentSnapshot<T>> => {
  try {
    return doc
      .set(data)
      .then(() => doc.get())
      .catch((error: Error) => Promise.reject(error.message))
  } catch (reason) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return Promise.reject(reason)
  }
}
