import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { type DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'

export function listenToWallets(onChange: (changeType: DocumentChangeType, wallet: WalletDocumentData) => unknown) {
  getWalletsCollectionReference().onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      onChange(change.type, change.doc.data())
    })
  })
}
