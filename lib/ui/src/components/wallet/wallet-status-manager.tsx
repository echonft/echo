'use client'
import type { User } from '@echo/model/types/user'
import type { Path } from '@echo/routing/types/path'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import type { Nullable } from '@echo/utils/types/nullable'
import { usePathname } from 'next/navigation'
import { isNil } from 'ramda'
import { type FunctionComponent, useCallback } from 'react'

interface Props {
  user: Nullable<User>
}

export const WalletStatusManager: FunctionComponent<Props> = ({ user }) => {
  const path = usePathname() as Path
  const { disconnectWallet, logout } = useDependencies()
  const onConnect = useCallback(async () => {
    // the only routes for which it is not the case are the login routes and this component is not mounted on them
    if (isNil(user)) {
      await disconnectWallet()
    }
  }, [disconnectWallet, user])
  const onDisconnect = useCallback(async () => {
    if (!isNil(user)) {
      await logout(path)
    }
  }, [logout, path, user])

  useAccount({
    onConnect,
    onDisconnect
  })

  return null
}
