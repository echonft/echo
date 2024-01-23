import { linkProvider } from '@echo/api/services/routing/link-provider'
import { LISTING_FILTER_AS_ITEM } from '@echo/firestore/constants/listing/listing-filter-as'
import { getListingsForUser } from '@echo/firestore/crud/listing/get-listings-for-user'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { UserListingsApiProvided } from '@echo/ui/components/user/api-provided/user-listings-api-provided'
import { redirect } from 'next/navigation'

export default async function ({ params: { username } }: NextParams<Record<'username', string>>) {
  const user = await initializeServerComponent({ getAuthUser: true })
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
