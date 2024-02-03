import type { UserProfile } from '@echo/model/types/user-profile'
import { UserDetailsSkeleton } from '@echo/ui/components/user/details/skeleton/user-details-skeleton'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  profile: Nullable<UserProfile>
}

export const ProfileDetails: FunctionComponent<Props> = ({ profile }) => {
  if (isNil(profile)) {
    return <UserDetailsSkeleton />
  }
  return <UserDetails profile={profile} />
}
