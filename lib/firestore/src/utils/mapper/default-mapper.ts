import { mapContract } from '../../mappers/contract/map-contract'
import { mapDiscordGuild } from '../../mappers/discord-guild/map-discord-guild'
import { mapNftCollection } from '../../mappers/nft-collection/map-nft-collection'
import { mapNonce } from '../../mappers/nonce/map-nonce'
import { mapOffer } from '../../mappers/offer/map-offer'
import { mapRequestForOffer } from '../../mappers/request-for-offer/map-request-for-offer'
import { mapSwap } from '../../mappers/swap/map-swap'
import { mapUser } from '../../mappers/user/map-user'
import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreDocumentData } from '../../types/model/data/abstract/firestore-document-data'
import { castAs } from '@echo/utils'

export const defaultMapper = <T extends FirestoreDocumentData, V>(collectionName: string): FirestoreMapper<T, V> => {
  switch (collectionName) {
    case 'contracts':
      return castAs<FirestoreMapper<T, V>>(mapContract)
    case 'guilds':
      return castAs<FirestoreMapper<T, V>>(mapDiscordGuild)
    case 'nft-collections':
      return castAs<FirestoreMapper<T, V>>(mapNftCollection)
    case 'nonces':
      return castAs<FirestoreMapper<T, V>>(mapNonce)
    case 'offers':
      return castAs<FirestoreMapper<T, V>>(mapOffer)
    case 'requests-for-offer':
      return castAs<FirestoreMapper<T, V>>(mapRequestForOffer)
    case 'swaps':
      return castAs<FirestoreMapper<T, V>>(mapSwap)
    case 'users':
      return castAs<FirestoreMapper<T, V>>(mapUser)
    default:
      throw Error(`No default mapper for collection ${collectionName}`)
  }
}
