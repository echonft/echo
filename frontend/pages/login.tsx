import { discordConfig } from '@echo/discord/config/config'
import { DiscordTokenResponse } from '@echo/discord/model/token-response'
import { Routes } from '@echo/discord/routing/routes'
import { HTTPError } from '@lib/services/fetcher/errors/http'
import { fetcher } from '@lib/services/fetcher/fetcher'
import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { isNil } from 'ramda'

const Connect = dynamic(() => import('@components/connect').then((mod) => mod.Connect), {
  ssr: false,
})

interface Props {
  accessToken: string | undefined
  tokenType: string | undefined
}

const Login: NextPage<Props> = ({ accessToken, tokenType }) => (
  <Connect accessToken={accessToken} tokenType={tokenType} />
)

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (isNil(query.code)) {
    return { notFound: true }
  }
  const data = new URLSearchParams({
    client_id: discordConfig().clientId,
    client_secret: discordConfig().clientSecret,
    grant_type: 'authorization_code',
    code: query.code as string,
    redirect_uri: discordConfig().redirectUri,
    scope: 'identify',
  }).toString()
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  return fetcher<DiscordTokenResponse>(Routes.TOKEN, {}, { headers, body: data })
    .then((response) => ({
      props: { accessToken: response.access_token, tokenType: response.token_type },
    }))
    .catch((err: HTTPError) => {
      // eslint-disable-next-line no-console
      console.error(`Error fetching discord token, ${err} ${JSON.stringify(err.info)} ${err.status}`)
      return { notFound: true }
    })
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  }
}

export default Login
