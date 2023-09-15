import { UserListingsSkeleton } from '@echo/ui/components/user/listing/skeleton/user-listings-skeleton'
import type { FunctionComponent } from 'react'

const UserListingsLoading: FunctionComponent = () => {
  return <UserListingsSkeleton />
}

export default UserListingsLoading
