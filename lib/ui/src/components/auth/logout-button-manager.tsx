'use client'
import { LogoutButton } from '@echo/ui/components/auth/logout-button'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { type FunctionComponent, useState } from 'react'

export const LogoutButtonManager: FunctionComponent = () => {
  const { logout } = useDependencies()
  const [loggingOut, setLoggingOut] = useState(false)
  return (
    <LogoutButton
      onClick={() => {
        setLoggingOut(true)
        void logout()
      }}
      loading={loggingOut}
    />
  )
}
