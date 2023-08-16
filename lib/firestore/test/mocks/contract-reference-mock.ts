import { ContractDocumentData } from '../../src/types/model/document-data/contract-document-data'
import { DocumentReference } from 'firebase-admin/firestore'

export const contractReferenceMock: { [key: string]: DocumentReference<ContractDocumentData> } = {
  '37dBlwJYahEAKeL0rNP8': {
    id: '37dBlwJYahEAKeL0rNP8',
    path: 'contracts/37dBlwJYahEAKeL0rNP8'
  } as unknown as DocumentReference<ContractDocumentData>
}
