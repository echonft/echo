import { modifyDocumentDataProp } from '../helpers/converters/from-firestore/modify-document-data-prop'
import { modifyModelProp } from '../helpers/converters/to-firestore/modify-model-prop'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { UserDetailsDocumentData } from '../types/model/user-details-document-data'
import { walletDocumentDataConverter } from './wallet-document-data-converter'
import { UserDetails } from '@echo/firestore-types'

export const userDetailsDocumentDataConverter: FirestoreDocumentDataConverter<UserDetailsDocumentData, UserDetails> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: modifyDocumentDataProp('wallet', walletDocumentDataConverter),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: modifyModelProp('wallet', walletDocumentDataConverter)
}
