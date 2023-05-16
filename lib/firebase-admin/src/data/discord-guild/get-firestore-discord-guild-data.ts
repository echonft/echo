import { convertDiscordGuild } from '../../converters/discord-guild/convert-discord-guild'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { CollectionName } from '@echo/firestore'
import { andThen, pipe } from 'ramda'

export const getFirestoreDiscordGuildData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertDiscordGuild))(CollectionName.GUILDS, documentPath)
