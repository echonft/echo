import type { AuthUser } from '@echo/model/types/auth-user'
import type { DisconnectButtonProps } from '@echo/ui/components/layout/header/disconnect-button'
import { HeaderLoggedIn } from '@echo/ui/components/layout/header/header-logged-in'
import { HeaderLoggedOut } from '@echo/ui/components/layout/header/header-logged-out'
import { HeaderLogoOnly } from '@echo/ui/components/layout/header/header-logo-only'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props extends Omit<DisconnectButtonProps, 'user'> {
  transparent: boolean
  logoOnly: boolean
  user?: AuthUser
}

export const HeaderSelector: FunctionComponent<Props> = ({ logoOnly, transparent, user, ...rest }) => {
  if (logoOnly) {
    return <HeaderLogoOnly absolute={transparent} />
  }
  if (isNil(user)) {
    return <HeaderLoggedOut absolute={transparent} />
  }
  return <HeaderLoggedIn user={user} absolute={transparent} {...rest} />
}
