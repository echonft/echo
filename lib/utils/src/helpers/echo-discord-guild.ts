import { Environment, environment } from '@echo/utils/constants/environment'

export function echoDiscordGuild() {
  const env = environment()
  if (env === Environment.Development) {
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
