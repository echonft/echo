import { linkProvider } from '@echo/api/services/routing/link-provider'
import { DiscordIcon } from '@echo/ui/components/base/icons/discord-icon'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { SIZE_SM } from '@echo/ui/constants/size'
import { useSettingsStore } from '@echo/ui/hooks/use-settings-store'
import { useStore } from '@echo/ui/hooks/use-store'
import { clsx } from 'clsx'
import { usePathname } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { concat } from 'ramda'
import { type FunctionComponent, useState } from 'react'

export const ConnectButton: FunctionComponent = () => {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const hasLoggedInOnce = useStore(useSettingsStore, (state) => state.hasLoggedInOnce)
  // If user has never logged in, take them to the login flow
  // TODO move this in a higher-level component that simply renders the right component based on hasLoggedInOnce
  if (!hasLoggedInOnce) {
    return (
      <InternalLink
        path={
          pathname === linkProvider.auth.signIn.get() || pathname === '/'
            ? '/auth/signin'
            : concat('/auth/signin?', new URLSearchParams({ callbackUrl: pathname }).toString())
        }
      >
        <button className={clsx('btn-primary')}>
          <span className={clsx('text-white')}>
            <DiscordIcon size={SIZE_SM} />
          </span>
        </button>
      </InternalLink>
    )
  }
  return (
    <button
      disabled={loading}
      onClick={() => {
        setLoading(true)
        void signIn('discord')
      }}
      className={clsx('btn-primary', 'group', 'py-1.5', 'px-1', loading && 'animate-pulse')}
    >
      <span className={clsx('btn-label-primary')}>
        <DiscordIconSvg />
      </span>
    </button>
  )
}
