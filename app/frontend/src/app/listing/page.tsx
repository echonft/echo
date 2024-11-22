import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { otherwiseEmptyArray } from '@echo/frontend/lib/helpers/otherwise-empty-array'
import { otherwiseUndefined } from '@echo/frontend/lib/helpers/otherwise-undefined'
import { nftIsOwnedBy } from '@echo/model/helpers/nft/nft-is-owned-by'
import type { Nft, OwnedNft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import type { CreateListingSearchParams } from '@echo/routing/types/frontend/search-params/create-listing-search-params'
import { createListingSearchParamsDataSchema } from '@echo/routing/validators/frontend/listing/create-listing-search-params-data-schema'
import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { CreateListingManager } from '@echo/ui/components/listing/create/create-listing-manager'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { promiseAll } from '@echo/utils/helpers/promise-all'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import { andThen, filter, isEmpty, isNil, map, pipe, prop, reject } from 'ramda'

interface Props {
  searchParams: CreateListingSearchParams
  user: User
}

async function render({ searchParams, user }: Props) {
  const { items, target } = createListingSearchParamsDataSchema.parse(searchParams)
  const listingItems = await pipe(
    map(getNftByIndex),
    promiseAll,
    andThen<Nullable<Nft>[], OwnedNft[]>(
      pipe<[Nullable<Nft>[]], Nft[], OwnedNft[]>(reject(isNil), filter(nftIsOwnedBy(user.username)))
    ),
    otherwiseEmptyArray
  )(items)
  const listingTarget = await unlessNil(pipe(getCollection, otherwiseUndefined))(target)
  const creatorNfts = await pipe(prop('username'), getNftsForOwner, otherwiseEmptyArray)(user)
  if (isEmpty(creatorNfts) || (isNilOrEmpty(listingItems) && isNil(listingTarget))) {
    notFound()
  }

  return (
    <PageLayout>
      <Header />
      <MainSectionLayout>
        <NavigationSectionLayout>
          <CreateListingManager creator={user} creatorNfts={creatorNfts} items={listingItems} target={listingTarget} />
        </NavigationSectionLayout>
        <CalloutManager />
      </MainSectionLayout>
    </PageLayout>
  )
}

export default withLoggedInUser(render)
