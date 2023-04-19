import { FirestoreRequestForOffer } from '../../collections/request-for-offer/firestore-request-for-offer'
import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'
import { FirestoreContractData } from '../contract/firestore-contract-data'
import { FirestoreDiscordGuildData } from '../discord-guild/firestore-discord-guild-data'
import { FirestoreOfferData } from '../offer/firestore-offer-data'
import { FirestoreSwapData } from '../swap/firestore-swap-data'
import { FirestoreUserData } from '../user/firestore-user-data'
import { FirestoreRequestForOfferActivityData } from './firestore-request-for-offer-activity-data'
import { FirestoreRequestForOfferItemData } from './firestore-request-for-offer-item-data'

export interface FirestoreRequestForOfferData
  extends Omit<
      FirestoreRequestForOffer,
      'sender' | 'items' | 'discordGuild' | 'target' | 'activities' | 'offers' | 'swaps'
    >,
    FirestoreRootCollectionDocumentData {
  id: string
  sender: FirestoreUserData
  items: FirestoreRequestForOfferItemData[]
  discordGuild: FirestoreDiscordGuildData
  target: FirestoreContractData[]
  activities: FirestoreRequestForOfferActivityData[]
  offers?: FirestoreOfferData[]
  swaps?: FirestoreSwapData[]
}
