import { discordSecret } from '@echo/discord/admin/config'
import { discordConfig } from '@echo/discord/config/config'
import { DiscordTokenResponse } from '@echo/discord/model/token-response'
import { Routes, TokenRoutePostData } from '@echo/discord/routing/routes'
import { HTTPError } from '@lib/services/fetcher/errors/http'
import { fetcher } from '@lib/services/fetcher/fetcher'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { ParsedUrlQuery } from 'querystring'
import { isEmpty, isNil } from 'ramda'

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
export const getServerSideProps: GetServerSideProps<Props, UrlQuery> = async ({ params, locale }) => {
  if (isNil(params) || isEmpty(params) || isNil(params.code) || isEmpty(params.code)) {
    return { notFound: true }
  }
  return import(`@lib/messages/${locale}.json`)
    .then((messages) =>
      fetcher<DiscordTokenResponse, TokenRoutePostData>(
        Routes.TOKEN,
        {
          client_id: discordConfig().clientId,
          client_secret: discordSecret().clientSecret,
          grant_type: 'authorization_code',
          code: params.code,
          redirect_uri: discordConfig().redirectUri,
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
        .catch((err: HTTPError) => {
          // eslint-disable-next-line no-console
          console.error(`Error fetching discord token: ${err.message}`)
          return { notFound: true }
        })
    )
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(`Could not load messages for locale ${locale}: ${error.message}`)
      return { notFound: true }
    })
}
export default Login
