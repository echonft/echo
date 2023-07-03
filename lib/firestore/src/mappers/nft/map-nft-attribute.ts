import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreNftAttributeData } from '../../types/model/data/nft/firestore-nft-attribute-data'
import { NftAttribute } from '@echo/model'
import { castAs } from '@echo/utils'
import { andThen } from 'ramda'

export const mapNftAttribute: FirestoreMapper<FirestoreNftAttributeData, NftAttribute> = andThen(castAs<NftAttribute>)
