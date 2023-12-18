import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { LoginFlow } from '@echo/ui/components/auth/login-flow'
import { getServerSession } from 'next-auth/next'
import { type FunctionComponent } from 'react'

interface Props {
  searchParams: {
    callbackUrl?: string
  }
}

const SigninPage: FunctionComponent<Props> = async ({ searchParams }) => {
  const session = await getServerSession(authOptions)
  return <LoginFlow callbackUrl={searchParams.callbackUrl} user={session?.user} />
}

export default SigninPage
