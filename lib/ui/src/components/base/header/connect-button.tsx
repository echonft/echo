'use client'
import { linkProvider } from '@echo/api/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent } from 'react'

export const ConnectButton: FunctionComponent = () => {
  return (
    <InternalLink path={linkProvider.auth.signIn.get()}>
      <button
        className={classes('btn-primary', 'group', 'w-[1.875rem]', 'h-[1.875rem]', '!enabled:hover:bg-yellow-500')}
      >
        <span className={classes('btn-label-primary')}>
          <DiscordIconSvg />
        </span>
      </button>
    </InternalLink>
  )
}
