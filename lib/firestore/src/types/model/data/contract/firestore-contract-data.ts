import { FirestoreContract } from '../../collections'
import { FirestoreData } from '../abstract/firestore-data'

export interface FirestoreContractData extends FirestoreContract, FirestoreData {}
