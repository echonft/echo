import { getChannel } from '@echo/bot/helpers/get-channel'
import { getEchoDiscordGuild } from '@echo/utils/helpers/get-echo-discord-guild'
import { pipe, prop } from 'ramda'

export function getEchoChannel() {
  return pipe(getEchoDiscordGuild, prop('channelId'), getChannel)()
}
