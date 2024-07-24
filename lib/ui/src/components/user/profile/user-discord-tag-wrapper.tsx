import { pathProvider } from '@echo/api/routing/path-provider'
import type { Username } from '@echo/model/types/username'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { isNil } from 'ramda'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  username?: Username
}

export const UserDiscordTagWrapper: FunctionComponent<PropsWithChildren<Props>> = ({ username, children }) => {
  if (isNil(username)) {
    return <>{children}</>
  }
  return <InternalLink path={pathProvider.user.default.get({ username })}>{children}</InternalLink>
}
