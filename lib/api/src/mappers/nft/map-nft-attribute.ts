import { NftAttribute } from '../../../../ui-model'
import { FirestoreMapper } from '../../types/mappers/firestore-mapper'
import { FirestoreNftAttributeData } from '@echo/firestore'
import { andThen, identity } from 'ramda'

export const mapNftAttribute: FirestoreMapper<FirestoreNftAttributeData, NftAttribute> = andThen(identity)
