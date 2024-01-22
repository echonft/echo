import { linkProvider } from '@echo/api/services/routing/link-provider'
import { LISTING_FILTER_AS_ITEM } from '@echo/firestore/constants/listing/listing-filter-as'
import { getListingsForUser } from '@echo/firestore/crud/listing/get-listings-for-user'
import { getAuthUser } from '@echo/frontend/lib/auth/get-auth-user'
import { withFirebase } from '@echo/frontend/lib/hoc/with-firebase'
import { UserListingsApiProvided } from '@echo/ui/components/user/api-provided/user-listings-api-provided'
import { redirect } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserListingsPage: FunctionComponent<Props> = async ({ params: { username } }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  if (user?.username === username) {
    redirect(linkProvider.profile.listingsCreated.get())
  }
  const listings = await getListingsForUser(
    username,
    { as: LISTING_FILTER_AS_ITEM },
    {
      orderBy: [{ field: 'expiresAt', direction: 'desc' }]
    }
  )
  return <UserListingsApiProvided username={username} listings={listings} />
}

export default withFirebase(UserListingsPage)
