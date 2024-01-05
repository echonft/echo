import type { AuthUser } from '@echo/model/types/auth-user'
import { HeaderLoggedIn } from '@echo/ui/components/layout/header/header-logged-in'
import { HeaderLoggedOut } from '@echo/ui/components/layout/header/header-logged-out'
import { HeaderLogoOnly } from '@echo/ui/components/layout/header/header-logo-only'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  transparent: boolean
  logoOnly: boolean
  user?: AuthUser
}

export const HeaderSelector: FunctionComponent<Props> = ({ transparent, logoOnly, user }) => {
  if (logoOnly) {
    return <HeaderLogoOnly absolute={transparent} />
  }
  if (isNil(user)) {
    return <HeaderLoggedOut absolute={transparent} />
  }
  return <HeaderLoggedIn user={user} absolute={transparent} />
}
