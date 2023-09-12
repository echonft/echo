import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { ContractDocumentData } from '../types/model/contract-document-data'
import { Contract } from '@echo/firestore-types'
import modifyStringPropToAddress from '@echo/utils/modify-string-prop-to-address'
import { identity } from 'ramda'

export const contractDocumentDataConverter: FirestoreDocumentDataConverter<ContractDocumentData, Contract> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: identity,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: modifyStringPropToAddress('address')
}
