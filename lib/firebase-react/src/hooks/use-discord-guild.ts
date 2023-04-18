import { useDocument } from './use-document'
import { FirestoreDiscordGuild, FirestoreDiscordGuildData } from '@echo/firestore'
import { DiscordGuild } from '@echo/model'
import { R } from '@mobily/ts-belt'
import { SWRResponse } from 'swr'

export const useDiscordGuild = (guildId: string | undefined): SWRResponse<R.Result<DiscordGuild, Error>, Error> =>
  useDocument<FirestoreDiscordGuild, FirestoreDiscordGuildData, DiscordGuild>(guildId)
