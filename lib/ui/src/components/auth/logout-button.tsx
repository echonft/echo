'use client'
import type { Path } from '@echo/routing/types/path'
import { LogoutIconSvg } from '@echo/ui/components/base/svg/logout-icon-svg'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { clsx } from 'clsx'
import { usePathname } from 'next/navigation'
import { type FunctionComponent, useState } from 'react'

export const LogoutButton: FunctionComponent = () => {
  const { logout } = useDependencies()
  const path = usePathname()
  const [loading, setLoading] = useState(false)
  return (
    <button
      className={clsx('btn-auth-alt', loading && 'animate-pulse')}
      onClick={() => {
        setLoading(true)
        void logout(path as Path)
      }}
      disabled={loading}
    >
      <LogoutIconSvg />
    </button>
  )
}
