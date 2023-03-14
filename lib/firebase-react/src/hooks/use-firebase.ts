import { firebaseConfig } from '@echo/firestore'
import { FirebaseApp, getApps, initializeApp } from 'firebase/app'
import { always, anyPass, head, ifElse, isEmpty, isNil, pipe } from 'ramda'

export const useFirebase: () => FirebaseApp = always<FirebaseApp>(
  ifElse<[FirebaseApp[]], FirebaseApp, FirebaseApp>(
    anyPass([isEmpty, pipe(head, isNil)]),
    always(initializeApp(firebaseConfig)),
    head
  )(getApps())
)
