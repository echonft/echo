import { contractSnapshots, invalidContractSnapshot } from './contract-snapshot'
import { FirestoreContract } from '@echo/firestore'
import { DocumentReference } from 'firebase-admin/firestore'

export const contractReferences: { [key: string]: DocumentReference<FirestoreContract> } = {
  '37dBlwJYahEAKeL0rNP8': {
    path: 'contracts/37dBlwJYahEAKeL0rNP8',
    id: '37dBlwJYahEAKeL0rNP8',
    get: () => Promise.resolve(contractSnapshots['37dBlwJYahEAKeL0rNP8']!)
  } as unknown as DocumentReference<FirestoreContract>
}

export const invalidContractReference: DocumentReference<FirestoreContract> = {
  path: 'contracts/test',
  id: 'test',
  get: () => Promise.resolve(invalidContractSnapshot)
} as unknown as DocumentReference<FirestoreContract>
