import { discordConfig } from '@echo/discord/dist/config'
import { DiscordTokenResponse, Routes, TokenRoutePostData } from '@echo/discord/dist/types'
import { errorMessage, logger } from '@echo/utils'
import { getMessages, MessagesType } from '@lib/messages'
import { fetcher } from '@lib/services/fetcher'
import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { ParsedUrlQuery } from 'querystring'
import { isEmpty, isNil } from 'ramda'

const Connect = dynamic(() => import('@components/connect').then((mod) => mod.Connect), {
  ssr: false
})

interface Props {
  accessToken: string | undefined
  tokenType: string | undefined
  messages: MessagesType
}

interface UrlQuery extends ParsedUrlQuery {
  code: string
}

const Login: NextPage<Props> = ({ accessToken, tokenType }) => (
  <Connect accessToken={accessToken} tokenType={tokenType} />
)

export const getServerSideProps: GetServerSideProps<Props, UrlQuery> = async ({ params, locale, defaultLocale }) => {
  if (isNil(params) || isEmpty(params) || isNil(params.code) || isEmpty(params.code)) {
    return { notFound: true }
  }
  try {
    const discordAdmin = await import('@echo/discord/dist/admin')
    const response = await fetcher<DiscordTokenResponse, TokenRoutePostData>(
      Routes.TOKEN,
      {
        client_id: discordConfig.clientId,
        client_secret: discordAdmin.discordSecret.clientSecret,
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
    return {
      props: {
        accessToken: response.access_token,
        tokenType: response.token_type,
        messages: getMessages(locale, defaultLocale)
      }
    }
  } catch (error) {
    logger.error(`Error fetching discord token: ${errorMessage(error)}`)
    return { notFound: true }
  }
}
export default Login
