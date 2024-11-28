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
      className={clsx('btn', 'bg-white/[0.08]', '!min-w-0', 'hover:bg-white/[0.12]', loading && 'animate-pulse')}
      onClick={() => {
        setLoading(true)
        void disconnectWallet()
      }}
      disabled={loading}
    >
      <LogoutIconSvg className={clsx('text-white')} />
    </button>
  )
}
