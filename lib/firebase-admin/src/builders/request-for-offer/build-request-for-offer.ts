import { getFirestoreContractRefsByAddressAndChainId } from '../../data/contract/get-firestore-contract-refs-by-address-and-chain-id'
import { getFirestoreDiscordGuildRefByDiscordId } from '../../data/discord-guild/get-firestore-discord-guild-ref-by-discord-id'
import { getFirestoreUserRefById } from '../../data/user/get-firestore-user-ref-by-id'
import { FirestoreBuilder } from '../../types/builder/firestore-builder'
import { FirestoreRequestForOfferPrototype } from '../../types/prototypes/request-for-offer/firestore-request-for-offer-prototype'
import { FirestoreRequestForOffer } from '@echo/firestore'
import { RequestForOfferState } from '@echo/model'

export const buildRequestForOffer: FirestoreBuilder<
  FirestoreRequestForOfferPrototype,
  FirestoreRequestForOffer
> = async (prototype) =>
  ({
    state: RequestForOfferState.CREATED,
    sender: getFirestoreUserRefById(prototype.senderId),
    discordGuild: getFirestoreDiscordGuildRefByDiscordId(prototype.discordGuildId),
    target: await getFirestoreContractRefsByAddressAndChainId(prototype.target),
    items: [],
    activities: [],
    createdAt: 0,
    expiresAt: 0
    // state: string
    // sender: DocumentReference<FirestoreUser>
    // items: FirestoreRequestForOfferItem[]
    // discordGuild: DocumentReference<FirestoreDiscordGuild>
    // target: DocumentReference<FirestoreContract>[]
    // activities: FirestoreRequestForOfferActivity[]
    // offers?: DocumentReference<FirestoreOffer>[]
    // swaps?: DocumentReference<FirestoreSwap>[]
    // expiresAt: number
    // postedAt?: number
    // createdAt: number
  } as unknown as FirestoreRequestForOffer)
