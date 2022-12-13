import { Routes, UserResponse } from '@echo/discord'
import { fetcher } from '@lib/services/fetcher'
import { isEmpty, isNil } from 'ramda'
import useSWRImmutable from 'swr/immutable'

interface Key {
  accessToken: string
  tokenType: string
}
// TODO Use Result
export function useFetchDiscordUser(accessToken: string | undefined, tokenType: string | undefined) {
  const { data, error } = useSWRImmutable<UserResponse, Error, [Routes, Key] | undefined>(
    !isNil(accessToken) && !isEmpty(accessToken) && !isNil(tokenType) && !isEmpty(tokenType)
      ? [Routes.USER, { accessToken, tokenType }]
      : undefined,
    (url, data) => fetcher(url, undefined, { headers: { authorization: `${data.tokenType} ${data.accessToken}` } })
  )
  return { data, error }
}
