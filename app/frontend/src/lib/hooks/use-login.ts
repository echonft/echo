import { ApiRoutes, getApiRouteUrl, LoginRequest, LoginResponse } from '@echo/api'
import { useFetchDiscordUser } from '@lib/hooks/use-fetch-discord-user'
import { fetcher } from '@lib/services/fetcher'
import { isEmpty, isNil } from 'ramda'
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
  const { data, error } = useSWR<LoginResponse, Error, [string, LoginRequest] | undefined>(
    !isNil(discordUser) &&
      !isNil(address) &&
      !isEmpty(address) &&
      !isNil(message) &&
      !isEmpty(message) &&
      !isNil(signature) &&
      !isEmpty(signature)
      ? [getApiRouteUrl(ApiRoutes.LOGIN), { signature, address, message, discordId: discordUser.id }]
      : undefined,
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
  const { data, error } = useSWR<LoginResponse, Error, [string, LoginRequest] | undefined>(
    !isNil(address) &&
      !isEmpty(address) &&
      !isNil(message) &&
      !isEmpty(message) &&
      !isNil(signature) &&
      !isEmpty(signature)
      ? [getApiRouteUrl(ApiRoutes.LOGIN), { signature, address, message }]
      : undefined,
    fetcher
  )
  return { data, error }
}
