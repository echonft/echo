import { linkProvider } from '@echo/api/services/routing/link-provider'
import type { CardDiscordTagProps } from '@echo/ui/components/base/card/card-discord-tag'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const CardDiscordTagWrapper: FunctionComponent<PropsWithChildren<CardDiscordTagProps>> = ({
  username,
  asLink,
  children
}) => {
  if (asLink) {
    return <InternalLink path={linkProvider.user.items.get({ username })}>{children}</InternalLink>
  }
  return <>{children}</>
}
