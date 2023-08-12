import { getFirestoreContractRefsByAddress } from '../../data/contract/get-firestore-contract-refs-by-address'
import { FirestoreBuilder } from '../../types/builder/firestore-builder'
import { FirestoreDiscordGuild } from '../../types/model/collections/discord-guild/firestore-discord-guild'
import { FirestoreDiscordGuildPrototype } from '../../types/prototypes/discord-guild/firestore-discord-guild-prototype'

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
      }) as unknown as FirestoreDiscordGuild
  )
