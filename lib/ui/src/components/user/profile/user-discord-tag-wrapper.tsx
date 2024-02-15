import { linkProvider } from '@echo/api/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { isNil } from 'ramda'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  username?: string
}

export const UserDiscordTagWrapper: FunctionComponent<PropsWithChildren<Props>> = ({ username, children }) => {
  if (isNil(username)) {
    return <>{children}</>
  }
  return <InternalLink path={linkProvider.user.items.get({ username })}>{children}</InternalLink>
}
