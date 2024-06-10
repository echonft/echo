import { environment } from '@echo/utils/constants/environment'
import { isNil } from 'ramda'

export function getEchoDiscordGuild() {
  if (isNil(environment) || environment === 'development' || environment === 'staging') {
    return {
      id: '1002691062374088794',
      channelId: '1175976508662226944'
    }
  }
  return {
    id: '1156269200298487839',
    channelId: '1207243729002569769'
  }
}
