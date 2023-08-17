import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { Wallet } from '../types/model/wallet'
import { WalletDocumentData } from '../types/model/wallet-document-data'
import { assoc, isNil, lens, omit, over, prop, toLower, unless } from 'ramda'

export const walletDocumentDataConverter: FirestoreDocumentDataConverter<WalletDocumentData, Wallet> = {
  fromFirestore: omit(['addressLowercase']),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: over(lens(prop('address'), assoc('addressLowercase')), unless(isNil, toLower))
}
