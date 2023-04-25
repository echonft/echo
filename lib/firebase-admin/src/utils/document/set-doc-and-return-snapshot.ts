import { DocumentData, DocumentReference, DocumentSnapshot } from '@google-cloud/firestore'
import { R } from '@mobily/ts-belt'
import { andThen, pipe } from 'ramda'
/* eslint-disable @typescript-eslint/ban-ts-comment */
export const setDocAndReturnSnapshot = <T extends DocumentData>(
  doc: DocumentReference<T>,
  data: T
): Promise<R.Result<DocumentSnapshot<T>, Error>> =>
  // eslint-disable-next-line @typescript-eslint/unbound-method
  pipe((newData: T) => doc.set(newData), andThen(doc.get), R.fromPromise)(data)

// andThen(
//     tap((snapshot) =>
//         console.log(
//             `snapshot is ${snapshot.id} ${JSON.stringify(snapshot.ref.path)} ${JSON.stringify(snapshot.data())}`
//         )
//     )
// ),
