import { linkProvider } from '@echo/api/services/routing/link-provider'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/auth/redirect-if-not-logged-in'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { ProfileNftsApiProvided } from '@echo/ui/components/profile/api-provided/profile-nfts-api-provided'
import { RouteChangesProvider } from 'nextjs-router-events'

async function render() {
  const user = await initializeServerComponent({ getAuthUser: true })
  redirectIfNotLoggedIn(user, linkProvider.profile.items.getUrl())
  const nfts = await getNftsForOwner(user.username, {
    orderBy: [{ field: 'tokenId', direction: 'asc' }]
  })
  return (
    <RouteChangesProvider>
      <ProfileNftsApiProvided nfts={nfts} user={user} />
    </RouteChangesProvider>
  )
}

export default withLocale(render)
