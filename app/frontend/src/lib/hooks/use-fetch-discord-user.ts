import { DiscordRoutes, DiscordUserResponse } from '@echo/discord'
import { getConditionalFetchKey, getSecureUrl, SwrKey, SwrKeyNames } from '@echo/swr'
import { isNilOrEmpty } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { always, converge, join, or, pipe, prop, props } from 'ramda'
import useSWRImmutable from 'swr/immutable'

interface KeyData {
  url: string
  accessToken: string | undefined
  tokenType: string | undefined
}

export const useFetchDiscordUser = (accessToken: string | undefined, tokenType: string | undefined) =>
  useSWRImmutable<R.Result<DiscordUserResponse, Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      { name: SwrKeyNames.DISCORD_USER_ME, data: { url: DiscordRoutes.USER, accessToken, tokenType } },
      always(or(isNilOrEmpty(accessToken), isNilOrEmpty(tokenType)))
    ),
    pipe(
      prop('data'),
      converge(
        (url: string, authorization: string) => getSecureUrl<DiscordUserResponse>(url, authorization),
        [prop('url'), pipe(props(['tokenType', 'accessToken']), join(' '))]
      )
    )
  )
