import { LoginDiscordStep } from '@echo/ui/components/base/auth/login-discord-step'
import { Environment, environment } from '@echo/utils/constants/environment'

export default function render() {
  const discordClientId = environment() === Environment.Development ? '1022253427436298250' : '1224786309009113259'
  return <LoginDiscordStep discordClientId={discordClientId} />
}
