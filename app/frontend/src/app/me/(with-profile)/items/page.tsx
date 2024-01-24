import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import { ProfileNftsApiProvided } from '@echo/ui/components/profile/api-provided/profile-nfts-api-provided'
import { RouteChangesProvider } from 'nextjs-router-events'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render({ user }: NextAuthUserParams) {
  const nfts = await getNftsForOwner(user.username, {
    orderBy: [{ field: 'tokenId', direction: 'asc' }]
  })
  return (
    <RouteChangesProvider>
      <ProfileNftsApiProvided nfts={nfts} user={user} />
    </RouteChangesProvider>
  )
}

export default pipe(withLocale<NextAuthUserParams, Promise<ReactElement>>, withUser)(render)
