import { getFirestoreContractRefsByAddress } from '../../data/contract/get-firestore-contract-refs-by-address'
import { getFirestoreDiscordGuildRefByDiscordId } from '../../data/discord-guild/get-firestore-discord-guild-ref-by-discord-id'
import { getFirestoreNftRefById } from '../../data/nft/get-firestore-nft-ref-by-id'
import { getFirestoreUserRefById } from '../../data/user/get-firestore-user-ref-by-id'
import { buildRequestForOfferActivity } from './build-request-for-offer-activity'
import {
  FirestoreBuilder,
  FirestoreRequestForOffer,
  FirestoreRequestForOfferActivityPrototype,
  FirestoreRequestForOfferPrototype
} from '@echo/firestore'
import { generateRequestForOfferActivity, RequestForOfferState } from '@echo/model'
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
  const activities = await buildRequestForOfferActivity(
    generateRequestForOfferActivity(RequestForOfferState.CREATED) as FirestoreRequestForOfferActivityPrototype
  ).then((activity) => [activity])
  return {
    state: RequestForOfferState.CREATED,
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
