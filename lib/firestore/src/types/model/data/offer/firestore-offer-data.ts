import { FirestoreOffer } from '../../collections'
import { FirestoreData } from '../abstract/firestore-data'
import { FirestoreDiscordGuildData } from '../discord-guild/firestore-discord-guild-data'
import { FirestoreUserData } from '../user/firestore-user-data'
import { FirestoreOfferActivityData } from './firestore-offer-activity-data'
import { FirestoreOfferItemData } from './firestore-offer-item-data'

export interface FirestoreOfferData
  extends Omit<FirestoreOffer, 'discordGuild' | 'sender' | 'senderItems' | 'receiver' | 'receiverItems' | 'activities'>,
    FirestoreData {
  id: string
  discordGuild: FirestoreDiscordGuildData
  sender: FirestoreUserData
  senderItems: FirestoreOfferItemData[]
  receiver: FirestoreUserData
  receiverItems: FirestoreOfferItemData[]
  activities: FirestoreOfferActivityData[]
}
