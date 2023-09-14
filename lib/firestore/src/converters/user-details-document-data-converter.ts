import { walletDocumentDataConverter } from '@echo/firestore/converters/wallet-document-data-converter'
import { modifyDocumentDataProp } from '@echo/firestore/helpers/converters/from-firestore/modify-document-data-prop'
import { modifyModelProp } from '@echo/firestore/helpers/converters/to-firestore/modify-model-prop'
import type { FirestoreDocumentDataConverter } from '@echo/firestore/types/converters/firestore-document-data-converter'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/firestore-user-details'
import type { UserDetailsDocumentData } from '@echo/firestore/types/model/user-details-document-data'

export const userDetailsDocumentDataConverter: FirestoreDocumentDataConverter<
  UserDetailsDocumentData,
  FirestoreUserDetails
> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: modifyDocumentDataProp('wallet', walletDocumentDataConverter),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: modifyModelProp('wallet', walletDocumentDataConverter)
}
