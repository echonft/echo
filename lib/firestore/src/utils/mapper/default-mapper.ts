import {
  mapContract,
  mapDiscordGuild,
  mapNftCollection,
  mapOffer,
  mapRequestForOffer,
  mapSwap,
  mapUser
} from '../../mappers'
import { FirestoreDocumentData, FirestoreMapper } from '../../types'
import { castAs } from '@echo/utils'

export const defaultMapper = <T extends FirestoreDocumentData, V>(collectionName: string): FirestoreMapper<T, V> => {
  switch (collectionName) {
    case 'contracts':
      return castAs<FirestoreMapper<T, V>>(mapContract)
    case 'guilds':
      return castAs<FirestoreMapper<T, V>>(mapDiscordGuild)
    case 'nft-collections':
      return castAs<FirestoreMapper<T, V>>(mapNftCollection)
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
