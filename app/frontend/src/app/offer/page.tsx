import type { PropsWithAuthUser } from '@echo/auth/types/props-with-auth-user'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import type { WithSearchParamsProps } from '@echo/frontend/lib/types/with-search-params-props'
import { eqOwnedNftOwner } from '@echo/model/helpers/nft/eq-owned-nft-owner'
import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import type { Nft } from '@echo/model/types/nft/nft'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { User } from '@echo/model/types/user/user'
import { getNftIndexFromSearchParam } from '@echo/routing/search-params/get-nft-index-from-search-param'
import type { OfferSearchParams } from '@echo/routing/types/search-params/offer-search-params'
import { PageLayoutBackgroundPicker } from '@echo/ui/components/base/layout/page-layout-background-picker'
import { CreateOfferManager } from '@echo/ui/components/offer/create/create-offer-manager'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import {
  always,
  andThen,
  equals,
  filter,
  groupWith,
  head,
  identity,
  is,
  isNil,
  juxt,
  map,
  otherwise,
  path,
  pathSatisfies,
  pipe,
  prop,
  reject,
  unless
} from 'ramda'

async function render({
  searchParams: { items, target },
  user
}: PropsWithAuthUser<WithSearchParamsProps<OfferSearchParams>>) {
  // Cannot go to that page without previously selected data
  if (isNilOrEmpty(items)) {
    notFound()
  }
  const receiverNfts = await pipe(
    unless(is(Array), juxt([identity])),
    map(getNftIndexFromSearchParam),
    map(getNftByIndex),
    promiseAll,
    andThen<Nullable<Nft>[], OwnedNft[]>(
      pipe<[Nullable<Nft>[]], Nft[], OwnedNft[], OwnedNft[][], OwnedNft[]>(
        reject(isNil),
        filter(isOwnedNft),
        // only keep the NFTs that have the same owner
        groupWith<OwnedNft>(eqOwnedNftOwner),
        head
      )
    ),
    otherwise(pipe(captureAndLogError, always([])))
  )(items)
  if (!isNonEmptyArray(receiverNfts)) {
    notFound()
  }
  const receiver = pipe<[OwnedNft[]], OwnedNft, User>(head, prop('owner'))(receiverNfts)
  const receiverChain = pipe(head, path(['collection', 'contract', 'chain']))(receiverNfts)
  const senderNfts = await pipe(
    prop('username'),
    getNftsForOwner,
    andThen(
      pipe(
        filter(pathSatisfies(equals(receiverChain), ['collection', 'contract', 'chain'])),
        unless<OwnedNft[], OwnedNft[]>(
          always(isNil(target)),
          filter(pathSatisfies(equals(target), ['collection', 'slug']))
        )
      )
    ),
    otherwise(pipe(captureAndLogError, always([])))
  )(user)
  if (!isNonEmptyArray(senderNfts)) {
    notFound()
  }

  return (
    <PageLayoutBackgroundPicker user={user} layout={'padded'}>
      <CreateOfferManager receiverItems={receiverNfts} receiver={receiver} senderNfts={senderNfts} />
    </PageLayoutBackgroundPicker>
  )
}

export default withLoggedInUser(render)
