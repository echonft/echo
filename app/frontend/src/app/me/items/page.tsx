import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import { getNftsForOwner } from '@echo/helius/services/get-nfts-for-owner'
import type { User } from '@echo/model/types/user'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { NFT_ACTION_LISTING } from '@echo/ui/constants/nft-actions'
import { ProfileNavigationLayout } from '@echo/ui/pages/profile/navigation/profile-navigation-layout'
import { ProfileNfts } from '@echo/ui/pages/profile/nfts/profile-nfts'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { andThen, assoc, map, pipe, prop } from 'ramda'
import type { ReactElement } from 'react'

async function render({ user }: NextAuthUserParams) {
  const nfts: SelectableNft[] = await pipe(
    prop('username'),
    getNftsForOwner as (username: string) => Promise<SelectableNft[]>,
    andThen(map<SelectableNft, SelectableNft>(assoc('action', NFT_ACTION_LISTING)))
  )(user)

  // TODO This doesnt belong here
  const solanaNfts = await getNftsForOwner(user as unknown as User).then(
    map<SelectableNft, SelectableNft>(assoc('action', NFT_ACTION_LISTING))
  )
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_NFTS}>
      <ProfileNfts nfts={solanaNfts.concat(nfts)} />
    </ProfileNavigationLayout>
  )
}

export default pipe(withLocale<NextAuthUserParams, Promise<ReactElement>>, withUser)(render)
