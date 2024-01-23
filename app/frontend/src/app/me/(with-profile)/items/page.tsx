import { linkProvider } from '@echo/api/services/routing/link-provider'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/auth/redirect-if-not-logged-in'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { ProfileNftsApiProvided } from '@echo/ui/components/profile/api-provided/profile-nfts-api-provided'
import { RouteChangesProvider } from 'nextjs-router-events'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render({ user }: NextUserParams) {
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

export default pipe(withLocale<NextUserParams, Promise<ReactElement>>, withUser)(render)
