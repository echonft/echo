import { CollectionName } from '../../config/collection-name'
import { mapContract } from '../../mappers/contract/map-contract'
import { mapDiscordGuild } from '../../mappers/discord-guild/map-discord-guild'
import { mapNft } from '../../mappers/nft/map-nft'
import { mapNftCollection } from '../../mappers/nft-collection/map-nft-collection'
import { mapNonce } from '../../mappers/nonce/map-nonce'
import { mapOffer } from '../../mappers/offer/map-offer'
import { mapRequestForOffer } from '../../mappers/request-for-offer/map-request-for-offer'
import { mapSwap } from '../../mappers/swap/map-swap'
import { mapUser } from '../../mappers/user/map-user'
import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreDocumentData } from '../../types/model/data/abstract/firestore-document-data'
import { castAs } from '@echo/utils'

export const defaultMapper = <T extends FirestoreDocumentData, V>(
  collectionName: CollectionName
): FirestoreMapper<T, V> => {
  switch (collectionName) {
    case CollectionName.CONTRACTS:
      return castAs<FirestoreMapper<T, V>>(mapContract)
    case CollectionName.GUILDS:
      return castAs<FirestoreMapper<T, V>>(mapDiscordGuild)
    case CollectionName.NFT_COLLECTIONS:
      return castAs<FirestoreMapper<T, V>>(mapNftCollection)
    case CollectionName.NFTS:
      return castAs<FirestoreMapper<T, V>>(mapNft)
    case CollectionName.NONCES:
      return castAs<FirestoreMapper<T, V>>(mapNonce)
    case CollectionName.OFFERS:
      return castAs<FirestoreMapper<T, V>>(mapOffer)
    case CollectionName.REQUESTS_FOR_OFFER:
      return castAs<FirestoreMapper<T, V>>(mapRequestForOffer)
    case CollectionName.SWAPS:
      return castAs<FirestoreMapper<T, V>>(mapSwap)
    case CollectionName.USERS:
      return castAs<FirestoreMapper<T, V>>(mapUser)
  }
}
