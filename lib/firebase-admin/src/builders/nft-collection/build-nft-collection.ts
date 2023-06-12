import { getFirestoreContractRefById } from '../../data/contract/get-firestore-contract-ref-by-id'
import { getFirestoreDiscordGuildRefById } from '../../data/discord-guild/get-firestore-discord-guild-ref-by-id'
import { FirestoreBuilder, FirestoreNftCollection, FirestoreNftCollectionPrototype } from '@echo/firestore'
import { isNil } from 'ramda'

export const buildNftCollection: FirestoreBuilder<FirestoreNftCollectionPrototype, FirestoreNftCollection> = (
  prototype
) => {
  const contractRef = getFirestoreContractRefById(prototype.contractId)
  if (isNil(contractRef)) {
    throw Error('buildNftCollection Invalid Contract')
  }
  const discordGuildRef = getFirestoreDiscordGuildRefById(prototype.discordGuildId)
  if (isNil(discordGuildRef)) {
    throw Error('buildNftCollection Invalid Discord Guild')
  }
  return Promise.resolve({
    name: prototype.name,
    description: prototype.description,
    contract: contractRef,
    discordGuild: discordGuildRef,
    bannerUrl: prototype.bannerUrl,
    discordUrl: prototype.discordUrl,
    floorPrice: prototype.floorPrice,
    profilePictureUrl: prototype.profilePictureUrl,
    totalSupply: prototype.totalSupply,
    websiteUrl: prototype.websiteUrl,
    twitterUsername: prototype.twitterUsername
  } as unknown as FirestoreNftCollection)
}
