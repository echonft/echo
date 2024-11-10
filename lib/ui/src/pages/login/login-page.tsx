'use client'
import type { User } from '@echo/model/types/user'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { Login } from '@echo/ui/components/auth/login'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
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
            router.replace(frontendRoutes.base.home.get())
          } else {
            router.replace(callbackUrl)
          }
        }}
      />
    </div>
  )
}
