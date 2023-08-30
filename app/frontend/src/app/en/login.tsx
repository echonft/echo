import { ConnectButton } from '@components/connect-button'
import { Redirect } from '@components/redirect'
import { isNilOrEmpty } from '@echo/utils'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { isNil } from 'ramda'

const Login: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { callbackUrl } = router.query

  if (isNil(session)) {
    return <ConnectButton />
  } else {
    if (isNilOrEmpty(callbackUrl)) {
      return <Redirect to={'/'} />
    }
    return <Redirect to={new URL(callbackUrl as string).pathname} />
  }
}

export default Login
