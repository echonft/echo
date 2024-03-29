import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import type { WithUsername } from '@echo/model/types/with-username'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import { disableAction } from '@echo/ui/helpers/nft/disable-action'
import { disableSelection } from '@echo/ui/helpers/selectable/disable-selection'
import { UserNavigationLayout } from '@echo/ui/pages/user/navigation/user-navigation-layout'
import { UserNfts } from '@echo/ui/pages/user/nfts/user-nfts'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { always, andThen, assoc, ifElse, map, pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<WithUsername>>
async function render({ params: { username }, user }: Params) {
  const isAuthUser = username === user?.username
  const nfts: SelectableNft[] = await pipe(
    getNftsForOwner as (username: string) => Promise<SelectableNft[]>,
    andThen(
      ifElse(
        always(isAuthUser),
        map(pipe(disableSelection, disableAction)),
        map<SelectableNft, SelectableNft>(assoc('action', NFT_ACTION_OFFER))
      )
    )
  )(username)
  return (
    <UserNavigationLayout username={username} activeNavigationItem={NAVIGATION_NFTS}>
      <UserNfts nfts={nfts} />
    </UserNavigationLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
