import { useDocument } from './use-document'
import { FirestoreDiscordGuild, FirestoreDiscordGuildData } from '@echo/firestore'
import { DiscordGuild } from '@echo/model'

export const useDiscordGuild = (guildId: string | undefined) =>
  useDocument<FirestoreDiscordGuild, FirestoreDiscordGuildData, DiscordGuild>(guildId)
