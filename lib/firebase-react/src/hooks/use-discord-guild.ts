import { useDocument } from './use-document'
import { CollectionName, FirestoreDiscordGuild, FirestoreDiscordGuildData } from '@echo/firestore'
import { DiscordGuild } from '@echo/model'
import { R } from '@mobily/ts-belt'
import { SWRResponse } from 'swr'

export const useDiscordGuild = (guildId: string): SWRResponse<R.Result<DiscordGuild, Error>, Error> =>
  useDocument<FirestoreDiscordGuild, FirestoreDiscordGuildData, DiscordGuild>({
    path: CollectionName.GUILDS,
    pathSegments: [guildId]
  })
