import type { User } from '@echo/model/types/user/user'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import type { FunctionComponent } from 'react'

interface Props {
  creator: User
  show?: boolean
}

export const ListingDetailsCreator: FunctionComponent<Props> = ({ creator, show }) => {
  if (show) {
    return <UserDetails user={creator} />
  }
  return null
}
