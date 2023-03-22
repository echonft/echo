import { DiscordRoutes } from '@echo/discord/dist/routing'
import { DiscordTokenResponse, TokenRoutePostData } from '@echo/discord/dist/types'
import { postFormData } from '@echo/swr'
import { getMessages, MessagesType } from '@lib/messages'
import { R } from '@mobily/ts-belt'
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
  const discordConfig = await import('@echo/discord/dist/config')
  const discordAdmin = await import('@echo/discord/dist/admin')
  const result = await postFormData<DiscordTokenResponse, TokenRoutePostData>(DiscordRoutes.TOKEN, {
    client_id: discordConfig.discordConfig.clientId,
    client_secret: discordAdmin.discordSecret.clientSecret,
    grant_type: 'authorization_code',
    code: params.code,
    redirect_uri: discordConfig.discordConfig.redirectUri,
    scope: 'identify'
  })
  if (R.isError(result)) {
    return { notFound: true }
  }
  const response = R.getExn(result)
  return {
    props: {
      accessToken: response.access_token,
      tokenType: response.token_type,
      messages: getMessages(locale, defaultLocale)
    }
  }
}
export default Login
