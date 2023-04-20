import { contractSnapshots } from './contract-snapshot'
import { FirestoreContract } from '@echo/firestore'
import { DocumentReference } from 'firebase-admin/firestore'

export const contractReferences: { [key: string]: DocumentReference<FirestoreContract> } = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  '37dBlwJYahEAKeL0rNP8': {
    path: 'contracts/37dBlwJYahEAKeL0rNP8',
    id: '37dBlwJYahEAKeL0rNP8',
    get: () => Promise.resolve(contractSnapshots['37dBlwJYahEAKeL0rNP8']!)
  }
}
