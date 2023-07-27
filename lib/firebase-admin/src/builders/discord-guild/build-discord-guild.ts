import { getFirestoreContractRefsByAddress } from '../../data/contract/get-firestore-contract-refs-by-address'
import { FirestoreBuilder, FirestoreDiscordGuild, FirestoreDiscordGuildPrototype } from '@echo/firestore'

export const buildDiscordGuild: FirestoreBuilder<FirestoreDiscordGuildPrototype, FirestoreDiscordGuild> = async (
  prototype
) =>
  getFirestoreContractRefsByAddress(prototype.contracts).then(
    (contracts) =>
      ({
        discordId: prototype.discordId,
        name: prototype.name,
        channelId: prototype.channelId,
        contracts
      } as unknown as FirestoreDiscordGuild)
  )
