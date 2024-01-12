import { UserListingsSkeleton } from '@echo/ui/components/user/listing/skeleton/user-listings-skeleton'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const UserListingsLoading: FunctionComponent = () => {
  unstable_setRequestLocale('en')
  return <UserListingsSkeleton />
}

export default UserListingsLoading
