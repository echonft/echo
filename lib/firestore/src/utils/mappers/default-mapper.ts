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

export const defaultMapper = <T extends FirestoreDocumentData, V>(
  collectionName: CollectionName
): FirestoreMapper<T, V> => {
  switch (collectionName) {
    case CollectionName.CONTRACTS:
      return mapContract as unknown as FirestoreMapper<T, V>
    case CollectionName.GUILDS:
      return mapDiscordGuild as unknown as FirestoreMapper<T, V>
    case CollectionName.NFT_COLLECTIONS:
      return mapNftCollection as unknown as FirestoreMapper<T, V>
    case CollectionName.NFTS:
      return mapNft as unknown as FirestoreMapper<T, V>
    case CollectionName.NONCES:
      return mapNonce as unknown as FirestoreMapper<T, V>
    case CollectionName.OFFERS:
      return mapOffer as unknown as FirestoreMapper<T, V>
    case CollectionName.REQUESTS_FOR_OFFER:
      return mapRequestForOffer as unknown as FirestoreMapper<T, V>
    case CollectionName.SWAPS:
      return mapSwap as unknown as FirestoreMapper<T, V>
    case CollectionName.USERS:
      return mapUser as unknown as FirestoreMapper<T, V>
  }
}
