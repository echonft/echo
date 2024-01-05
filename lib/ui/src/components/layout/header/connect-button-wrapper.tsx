'use client'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { ConnectButton } from '@echo/ui/components/layout/header/connect-button'
import { useSettingsStore } from '@echo/ui/hooks/use-settings-store'
import { useStore } from '@echo/ui/hooks/use-store'
import { usePathname } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { concat, isNil } from 'ramda'
import { type FunctionComponent, useState } from 'react'

export const ConnectButtonWrapper: FunctionComponent = () => {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const hasLoggedInOnce = useStore(useSettingsStore, (state) => state.hasLoggedInOnce)
  // We need to wait to have the value
  if (isNil(hasLoggedInOnce)) {
    return <ConnectButton loading={true} />
  }
  // If user has never logged in, take them to the login flow
  if (!hasLoggedInOnce) {
    return (
      <InternalLink
        path={
          pathname === linkProvider.auth.signIn.get() || pathname === '/'
            ? '/auth/signin'
            : concat('/auth/signin?', new URLSearchParams({ callbackUrl: pathname }).toString())
        }
      >
        <ConnectButton />
      </InternalLink>
    )
  }
  return (
    <ConnectButton
      loading={loading}
      onClick={() => {
        setLoading(true)
        void signIn('discord')
      }}
    />
  )
}
