import { AppEnvironment } from '../types/config'

export function getDiscordAppEnvironment(): AppEnvironment {
  const env = process.env.DISCORD_APP_ENV?.toLowerCase()
  switch (env) {
    case 'prod':
      return AppEnvironment.PROD
    case 'dev':
      return AppEnvironment.DEV
    default:
      if (process.env.NODE_ENV === 'production') {
        return AppEnvironment.PROD
      } else {
        return AppEnvironment.DEV
      }
  }
}
