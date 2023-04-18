import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreNonceData } from '../../types/model/data/nonce/firestore-nonce-data'
import { andThen, prop } from 'ramda'

export const mapNonce: FirestoreMapper<FirestoreNonceData, string> = andThen(prop<string>('nonce'))
