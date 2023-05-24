import { getFirestoreDiscordGuildRefByDiscordId } from '../../data/discord-guild/get-firestore-discord-guild-ref-by-discord-id'
import { getFirestoreNftRefById } from '../../data/nft/get-firestore-nft-ref-by-id'
import { getFirestoreUserRefById } from '../../data/user/get-firestore-user-ref-by-id'
import { buildOfferActivity } from './build-offer-activity'
import {
  FirestoreBuilder,
  FirestoreOffer,
  FirestoreOfferActivityPrototype,
  FirestoreOfferPrototype
} from '@echo/firestore'
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
    senderItems: await Promise.all(prototype.senderItems.map(getFirestoreNftRefById)),
    receiver: getFirestoreUserRefById(prototype.receiverId),
    receiverItems: await Promise.all(prototype.receiverItems.map(getFirestoreNftRefById)),
    activities,
    createdAt: dayjs().unix(),
    // For now, we default to 24 hours offer, we should have more flexibility in the future
    expiresAt: dayjs().add(1, 'day').unix()
  } as unknown as FirestoreOffer
}
