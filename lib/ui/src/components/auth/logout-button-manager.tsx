'use client'
import { linkProvider } from '@echo/api/routing/link-provider'
import { LogoutButton } from '@echo/ui/components/auth/logout-button'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import { type FunctionComponent, useState } from 'react'

export const LogoutButtonManager: FunctionComponent = () => {
  const { signOut } = useDependencies()
  const [loggingOut, setLoggingOut] = useState(false)
  return (
    <LogoutButton
      onClick={() => {
        setLoggingOut(true)
        void signOut({ callbackUrl: linkProvider.base.home.getUrl() })
      }}
      loading={loggingOut}
    />
  )
}
