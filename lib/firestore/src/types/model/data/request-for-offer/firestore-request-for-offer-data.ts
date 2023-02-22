import { FirestoreSubcollection } from '../../../abstract/firestore-subcollection'
import { FirestoreRequestForOffer } from '../../collections'
import { FirestoreData } from '../abstract/firestore-data'
import { FirestoreContractData } from '../contract/firestore-contract-data'
import { FirestoreDiscordGuildData } from '../discord-guild/firestore-discord-guild-data'
import { FirestoreOfferData } from '../offer/firestore-offer-data'
import { FirestoreSwapData } from '../swap'
import { FirestoreUserData } from '../user/firestore-user-data'
import { FirestoreRequestForOfferItemData } from './nested-documents/firestore-request-for-offer-item-data'
import { FirestoreRequestForOfferActivityData } from './subcollections/request-for-offer-activity/firestore-request-for-offer-activity-data'

export interface FirestoreRequestForOfferData
  extends Omit<
      FirestoreRequestForOffer,
      'sender' | 'items' | 'discordGuild' | 'target' | 'activities' | 'offers' | 'swaps'
    >,
    FirestoreData {
  id: string
  sender: FirestoreUserData
  items: Array<FirestoreRequestForOfferItemData>
  discordGuild: FirestoreDiscordGuildData
  target: Array<FirestoreContractData>
  activities: FirestoreSubcollection<FirestoreRequestForOfferActivityData>
  offers?: Array<FirestoreOfferData>
  swaps?: Array<FirestoreSwapData>
}
