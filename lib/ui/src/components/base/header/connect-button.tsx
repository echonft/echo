'use client'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const ConnectButton: FunctionComponent = () => {
  return (
    <InternalLink path={linkProvider.auth.signIn.get()}>
      <button className={clsx('btn-primary', 'group', 'w-[1.875rem]', 'h-[1.875rem]', '!enabled:hover:bg-yellow-500')}>
        <span className={clsx('btn-label-primary')}>
          <DiscordIconSvg />
        </span>
      </button>
    </InternalLink>
  )
}
