import { FirestoreMapper, FirestoreNonceData } from '../../types'
import { andThen, prop } from 'ramda'

export const mapNonce: FirestoreMapper<FirestoreNonceData, string> = andThen(prop<string>('nonce'))
