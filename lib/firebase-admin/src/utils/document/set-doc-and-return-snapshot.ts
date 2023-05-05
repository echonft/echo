import { DocumentData, DocumentReference, DocumentSnapshot } from '@google-cloud/firestore'
import { R } from '@mobily/ts-belt'

export const setDocAndReturnSnapshot = <T extends DocumentData>(
  doc: DocumentReference<T>,
  data: T
): Promise<R.Result<DocumentSnapshot<T>, Error>> => R.fromPromise(doc.set(data).then(() => doc.get()))
