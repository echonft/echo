'use client'
import type { User } from '@echo/model/types/user'
import { pathProvider } from '@echo/routing/path/path-provider'
import { Login } from '@echo/ui/components/auth/login'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { type FunctionComponent } from 'react'

interface Props {
  callbackUrl?: string
  user: Nullable<User>
}

export const LoginPage: FunctionComponent<Props> = ({ callbackUrl, user }) => {
  const router = useRouter()
  return (
    <div className={clsx('flex', 'justify-center')}>
      <Login
        user={user}
        onFinish={() => {
          if (isNilOrEmpty(callbackUrl)) {
            router.replace(pathProvider.base.home.get())
          } else {
            router.replace(callbackUrl)
          }
        }}
      />
    </div>
  )
}
