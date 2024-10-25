import { Environment, environment } from '@echo/utils/constants/environment'

export function echoDiscordGuild() {
  if (environment === Environment.Development || environment === Environment.Staging) {
    return {
      id: '1002691062374088794',
      channelId: '1032728052209295450'
    }
  }
  return {
    id: '1156269200298487839',
    channelId: '1207243729002569769'
  }
}
