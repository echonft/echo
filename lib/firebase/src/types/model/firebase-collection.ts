import { DocumentData } from 'firebase/firestore'
export interface FirebaseCollection extends DocumentData {
  'allowed-contracts': string[]
  'channel-id': string
  name: string
}
