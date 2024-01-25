import { type AuthUser } from '@echo/model/types/auth-user'
import type { UserProfile } from '@echo/model/types/user-profile'
import { UserDetailsSkeleton } from '@echo/ui/components/user/details/skeleton/user-details-skeleton'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { assoc, isNil, when } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  user: AuthUser | undefined
}

export const ProfileDetails: FunctionComponent<Props> = ({ user }) => {
  if (isNil(user)) {
    return <UserDetailsSkeleton />
  }
  // TODO remove this conversion when wallets are removed from AuthUser
  const userProfile = when(propIsNil('wallets'), assoc('wallets', []))(user) as UserProfile
  return <UserDetails user={userProfile} />
}
