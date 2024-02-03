import type { AuthUser } from '@echo/model/types/auth-user'
import { HeaderLoggedIn, type HeaderLoggedInProps } from '@echo/ui/components/base/header/header-logged-in'
import { HeaderLoggedOut } from '@echo/ui/components/base/header/header-logged-out'
import { HeaderLogoOnly } from '@echo/ui/components/base/header/header-logo-only'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props extends Omit<HeaderLoggedInProps, 'user'> {
  logoOnly: boolean
  user?: Nullable<AuthUser>
}

export const HeaderSwitch: FunctionComponent<Props> = ({ logoOnly, user, ...rest }) => {
  if (logoOnly) {
    return <HeaderLogoOnly />
  }
  if (isNil(user)) {
    return <HeaderLoggedOut />
  }
  return <HeaderLoggedIn user={user} {...rest} />
}
