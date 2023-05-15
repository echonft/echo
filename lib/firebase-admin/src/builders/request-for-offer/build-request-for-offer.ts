import { FirestoreBuilder } from '../../../../firestore/src/types/builder/firestore-builder'
import { FirestoreRequestForOfferPrototype } from '../../../../firestore/src/types/prototypes/request-for-offer/firestore-request-for-offer-prototype'
import { getFirestoreContractRefsByAddressAndChainId } from '../../data/contract/get-firestore-contract-refs-by-address-and-chain-id'
import { getFirestoreDiscordGuildRefByDiscordId } from '../../data/discord-guild/get-firestore-discord-guild-ref-by-discord-id'
import { getFirestoreNftRefById } from '../../data/nft/get-firestore-nft-ref-by-id'
import { getFirestoreUserRefById } from '../../data/user/get-firestore-user-ref-by-id'
import { buildRequestForOfferActivity } from './build-request-for-offer-activity'
import { FirestoreRequestForOffer } from '@echo/firestore'
import { RequestForOfferState } from '@echo/model'
import { R } from '@mobily/ts-belt'
import dayjs from 'dayjs'
import { isEmpty } from 'ramda'

// TODO There should be more validation here IMO, some data can be invalid yet not checked
export const buildRequestForOffer: FirestoreBuilder<
  FirestoreRequestForOfferPrototype,
  FirestoreRequestForOffer
> = async (prototype) => {
  const discordGuildResult = await getFirestoreDiscordGuildRefByDiscordId(prototype.discordGuildId)
  if (R.isError(discordGuildResult)) {
    throw Error('buildRequestForOffer Discord Guild does not exist')
  }
  const target = await getFirestoreContractRefsByAddressAndChainId(prototype.target)
  if (isEmpty(target)) {
    throw Error('buildRequestForOffer Invalid target')
  }
  const activities = await buildRequestForOfferActivity(
    generateRequestForOfferActivity(RequestForOfferState.CREATED) as FirestoreRequestForOfferActivityPrototype
  ).then((activity) => [activity])
  return {
    state: RequestForOfferState.CREATED,
    sender: getFirestoreUserRefById(prototype.senderId),
    discordGuild: R.getExn(discordGuildResult),
    target,
    items: await Promise.all(prototype.items.map(getFirestoreNftRefById)),
    // FIXME: This does not work for some reason
    activities,
    createdAt: dayjs().unix(),
    // For now, we default to 24 hours offer, we should have more flexibility in the future
    expiresAt: dayjs().add(1, 'day').unix()
  } as unknown as FirestoreRequestForOffer
}
