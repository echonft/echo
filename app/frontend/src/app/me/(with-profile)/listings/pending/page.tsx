import { linkProvider } from '@echo/api/services/routing/link-provider'
import { LISTING_FILTER_AS_TARGET } from '@echo/firestore/constants/listing/listing-filter-as'
import { getListingsForUser } from '@echo/firestore/crud/listing/get-listings-for-user'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/auth/redirect-if-not-logged-in'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import { ProfileListingsReceivedApiProvided } from '@echo/ui/components/profile/api-provided/profile-listings-received-api-provided'

async function render() {
  const user = await initializeServerComponent({ getAuthUser: true })
  redirectIfNotLoggedIn(user, linkProvider.profile.listingsReceived.getUrl())
  const listings = await getListingsForUser(
    user.username,
    {
      as: LISTING_FILTER_AS_TARGET,
      notState: READ_ONLY_LISTING_STATES
    },
    {
      // creator.username is needed for the query to work - do not remove
      orderBy: [
        { field: 'creator.username', direction: 'asc' },
        { field: 'expiresAt', direction: 'desc' }
      ]
    }
  )
  return <ProfileListingsReceivedApiProvided listings={listings} />
}

export default withLocale(render)
