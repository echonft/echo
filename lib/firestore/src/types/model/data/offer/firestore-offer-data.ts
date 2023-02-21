import { FirestoreSubcollection } from '../../../abstract/firestore-subcollection'
import { FirestoreOffer } from '../../collections'
import { FirestoreData } from '../abstract/firestore-data'
import { FirestoreDiscordGuildData } from '../discord-guild/firestore-discord-guild-data'
import { FirestoreUserData } from '../user/firestore-user-data'
import { FirestoreOfferItemData } from './nested-documents/firestore-offer-item-data'
import { FirestoreOfferActivityData } from './subcollections/offer-activity/firestore-offer-activity-data'

export interface FirestoreOfferData
  extends Omit<FirestoreOffer, 'discordGuild' | 'sender' | 'senderItems' | 'receiver' | 'receiverItems' | 'activities'>,
    FirestoreData {
  discordGuild: FirestoreDiscordGuildData
  sender: FirestoreUserData
  senderItems: FirestoreOfferItemData[]
  receiver: FirestoreUserData
  receiverItems: FirestoreOfferItemData[]
  activities: FirestoreSubcollection<FirestoreOfferActivityData>
}
