import { discordConfig, discordSecret, DiscordTokenResponse, Routes, TokenRoutePostData } from '@echo/discord'
import { errorMessage, logger } from '@echo/utils'
import { fetcher } from '@lib/services/fetcher'
import { HTTPError } from '@lib/services/fetcher/errors/http'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { ParsedUrlQuery } from 'querystring'
import { isEmpty, isNil } from 'rambda'

const Connect = dynamic(() => import('@components/connect').then((mod) => mod.Connect), {
  ssr: false
})

interface Props {
  accessToken: string | undefined
  tokenType: string | undefined
}

interface UrlQuery extends ParsedUrlQuery {
  code: string
}

const Login: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ accessToken, tokenType }) => (
  <Connect accessToken={accessToken} tokenType={tokenType} />
)

// FIXME
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps<Props, UrlQuery> = async ({ params, locale, defaultLocale }) => {
  if (isNil(params) || isEmpty(params) || isNil(params.code) || isEmpty(params.code)) {
    return { notFound: true }
  }
  return import(`@lib/messages/${isNil(locale) ? defaultLocale! : locale}.json`)
    .then((messages) =>
      fetcher<DiscordTokenResponse, TokenRoutePostData>(
        Routes.TOKEN,
        {
          client_id: discordConfig.clientId,
          client_secret: discordSecret.clientSecret,
          grant_type: 'authorization_code',
          code: params.code,
          redirect_uri: discordConfig.redirectUri,
          scope: 'identify'
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
        .then((response) => ({
          props: { accessToken: response.access_token, tokenType: response.token_type, messages: messages.default }
        }))
        .catch((error: HTTPError) => {
          logger.error(`Error fetching discord token: ${errorMessage(error)}`)
          return { notFound: true }
        })
    )
    .catch((error) => {
      logger.error(
        `Could not load messages for locale ${isNil(locale) ? defaultLocale! : locale}: ${errorMessage(error)}`
      )
      return { notFound: true }
    })
}
export default Login
