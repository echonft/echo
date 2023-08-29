import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { Wallet } from '../types/model/wallet'
import { WalletDocumentData } from '../types/model/wallet-document-data'
import { modifyStringPropToAddress } from '@echo/utils'

export const walletDocumentDataConverter: FirestoreDocumentDataConverter<WalletDocumentData, Wallet> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: modifyStringPropToAddress('address'),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: modifyStringPropToAddress('address')
}
