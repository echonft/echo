import { echoGuild } from '@echo/bot/constants/echo-guild'
import { getChannel } from '@echo/bot/helpers/get-channel'

export function getEchoChannel() {
  return getChannel(echoGuild.channelId)
}
