import { discordSecret } from '@echo/discord/admin/config'
import { discordConfig } from '@echo/discord/config/config'
import { DiscordTokenResponse } from '@echo/discord/model/token-response'
import { Routes } from '@echo/discord/routing/routes'
import { HTTPError } from '@lib/services/fetcher/errors/http'
import { fetcher } from '@lib/services/fetcher/fetcher'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { isNil } from 'ramda'

const Connect = dynamic(() => import('@components/connect').then((mod) => mod.Connect), {
  ssr: false
})

interface Props {
  accessToken: string | undefined
  tokenType: string | undefined
}

const Login: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ accessToken, tokenType }) => (
  <Connect accessToken={accessToken} tokenType={tokenType} />
)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps<Props> = async ({ query, locale }) => {
  if (isNil(query.code)) {
    return { notFound: true }
  }
  const data = new URLSearchParams({
    client_id: discordConfig().clientId,
    client_secret: discordSecret().clientSecret,
    grant_type: 'authorization_code',
    code: query.code as string,
    redirect_uri: discordConfig().redirectUri,
    scope: 'identify'
  }).toString()
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  return import(`@lib/messages/${locale}.json`)
    .then((messages) =>
      fetcher<DiscordTokenResponse>(Routes.TOKEN, {}, { headers, body: data })
        .then((response) => ({
          props: { accessToken: response.access_token, tokenType: response.token_type, messages: messages.default }
        }))
        .catch((err: HTTPError) => {
          // eslint-disable-next-line no-console
          console.error(`Error fetching discord token, ${err} ${JSON.stringify(err.info)} ${err.status}`)
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
