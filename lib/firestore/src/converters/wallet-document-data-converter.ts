import type { FirestoreDocumentDataConverter } from '@echo/firestore/types/converters/firestore-document-data-converter'
import type { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { modifyStringPropToAddress } from '@echo/utils/fp/modify-string-prop-to-address'
import { identity } from 'ramda'

export const walletDocumentDataConverter: FirestoreDocumentDataConverter<WalletDocumentData, FirestoreWallet> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: identity,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: modifyStringPropToAddress('address')
}
