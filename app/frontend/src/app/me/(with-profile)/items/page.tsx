import { linkProvider } from '@echo/api/services/routing/link-provider'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/auth/redirect-if-not-logged-in'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { ProfileNftsApiProvided } from '@echo/ui/components/profile/api-provided/profile-nfts-api-provided'
import { RouteChangesProvider } from 'nextjs-router-events'

export default async function () {
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
