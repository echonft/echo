import { getFirestoreContractRefsByAddress } from '../../data/contract/get-firestore-contract-refs-by-address'
import { getFirestoreDiscordGuildRefByDiscordId } from '../../data/discord-guild/get-firestore-discord-guild-ref-by-discord-id'
import { getFirestoreNftRefById } from '../../data/nft/get-firestore-nft-ref-by-id'
import { getFirestoreUserRefById } from '../../data/user/get-firestore-user-ref-by-id'
import { FirestoreBuilder } from '../../types/builder/firestore-builder'
import { FirestoreRequestForOffer } from '../../types/model/collections/request-for-offer/firestore-request-for-offer'
import { FirestoreRequestForOfferPrototype } from '../../types/prototypes/request-for-offer/firestore-request-for-offer-prototype'
import { buildActivity } from '../activity/build-activity'
import { generateRequestForOfferActivity } from './generate-request-for-offer-activity'
import dayjs from 'dayjs'
import { isEmpty } from 'ramda'

// TODO There should be more validation here IMO, some data can be invalid yet not checked
export const buildRequestForOffer: FirestoreBuilder<
  FirestoreRequestForOfferPrototype,
  FirestoreRequestForOffer
> = async (prototype) => {
  // TODO handle different errors
  const discordGuild = await getFirestoreDiscordGuildRefByDiscordId(prototype.discordGuildId)
  const target = await getFirestoreContractRefsByAddress(prototype.target)
  if (isEmpty(target)) {
    return Promise.reject('buildRequestForOffer Invalid target')
  }
  const activities = await buildActivity(generateRequestForOfferActivity('CREATED')).then((activity) => [activity])
  return {
    state: 'CREATED',
    sender: getFirestoreUserRefById(prototype.senderId),
    discordGuild,
    target,
    items: await Promise.all(prototype.items.map(getFirestoreNftRefById)),
    activities,
    createdAt: dayjs().unix(),
    // For now, we default to 24 hours offer, we should have more flexibility in the future
    expiresAt: dayjs().add(1, 'day').unix()
  } as unknown as FirestoreRequestForOffer
}
