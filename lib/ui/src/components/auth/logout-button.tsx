'use client'
import { pathProvider } from '@echo/routing/constants/path-provider'
import { LogoutIconSvg } from '@echo/ui/components/base/svg/logout-icon-svg'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { clsx } from 'clsx'
import { type FunctionComponent, useState } from 'react'

export const LogoutButton: FunctionComponent = () => {
  const { logout } = useDependencies()
  const [loading, setLoading] = useState(false)
  return (
    <button
      className={clsx('btn-auth-alt', loading && 'animate-pulse')}
      onClick={() => {
        setLoading(true)
        void logout({ redirectTo: pathProvider.base.home.getUrl() })
      }}
      disabled={loading}
    >
      <LogoutIconSvg />
    </button>
  )
}
