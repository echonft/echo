import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { getPendingListingsForUser } from '@echo/firestore/crud/listing/get-pending-listings-for-user'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import { getSwapsForUser } from '@echo/firestore/crud/swap/get-swaps-for-user'
import { getUserOffersCount } from '@echo/firestore/crud/user/get-user-offers-count'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { toListingsWithRole } from '@echo/frontend/lib/helpers/listing/to-listings-with-role'
import { toOffersWithRole } from '@echo/frontend/lib/helpers/offer/to-offers-with-role'
import { otherwiseEmptyArray } from '@echo/frontend/lib/helpers/otherwise-empty-array'
import { toSwapsWithRole } from '@echo/frontend/lib/helpers/swap/to-swaps-with-role'
import type { User } from '@echo/model/types/user'
import type { SwapDetailsSearchParams } from '@echo/routing/types/frontend/search-params/swap-details-search-params'
import { swapDetailsSearchParamsTransformSchema } from '@echo/routing/validators/frontend/swap/swap-details-search-params-transform-schema'
import { ProfilePage } from '@echo/ui/pages/profile/profile-page'
import { always, andThen, otherwise, pipe, prop } from 'ramda'

interface Props {
  user: User
  searchParams?: SwapDetailsSearchParams
}

async function render({ user, searchParams }: Props) {
  const nfts = await pipe(prop('username'), getNftsForOwner, otherwiseEmptyArray)(user)
  const listings = await pipe(
    prop('username'),
    getListingsForCreator,
    andThen(toListingsWithRole(user)),
    otherwiseEmptyArray
  )(user)
  const pendingListings = await pipe(
    prop('username'),
    getPendingListingsForUser,
    andThen(toListingsWithRole(user)),
    otherwiseEmptyArray
  )(user)
  const offers = await pipe(
    prop('username'),
    getOffersForUser,
    andThen(toOffersWithRole(user)),
    otherwiseEmptyArray
  )(user)
  const offersCount = await pipe(prop('username'), getUserOffersCount, otherwise(always(0)))(user)
  const swaps = await pipe(prop('username'), getSwapsForUser, andThen(toSwapsWithRole(user)), otherwiseEmptyArray)(user)
  const selection = swapDetailsSearchParamsTransformSchema.parse({ swaps, searchParams })

  return (
    <ProfilePage
      counts={{
        listingsCount: listings.length,
        nftsCount: nfts.length,
        offersCount: offersCount,
        swapsCount: swaps.length
      }}
      listings={listings}
      nfts={nfts}
      offers={offers}
      pendingListings={pendingListings}
      swaps={swaps}
      user={user}
      selection={selection}
    />
  )
}

export default withLoggedInUser(render)
