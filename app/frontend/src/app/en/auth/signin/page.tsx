import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { BASE_URL } from '@echo/frontend/lib/constants/base-url'
import { Login } from '@echo/ui/components/auth/login'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  searchParams: {
    callbackUrl?: string
  }
}

const SigninPage: FunctionComponent<Props> = async ({ searchParams }) => {
  const session = await getServerSession(authOptions)
  if (!isNil(session) && !isNil(session.user)) {
    if (!isNilOrEmpty(searchParams.callbackUrl) && searchParams.callbackUrl.startsWith(BASE_URL)) {
      redirect(searchParams.callbackUrl)
    } else {
      redirect('/')
    }
  }
  return <Login />
}

export default SigninPage
