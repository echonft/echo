import { ApiRoutes } from '@lib/constants/api-routes'
import { useFetchDiscordUser } from '@lib/hooks/use-fetch-discord-user'
import { LoginResponse } from '@lib/models/api/login-response'
import { fetcher } from '@lib/services/fetcher'
import useSWR from 'swr'

// TODO Use Result
export function useLogin(
  accessToken: string | undefined,
  tokenType: string | undefined,
  address: string | undefined,
  message: string | undefined,
  signature: string | undefined
) {
  const { data: discordUser, error: discordUserError } = useFetchDiscordUser(accessToken, tokenType)
  const { data, error } = useSWR<LoginResponse>(
    discordUser &&
      address &&
      message &&
      signature && [ApiRoutes.LOGIN, { signature, address, message, discordId: discordUser.id }],
    fetcher
  )
  return { data, error: error || discordUserError }
}

/**
 * Login with Firebase without discord ID
 * @param address The wallet address
 * @param message The message that was signed
 * @param signature The signature of the message
 * TODO Use Result
 */
export function useLoginWithoutDiscord(
  address: string | undefined,
  message: string | undefined,
  signature: string | undefined
) {
  const { data, error } = useSWR<LoginResponse>(
    address && message && signature && [ApiRoutes.LOGIN, { signature, address, message }],
    fetcher
  )
  return { data, error }
}
