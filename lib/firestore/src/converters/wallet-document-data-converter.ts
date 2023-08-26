import { addressPropFromFirestore } from '../helpers/converters/from-firestore/address-prop-from-firestore'
import { addressPropToFirestore } from '../helpers/converters/to-firestore/address-prop-to-firestore'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { Wallet } from '../types/model/wallet'
import { WalletDocumentData } from '../types/model/wallet-document-data'
import { applySpec, prop } from 'ramda'

export const walletDocumentDataConverter: FirestoreDocumentDataConverter<WalletDocumentData, Wallet> = {
  fromFirestore: applySpec<Wallet>({
    chainId: prop('chainId'),
    address: addressPropFromFirestore()
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: addressPropToFirestore()
}
