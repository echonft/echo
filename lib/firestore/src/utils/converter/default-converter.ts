import { CollectionName } from '../../config/collection-name'
import { convertContract } from '../../converters/contract/convert-contract'
import { convertDiscordGuild } from '../../converters/discord-guild/convert-discord-guild'
import { convertNft } from '../../converters/nft/convert-nft'
import { convertNftCollection } from '../../converters/nft-collection/convert-nft-collection'
import { convertNonce } from '../../converters/nonce/convert-nonce'
import { convertOffer } from '../../converters/offer/convert-offer'
import { convertRequestForOffer } from '../../converters/request-for-offer/convert-request-for-offer'
import { convertSwap } from '../../converters/swap/convert-swap'
import { convertUser } from '../../converters/user/convert-user'
import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { FirestoreRootCollectionDocumentData } from '../../types/model/data/abstract/firestore-root-collection-document-data'
import { DocumentData } from 'firebase/firestore'

export const defaultConverter = <T extends DocumentData, V extends FirestoreRootCollectionDocumentData>(
  collectionName: CollectionName
): FirestoreConverter<T, V> => {
  switch (collectionName) {
    case CollectionName.CONTRACTS:
      return convertContract as unknown as FirestoreConverter<T, V>
    case CollectionName.GUILDS:
      return convertDiscordGuild as unknown as FirestoreConverter<T, V>
    case CollectionName.NFT_COLLECTIONS:
      return convertNftCollection as unknown as FirestoreConverter<T, V>
    case CollectionName.NFTS:
      return convertNft as unknown as FirestoreConverter<T, V>
    case CollectionName.NONCES:
      return convertNonce as unknown as FirestoreConverter<T, V>
    case CollectionName.OFFERS:
      return convertOffer as unknown as FirestoreConverter<T, V>
    case CollectionName.REQUESTS_FOR_OFFER:
      return convertRequestForOffer as unknown as FirestoreConverter<T, V>
    case CollectionName.SWAPS:
      return convertSwap as unknown as FirestoreConverter<T, V>
    case CollectionName.USERS:
      return convertUser as unknown as FirestoreConverter<T, V>
  }
}
