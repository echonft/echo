import { getDocSnapshotFromPath } from '@echo/firestore'
import { DocumentData, DocumentReference, DocumentSnapshot } from '@google-cloud/firestore'
import { R } from '@mobily/ts-belt'
import { always, andThen, pipe, tap } from 'ramda'
/* eslint-disable @typescript-eslint/ban-ts-comment */

export const setDocAndReturnSnapshot = <T extends DocumentData>(
  doc: DocumentReference<T>,
  data: T
): Promise<R.Result<DocumentSnapshot<T>, Error>> =>
  // @ts-ignore
  pipe(
    (newData: T) => doc.set(newData),
    andThen(always(getDocSnapshotFromPath('users', 'Pc5NDTDSUy2MgYfrX2br'))),
    andThen(
      tap((snapshot) =>
        console.log(
          `snapshot is ${snapshot.id} ${JSON.stringify(snapshot.ref.path)} ${JSON.stringify(snapshot.data())}`
        )
      )
    ),
    R.fromPromise
  )(data)
