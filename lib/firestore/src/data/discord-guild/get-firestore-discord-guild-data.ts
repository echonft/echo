import { CollectionName } from '../../constants/collection-name'
import { convertDiscordGuild } from '../../converters/discord-guild/convert-discord-guild'
import { getDocSnapshot } from '../../helpers/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreDiscordGuildData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertDiscordGuild))(CollectionName.GUILDS, documentPath)
