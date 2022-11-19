import { UserResponse } from '@echo/discord/model/user-response'
import { Routes } from '@echo/discord/routing/routes'
import { fetcher } from '@lib/services/fetcher/fetcher'
import useSWRImmutable from 'swr/immutable'

// TODO Use Result
export function useFetchDiscordUser(accessToken: string | undefined, tokenType: string | undefined) {
  const { data, error } = useSWRImmutable<UserResponse, Error>(
    accessToken && tokenType && [Routes.USER, { accessToken, tokenType }],
    (url, data) => fetcher(url, undefined, { headers: { authorization: `${data.tokenType} ${data.accessToken}` } })
  )
  return { data, error }
}
