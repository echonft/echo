import { removeUndefinedProps } from '../helpers/converters/to-firestore/remove-undefined-props'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { Contract } from '../types/model/contract'
import { ContractDocumentData } from '../types/model/contract-document-data'
import { applySpec, prop } from 'ramda'

export const contractDocumentDataConverter: FirestoreDocumentDataConverter<ContractDocumentData, Contract> = {
  fromFirestore: applySpec<Contract>({
    address: prop('address'),
    chainId: prop('chainId'),
    name: prop('name'),
    symbol: prop('symbol'),
    tokenType: prop('tokenType')
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: removeUndefinedProps
}
