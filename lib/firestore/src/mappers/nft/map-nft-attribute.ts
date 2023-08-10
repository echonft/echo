import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreNftAttributeData } from '../../types/model/data/nft/firestore-nft-attribute-data'
import { NftAttribute } from '@echo/model'
import { andThen, identity } from 'ramda'

export const mapNftAttribute: FirestoreMapper<FirestoreNftAttributeData, NftAttribute> = andThen(identity)
