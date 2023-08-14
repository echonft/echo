import { getFirestoreDiscordGuildRefByDiscordId } from '../../data/discord-guild/get-firestore-discord-guild-ref-by-discord-id'
import { getFirestoreNftRefById } from '../../data/nft/get-firestore-nft-ref-by-id'
import { getFirestoreUserRefById } from '../../data/user/get-firestore-user-ref-by-id'
import { FirestoreBuilder } from '../../types/builder/firestore-builder'
import { FirestoreOffer } from '../../types/model/collections/offer/firestore-offer'
import { FirestoreOfferPrototype } from '../../types/prototypes/offer/firestore-offer-prototype'
import { buildActivity } from '../activity/build-activity'
import { generateOfferActivity } from './generate-offer-actitivity'
import dayjs from 'dayjs'

export const buildOffer: FirestoreBuilder<FirestoreOfferPrototype, FirestoreOffer> = async (prototype) => {
  const discordGuild = await getFirestoreDiscordGuildRefByDiscordId(prototype.discordGuildId)
  const activities = await buildActivity(generateOfferActivity('OPEN')).then((activity) => [activity])
  return {
    state: 'OPEN',
    discordGuild,
    sender: getFirestoreUserRefById(prototype.senderId),
    senderItems: await Promise.all(prototype.senderItems.map(getFirestoreNftRefById)),
    receiver: getFirestoreUserRefById(prototype.receiverId),
    receiverItems: await Promise.all(prototype.receiverItems.map(getFirestoreNftRefById)),
    activities,
    createdAt: dayjs().unix(),
    // For now, we default to 24 hours offer, we should have more flexibility in the future
    expiresAt: dayjs().add(1, 'day').unix()
  } as unknown as FirestoreOffer
}
