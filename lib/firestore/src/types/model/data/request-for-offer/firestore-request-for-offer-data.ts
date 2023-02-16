import { FirestoreCollectionReference } from '../../../abstract/firestore-collection-reference'
import { FirestoreRequestForOffer } from '../../collections'
import { FirestoreData } from '../abstract/firestore-data'
import { FirestoreContractData } from '../contract/firestore-contract-data'
import { FirestoreDiscordGuildData } from '../discord-guild/firestore-discord-guild-data'
import { FirestoreOfferData } from '../offer/firestore-offer-data'
import { FirestoreUserData } from '../user/firestore-user-data'
import { FirestoreRequestForOfferItemData } from './nested-documents/firestore-request-for-offer-item-data'

export interface FirestoreRequestForOfferData
  extends Omit<
      FirestoreRequestForOffer,
      'sender' | 'items' | 'discordGuild' | 'target' | 'activities' | 'offers' | 'swaps'
    >,
    FirestoreData {
  sender: FirestoreUserData
  items: Array<FirestoreRequestForOfferItemData>
  discordGuild: FirestoreDiscordGuildData
  target: Array<FirestoreContractData>
  activities: FirestoreCollectionReference
  offers?: Array<FirestoreOfferData>
  swaps?: Array<FirestoreOfferData>
}
