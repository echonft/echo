import { FirestoreBuilder, FirestoreDiscordGuild, FirestoreDiscordGuildPrototype } from '../../../../firestore/src'
import { getFirestoreContractRefsByAddressAndChainId } from '../../data/contract/get-firestore-contract-refs-by-address-and-chain-id'

export const buildDiscordGuild: FirestoreBuilder<FirestoreDiscordGuildPrototype, FirestoreDiscordGuild> = async (
  prototype
) =>
  getFirestoreContractRefsByAddressAndChainId(prototype.contracts).then(
    (contracts) =>
      ({
        discordId: prototype.discordId,
        name: prototype.name,
        channelId: prototype.channelId,
        contracts
      } as unknown as FirestoreDiscordGuild)
  )
