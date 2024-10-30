'use client'
import { LogoutButton } from '@echo/ui/components/auth/logout-button'

import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { type FunctionComponent, useState } from 'react'

export const LogoutButtonManager: FunctionComponent = () => {
  const { logout, logger } = useDependencies()
  const [loggingOut, setLoggingOut] = useState(false)
  return (
    <LogoutButton
      onClick={() => {
        setLoggingOut(true)
        void logout()
          .then(() => {
            logger?.info('logged out')
          })
          .catch((err: unknown) => {
            logger?.error({ err }, 'could not log out')
          })
      }}
      loading={loggingOut}
    />
  )
}
