import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  username: string
  asLink?: boolean
}

export const CardDiscordTagWrapper: FunctionComponent<PropsWithChildren<Props>> = ({ username, asLink, children }) => {
  if (asLink) {
    return (
      <InternalLink
        path={frontendRoutes.user.details.get({ username })}
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
