'use client'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { frontendRouteMatch } from '@echo/routing/helpers/frontend/frontend-route-match'
import type { Path } from '@echo/routing/types/path'
import { AuthUserStatus } from '@echo/ui/constants/auth-user-status'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useAuthUser } from '@echo/ui/hooks/use-auth-user'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { usePathname, useRouter } from 'next/navigation'
import { isNil } from 'ramda'
import { type FunctionComponent, useCallback } from 'react'

export const WalletStatusManager: FunctionComponent = () => {
  const { status } = useAuthUser()
  const router = useRouter()
  const path = usePathname() as Path
  const { disconnectWallet, logout } = useDependencies()
  const onConnect = useCallback(async () => {
    // the only routes for which it is not the case are the login routes and this component is not mounted on them
    if (status === AuthUserStatus.Unauthenticated) {
      await disconnectWallet()
    }
  }, [disconnectWallet, status])
  const onDisconnect = useCallback(async () => {
    if (status === AuthUserStatus.Authenticated) {
      await logout().then(() => {
        const route = frontendRouteMatch(path)
        if (!isNil(route) && route.secure) {
          router.replace(frontendRoutes.base.home.getUrl())
        }
      })
    }
  }, [logout, path, router, status])

  useAccount({
    onConnect,
    onDisconnect
  })

  return null
}
