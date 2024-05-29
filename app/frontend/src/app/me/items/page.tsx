import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import type { Nft } from '@echo/model/types/nft'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { NFT_ACTION_LISTING } from '@echo/ui/constants/nft-actions'
import { ProfileNavigationLayout } from '@echo/ui/pages/profile/navigation/profile-navigation-layout'
import { ProfileNfts } from '@echo/ui/pages/profile/nfts/profile-nfts'
import type { Selectable } from '@echo/ui/types/selectable'
import { andThen, assoc, map, pipe, prop } from 'ramda'
import type { ReactElement } from 'react'

async function render({ user }: NextAuthUserParams) {
  const nfts: Nft[] = await pipe(
    prop('username'),
    getNftsForOwner as (username: string) => Promise<Nft[]>,
    andThen(map<Nft, Nft>(assoc('action', NFT_ACTION_LISTING)))
  )(user)
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_NFTS}>
      <ProfileNfts nfts={nfts} />
    </ProfileNavigationLayout>
  )
}

export default pipe(withLocale<NextAuthUserParams, Promise<ReactElement>>, withUser)(render)
