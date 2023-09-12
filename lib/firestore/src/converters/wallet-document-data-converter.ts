import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { WalletDocumentData } from '../types/model/wallet-document-data'
import { Wallet } from '@echo/firestore-types'
import modifyStringPropToAddress from '@echo/utils/modify-string-prop-to-address'
import { identity } from 'ramda'

export const walletDocumentDataConverter: FirestoreDocumentDataConverter<WalletDocumentData, Wallet> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: identity,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: modifyStringPropToAddress('address')
}
