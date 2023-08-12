import { FirestoreMapper } from '../../types/mappers/firestore-mapper'
import { FirestoreNftAttributeData } from '@echo/firestore'
import { NftAttribute } from '@echo/ui'
import { andThen, identity } from 'ramda'

export const mapNftAttribute: FirestoreMapper<FirestoreNftAttributeData, NftAttribute> = andThen(identity)
