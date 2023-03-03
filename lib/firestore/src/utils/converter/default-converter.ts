import { convertContract } from '../../converters/contract/convert-contract'
import { convertDiscordGuild } from '../../converters/discord-guild/convert-discord-guild'
import { convertNftCollection } from '../../converters/nft-collection/convert-nft-collection'
import { convertOffer } from '../../converters/offer/convert-offer'
import { convertRequestForOffer } from '../../converters/request-for-offer/convert-request-for-offer'
import { convertSwap } from '../../converters/swap/convert-swap'
import { convertUser } from '../../converters/user/convert-user'
import { FirestoreRootCollectionDocumentData } from '../../types'
import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { castAs } from '@echo/utils'
import { DocumentData } from 'firebase/firestore'

export const defaultConverter = <T extends DocumentData, V extends FirestoreRootCollectionDocumentData>(
  collectionName: string
): FirestoreConverter<T, V> => {
  switch (collectionName) {
    case 'contracts':
      return castAs<FirestoreConverter<T, V>>(convertContract)
    case 'guilds':
      return castAs<FirestoreConverter<T, V>>(convertDiscordGuild)
    case 'nft-collections':
      return castAs<FirestoreConverter<T, V>>(convertNftCollection)
    case 'offers':
      return castAs<FirestoreConverter<T, V>>(convertOffer)
    case 'requests-for-offer':
      return castAs<FirestoreConverter<T, V>>(convertRequestForOffer)
    case 'swaps':
      return castAs<FirestoreConverter<T, V>>(convertSwap)
    case 'users':
      return castAs<FirestoreConverter<T, V>>(convertUser)
    default:
      throw Error(`No default converter for collection ${collectionName}`)
  }
}
