import { linkProvider } from '@echo/api/routing/link-provider'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { UserNavigationLayout } from '@echo/ui/pages/user/navigation/user-navigation-layout'
import { UserNfts } from '@echo/ui/pages/user/nfts/user-nfts'
import { redirect } from 'next/navigation'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<Record<'username', string>>>
async function render({ params: { username }, user }: Params) {
  if (user?.username === username) {
    redirect(linkProvider.profile.items.get())
  }
  const nfts = await getNftsForOwner(username)
  return (
    <UserNavigationLayout username={username} activeNavigationItem={NAVIGATION_NFTS}>
      <UserNfts nfts={nfts} />
    </UserNavigationLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
