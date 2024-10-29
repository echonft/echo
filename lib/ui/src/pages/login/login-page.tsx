'use client'
import type { User } from '@echo/model/types/user'
import { pathProvider } from '@echo/routing/constants/path-provider'
import { Login } from '@echo/ui/components/auth/login'
import { HeaderStyle } from '@echo/ui/constants/header-style'
import { useHeaderStore } from '@echo/ui/hooks/use-header-store'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { type FunctionComponent, useEffect } from 'react'

interface Props {
  callbackUrl?: string
  user: Nullable<User>
}

export const LoginPage: FunctionComponent<Props> = ({ callbackUrl, user }) => {
  const router = useRouter()
  const setStyle = useHeaderStore((state) => state.setStyle)

  useEffect(() => {
    setStyle(HeaderStyle.Plain)
    return (): void => {
      setStyle(HeaderStyle.Default)
    }
  }, [setStyle])

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
