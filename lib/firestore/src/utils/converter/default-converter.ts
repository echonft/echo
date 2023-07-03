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
import { castAs } from '@echo/utils'
import { DocumentData } from 'firebase/firestore'

export const defaultConverter = <T extends DocumentData, V extends FirestoreRootCollectionDocumentData>(
  collectionName: CollectionName
): FirestoreConverter<T, V> => {
  switch (collectionName) {
    case CollectionName.CONTRACTS:
      return castAs<FirestoreConverter<T, V>>(convertContract)
    case CollectionName.GUILDS:
      return castAs<FirestoreConverter<T, V>>(convertDiscordGuild)
    case CollectionName.NFT_COLLECTIONS:
      return castAs<FirestoreConverter<T, V>>(convertNftCollection)
    case CollectionName.NFTS:
      return castAs<FirestoreConverter<T, V>>(convertNft)
    case CollectionName.NONCES:
      return castAs<FirestoreConverter<T, V>>(convertNonce)
    case CollectionName.OFFERS:
      return castAs<FirestoreConverter<T, V>>(convertOffer)
    case CollectionName.REQUESTS_FOR_OFFER:
      return castAs<FirestoreConverter<T, V>>(convertRequestForOffer)
    case CollectionName.SWAPS:
      return castAs<FirestoreConverter<T, V>>(convertSwap)
    case CollectionName.USERS:
      return castAs<FirestoreConverter<T, V>>(convertUser)
  }
}
