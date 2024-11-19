'use client'
import { LogoutIconSvg } from '@echo/ui/components/base/svg/logout-icon-svg'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { clsx } from 'clsx'
import { type FunctionComponent, useState } from 'react'

export const LogoutButton: FunctionComponent = () => {
  const { disconnectWallet } = useDependencies()
  const [loading, setLoading] = useState(false)
  return (
    <button
      className={clsx('btn-auth-alt', loading && 'animate-pulse')}
      onClick={() => {
        setLoading(true)
        void disconnectWallet()
      }}
      disabled={loading}
    >
      <LogoutIconSvg />
    </button>
  )
}
