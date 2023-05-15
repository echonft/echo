import { getFirestoreDiscordGuildRefByDiscordId } from '../../data/discord-guild/get-firestore-discord-guild-ref-by-discord-id'
import { getFirestoreUserRefById } from '../../data/user/get-firestore-user-ref-by-id'
import { FirestoreBuilder } from '../../types/builder/firestore-builder'
import { FirestoreOfferActivityPrototype } from '../../types/prototypes/offer/firestore-offer-activity-prototype'
import { FirestoreOfferPrototype } from '../../types/prototypes/offer/firestore-offer-prototype'
import { buildOfferItem } from '../offer/build-offer-item'
import { buildOfferActivity } from './build-offer-activity'
import { FirestoreOffer, FirestoreRequestForOffer } from '@echo/firestore'
import { generateOfferActivity, OfferState } from '@echo/model'
import { R } from '@mobily/ts-belt'
import dayjs from 'dayjs'

export const buildOffer: FirestoreBuilder<FirestoreOfferPrototype, FirestoreOffer> = async (prototype) => {
  const discordGuildResult = await getFirestoreDiscordGuildRefByDiscordId(prototype.discordGuildId)
  if (R.isError(discordGuildResult)) {
    throw Error('buildRequestForOffer Discord Guild does not exist')
  }
  const activities = await buildOfferActivity(
    generateOfferActivity(OfferState.OPEN) as FirestoreOfferActivityPrototype
  ).then((activity) => [activity])
  return {
    state: OfferState.OPEN,
    discordGuild: R.getExn(discordGuildResult),
    sender: getFirestoreUserRefById(prototype.senderId),
    senderItems: await Promise.all(prototype.senderItems.map(buildOfferItem)),
    receiver: getFirestoreUserRefById(prototype.receiverId),
    receiverItems: await Promise.all(prototype.receiverItems.map(buildOfferItem)),
    activities,
    createdAt: dayjs().unix(),
    // For now, we default to 24 hours offer, we should have more flexibility in the future
    expiresAt: dayjs().add(1, 'day').unix()
  } as unknown as FirestoreRequestForOffer
}
