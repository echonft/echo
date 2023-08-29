import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { Contract } from '../types/model/contract'
import { ContractDocumentData } from '../types/model/contract-document-data'
import { assocUndefinedIfPropNotPresent, modifyStringPropToAddress, removeUndefinedProps } from '@echo/utils'
import { pipe } from 'ramda'

export const contractDocumentDataConverter: FirestoreDocumentDataConverter<ContractDocumentData, Contract> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: pipe(assocUndefinedIfPropNotPresent('name'), assocUndefinedIfPropNotPresent('symbol')),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: pipe(removeUndefinedProps, modifyStringPropToAddress('address'))
}
