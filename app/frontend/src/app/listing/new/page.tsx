import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { getNftIndexFromQueryParam } from '@echo/frontend/lib/helpers/nft/get-nft-index-from-query-param'
import type { NextSearchParams } from '@echo/frontend/lib/types/next-search-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import { PaddedSectionLayout } from '@echo/ui/components/base/layout/padded-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { CreateListingManager } from '@echo/ui/components/listing/create/create-listing-manager'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import {
  andThen,
  equals,
  filter,
  identity,
  is,
  isEmpty,
  isNil,
  juxt,
  map,
  pathSatisfies,
  pipe,
  prop,
  reject,
  unless
} from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<
  NextSearchParams<{
    items?: string[] | string
    target?: string
  }>
>

async function render({ searchParams: { items, target }, user }: Params) {
  // Cannot go to that page without previously selected data
  if (isNilOrEmpty(items) && isNilOrEmpty(target)) {
    notFound()
  }

  const listingItems = await unlessNil(
    pipe<[string[] | string], string[], NftIndex[], Promise<Nullable<Nft>>[], Promise<Nullable<Nft>[]>, Promise<Nft[]>>(
      unless(is(Array), juxt([identity])),
      map(getNftIndexFromQueryParam),
      map(getNftByIndex),
      promiseAll,
      andThen<Nullable<Nft>[], Nft[]>(reject(isNil))
    )
  )(items)
  const listingTarget = await unlessNil(getCollection)(target)
  if (isNil(listingTarget)) {
    notFound()
  }

  const creatorNfts: Nft[] = await pipe(
    prop('username'),
    getNftsForOwner as (username: string) => Promise<Nft[]>,
    andThen(filter(pathSatisfies(equals(listingTarget.contract.chain), ['collection', 'contract', 'chain'])))
  )(user)
  if (isEmpty(listingItems) && isEmpty(creatorNfts)) {
    notFound()
  }

  return (
    <PageLayout user={user}>
      <PaddedSectionLayout>
        <CreateListingManager creatorNfts={creatorNfts} items={listingItems} target={listingTarget} />
      </PaddedSectionLayout>
    </PageLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
