import { FirestorePrototypeData } from '../base/firestore-prototype-data'

export interface FirestoreContractPrototype extends FirestorePrototypeData {
  address: string
  chainId: number
}
