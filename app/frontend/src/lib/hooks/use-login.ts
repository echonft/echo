import { ApiRoutes, getApiRouteUrl, LoginRequest, LoginResponse } from '@echo/api/dist/types'
import { getConditionalFetchKey, postData, SwrKey, SwrKeyNames } from '@echo/swr'
import { castAs, isNilOrEmpty } from '@echo/utils'
import { useFetchDiscordUser } from '@lib/hooks/use-fetch-discord-user'
import { R } from '@mobily/ts-belt'
import { always, converge, isNil, path, pipe } from 'ramda'
import useSWR from 'swr'

interface KeyData {
  url: string
  request: LoginRequest | undefined
}
export const useLogin = (
  accessToken: string | undefined,
  tokenType: string | undefined,
  address: string | undefined,
  message: string | undefined,
  signature: string | undefined
) => {
  const { data: discordUserResult } = useFetchDiscordUser(accessToken, tokenType)
  const skipFetchCondition = always(
    isNilOrEmpty(address) ||
      isNilOrEmpty(address) ||
      isNilOrEmpty(signature) ||
      isNil(discordUserResult) ||
      R.isError(discordUserResult)
  )
  return useSWR<R.Result<LoginResponse, Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      {
        name: SwrKeyNames.API_LOGIN,
        data: {
          url: getApiRouteUrl(ApiRoutes.LOGIN),
          request: skipFetchCondition()
            ? undefined
            : {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                message: message!,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                signature: signature!,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                address: address!,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                discordId: R.getExn(discordUserResult!).id
              }
        }
      },
      skipFetchCondition
    ),
    converge<
      Promise<R.Result<LoginResponse, Error>>,
      [(key: SwrKey<KeyData>) => string, (key: SwrKey<KeyData>) => LoginRequest]
    >(
      (url: string, data: LoginRequest) => postData<LoginResponse, LoginRequest>(url, data),
      [pipe(path(['data', 'url']), castAs<string>), pipe(path(['data', 'request']), castAs<LoginRequest>)]
    )
  )
}

/**
 * Login with Firebase without discord ID
 * @param address The wallet address
 * @param message The message that was signed
 * @param signature The signature of the message
 */
export function useLoginWithoutDiscord(
  address: string | undefined,
  message: string | undefined,
  signature: string | undefined
) {
  const skipFetchCondition = always(isNilOrEmpty(address) || isNilOrEmpty(address) || isNilOrEmpty(signature))
  return useSWR<R.Result<LoginResponse, Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      {
        name: SwrKeyNames.API_LOGIN_WITHOUT_DISCORD,
        data: {
          url: getApiRouteUrl(ApiRoutes.LOGIN),
          request: skipFetchCondition()
            ? undefined
            : {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                message: message!,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                signature: signature!,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                address: address!
              }
        }
      },
      skipFetchCondition
    ),
    converge<
      Promise<R.Result<LoginResponse, Error>>,
      [(key: SwrKey<KeyData>) => string, (key: SwrKey<KeyData>) => LoginRequest]
    >(
      (url: string, data: LoginRequest) => postData<LoginResponse, LoginRequest>(url, data),
      [pipe(path(['data', 'url']), castAs<string>), pipe(path(['data', 'request']), castAs<LoginRequest>)]
    )
  )
}
