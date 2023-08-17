import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { Contract } from '../types/model/contract'
import { ContractDocumentData } from '../types/model/contract-document-data'
import { assoc, isNil, lens, omit, over, prop, toLower, unless } from 'ramda'

export const contractDocumentDataConverter: FirestoreDocumentDataConverter<ContractDocumentData, Contract> = {
  fromFirestore: omit(['addressLowercase']),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: over(lens(prop('address'), assoc('addressLowercase')), unless(isNil, toLower))
}
