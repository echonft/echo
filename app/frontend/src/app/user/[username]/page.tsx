import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getPendingOffersForUser } from '@echo/firestore/crud/offer/get-pending-offers-for-user'
import { getSwapsForUser } from '@echo/firestore/crud/swap/get-swaps-for-user'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getUserOffersCount } from '@echo/firestore/crud/user/get-user-offers-count'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { toListingsWithRole } from '@echo/frontend/lib/helpers/listing/to-listings-with-role'
import { toOffersWithRole } from '@echo/frontend/lib/helpers/offer/to-offers-with-role'
import { otherwiseEmptyArray } from '@echo/frontend/lib/helpers/otherwise-empty-array'
import { otherwiseUndefined } from '@echo/frontend/lib/helpers/otherwise-undefined'
import { toSwapsWithRole } from '@echo/frontend/lib/helpers/swap/to-swaps-with-role'
import type { User } from '@echo/model/types/user'
import { UserPage } from '@echo/ui/pages/user/user-page'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import { always, andThen, isNil, otherwise, pipe } from 'ramda'

interface Props {
  params: {
    username: string
  }
  user: Nullable<User>
}

async function render({ params: { username }, user: authUser }: Props) {
  const user = await pipe(getUserByUsername, otherwiseUndefined)(username)
  if (isNil(user)) {
    notFound()
  }
  const isAuthUser = username === authUser?.username
  const nfts = await pipe(getNftsForOwner, otherwiseEmptyArray)(username)
  const listings = await pipe(
    getListingsForCreator,
    andThen(toListingsWithRole(authUser)),
    otherwiseEmptyArray
  )(username)
  const offers = await pipe(getPendingOffersForUser, andThen(toOffersWithRole(authUser)), otherwiseEmptyArray)(username)
  const offersCount = await pipe(getUserOffersCount, otherwise(pipe(captureAndLogError, always(0))))(username)
  const swaps = await pipe(getSwapsForUser, andThen(toSwapsWithRole(user)), otherwiseEmptyArray)(username)

  return (
    <UserPage
      isAuthUser={isAuthUser}
      counts={{
        listingsCount: listings.length,
        nftsCount: nfts.length,
        offersCount,
        swapsCount: swaps.length
      }}
      listings={listings}
      nfts={nfts}
      offers={offers}
      swaps={swaps}
      user={user}
    />
  )
}

export default withUser(render)
