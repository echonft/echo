import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import type { WithUsername } from '@echo/model/types/with-username'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { UserNavigationLayout } from '@echo/ui/pages/user/navigation/user-navigation-layout'
import { UserNfts } from '@echo/ui/pages/user/nfts/user-nfts'

async function render({ params: { username }, user }: PropsWithUser<NextParams<WithUsername>>) {
  const isAuthUser = username === user?.username
  const nfts = await getNftsForOwner(username)

  return (
    <UserNavigationLayout username={username} activeNavigationItem={NAVIGATION_NFTS}>
      <UserNfts nfts={nfts} isAuthUser={isAuthUser} />
    </UserNavigationLayout>
  )
}

export default withUser(render)
