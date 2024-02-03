'use client'
import { linkProvider } from '@echo/api/routing/link-provider'
import type { AuthUser } from '@echo/model/types/auth-user'
import { Login } from '@echo/ui/components/auth/login'
import type { Nullable } from '@echo/utils/types/nullable'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  callbackUrl?: string
  user: Nullable<AuthUser>
}

export const LoginPage: FunctionComponent<Props> = ({ callbackUrl, user }) => {
  const router = useRouter()
  return (
    <div className={clsx('flex', 'justify-center')}>
      <Login
        user={user}
        onFinish={() => {
          if (isNil(callbackUrl)) {
            router.replace(linkProvider.base.home.getUrl())
          } else {
            router.replace(callbackUrl)
          }
        }}
      />
    </div>
  )
}
