import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import type { Nft } from '@echo/model/types/nft'
import type { WithUsername } from '@echo/model/types/with-username'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { disableSelection } from '@echo/ui/helpers/selectable/disable-selection'
import { UserNavigationLayout } from '@echo/ui/pages/user/navigation/user-navigation-layout'
import { UserNfts } from '@echo/ui/pages/user/nfts/user-nfts'
import type { Selectable } from '@echo/ui/types/selectable'
import { always, andThen, map, pipe, when } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<WithUsername>>

async function render({ params: { username }, user }: Params) {
  const isAuthUser = username === user?.username
  const nfts = await pipe(
    getNftsForOwner as (username: string) => Promise<Selectable<Nft>[]>,
    andThen(when<Selectable<Nft>[], Selectable<Nft>[]>(always(isAuthUser), map(disableSelection<Nft>)))
  )(username)

  return (
    <UserNavigationLayout username={username} activeNavigationItem={NAVIGATION_NFTS}>
      <UserNfts nfts={nfts} isAuthUser={isAuthUser} />
    </UserNavigationLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
