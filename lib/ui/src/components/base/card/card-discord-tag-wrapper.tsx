import { pathProvider } from '@echo/routing/path/path-provider'
import type { CardDiscordTagProps } from '@echo/ui/components/base/card/card-discord-tag'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const CardDiscordTagWrapper: FunctionComponent<PropsWithChildren<CardDiscordTagProps>> = ({
  username,
  asLink,
  children
}) => {
  if (asLink) {
    return (
      <InternalLink
        path={pathProvider.user.default.get({ username })}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        {children}
      </InternalLink>
    )
  }
  return <>{children}</>
}
