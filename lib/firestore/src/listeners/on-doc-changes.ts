import type { ChangeHandler } from '@echo/firestore/types/change-handler'
import type { DocumentChange, DocumentData, QuerySnapshot } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

function onDocChanges<AppModelType = DocumentData, DbModelType extends DocumentData = DocumentData>(
  onChange: ChangeHandler<AppModelType>
) {
  return function (change: DocumentChange<AppModelType, DbModelType>) {
    const { type, doc } = change
    if (!isNil(doc.id)) {
      void onChange({ changeType: type, snapshot: doc })
    }
  }
}

export function onSnapshot<AppModelType = DocumentData, DbModelType extends DocumentData = DocumentData>(
  onChange: ChangeHandler<AppModelType>
) {
  return function (snapshot: QuerySnapshot<AppModelType, DbModelType>) {
    snapshot.docChanges().forEach(onDocChanges<AppModelType, DbModelType>(onChange))
  }
}
