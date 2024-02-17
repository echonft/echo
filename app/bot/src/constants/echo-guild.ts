import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { throwError } from '@echo/utils/fp/throw-error'
import { applySpec, ifElse, prop } from 'ramda'

type Args = NodeJS.Process['env']
interface Return {
  channelId: string
  discordId: string
}
export const echoGuild: Return = ifElse<[Args], Return, Return>(
  propIsNil('ECHO_DISCORD_GUILD_CHANNEL_ID'),
  throwError<[Args], Return>('ECHO_DISCORD_GUILD_CHANNEL_ID env var is not defined'),
  ifElse(
    propIsNil('ECHO_DISCORD_GUILD_ID'),
    throwError<[Args], Return>('ECHO_DISCORD_GUILD_ID env var is not defined'),
    applySpec<Return>({
      channelId: prop('ECHO_DISCORD_GUILD_CHANNEL_ID'),
      discordId: prop('ECHO_DISCORD_GUILD_ID')
    })
  )
)(process.env)
