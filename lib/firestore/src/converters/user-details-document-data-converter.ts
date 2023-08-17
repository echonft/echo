import { documentDataPropToModel } from '../helpers/converters/document-data-prop-to-model'
import { modelPropToDocumentData } from '../helpers/converters/model-prop-to-document-data'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { UserDetails } from '../types/model/user-details'
import { UserDetailsDocumentData } from '../types/model/user-details-document-data'
import { walletDocumentDataConverter } from './wallet-document-data-converter'

export const userDetailsDocumentDataConverter: FirestoreDocumentDataConverter<UserDetailsDocumentData, UserDetails> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: documentDataPropToModel('wallet', walletDocumentDataConverter),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: modelPropToDocumentData('wallet', walletDocumentDataConverter)
}
