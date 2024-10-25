import type { ChangeHandler } from '@echo/firestore/types/change-handler/change-handler'
import type { DocumentChange, QuerySnapshot } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

function onDocChanges<AppModelType>(onChange: ChangeHandler<AppModelType>) {
  return function (change: DocumentChange<AppModelType>) {
    const { type, doc } = change
    if (!isNil(doc.id)) {
      void onChange({ changeType: type, snapshot: doc })
    }
  }
}

export function onSnapshot<AppModelType>(onChange: ChangeHandler<AppModelType>) {
  return function (snapshot: QuerySnapshot<AppModelType>) {
    snapshot.docChanges().forEach(onDocChanges<AppModelType>(onChange))
  }
}
