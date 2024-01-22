import { linkProvider } from '@echo/api/services/routing/link-provider'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getAuthUser } from '@echo/frontend/lib/auth/get-auth-user'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/auth/redirect-if-not-logged-in'
import { withFirebase } from '@echo/frontend/lib/hoc/with-firebase'
import { ProfileNftsApiProvided } from '@echo/ui/components/profile/api-provided/profile-nfts-api-provided'
import { unstable_setRequestLocale } from 'next-intl/server'
import { RouteChangesProvider } from 'nextjs-router-events'
import { type FunctionComponent } from 'react'

const ProfileNftsPage: FunctionComponent = async () => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
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

export default withFirebase(ProfileNftsPage)
