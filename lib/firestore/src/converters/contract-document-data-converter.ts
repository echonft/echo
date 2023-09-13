import type { FirestoreDocumentDataConverter } from '@echo/firestore/types/converters/firestore-document-data-converter'
import type { ContractDocumentData } from '@echo/firestore/types/model/contract-document-data'
import type { FirestoreContract } from '@echo/firestore/types/model/firestore-contract'
import { modifyStringPropToAddress } from '@echo/utils/fp/modify-string-prop-to-address'
import { identity } from 'ramda'

export const contractDocumentDataConverter: FirestoreDocumentDataConverter<ContractDocumentData, FirestoreContract> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: identity,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: modifyStringPropToAddress('address')
}
