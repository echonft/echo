import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import type { WithAuthUserProps } from '@echo/frontend/lib/types/with-auth-user-props'
import type { Nft } from '@echo/model/types/nft'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { ProfileNavigationLayout } from '@echo/ui/pages/profile/navigation/profile-navigation-layout'
import { ProfileNfts } from '@echo/ui/pages/profile/nfts/profile-nfts'
import { always, otherwise, pipe, prop } from 'ramda'

async function render({ user }: WithAuthUserProps) {
  const nfts: Nft[] = await pipe(
    prop('username'),
    getNftsForOwner,
    otherwise(pipe(captureAndLogError, always([])))
  )(user)
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_NFTS}>
      <ProfileNfts nfts={nfts} />
    </ProfileNavigationLayout>
  )
}

export default withLoggedInUser(render)
