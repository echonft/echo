import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { eqOwnedNftOwner } from '@echo/model/helpers/nft/eq-owned-nft-owner'
import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import type { Nft } from '@echo/model/types/nft'
import type { OwnedNft } from '@echo/model/types/owned-nft'
import type { Slug } from '@echo/model/types/slug'
import type { User } from '@echo/model/types/user'
import { getNftIndexFromSearchParam } from '@echo/routing/search-params/get-nft-index-from-search-param'
import { CreateOfferManager } from '@echo/ui/components/offer/create/create-offer-manager'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { isNonEmptyArray } from '@echo/utils/helpers/is-non-empty-array'
import { promiseAll } from '@echo/utils/helpers/promise-all'
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

interface Props {
  searchParams: {
    items: string[] | string
    target?: Slug
  }
  user: User
}

async function render({ searchParams: { items, target }, user }: Props) {
  // Cannot go to that page without previously selected data
  if (isNilOrEmpty(items)) {
    notFound()
  }
  const receiverNftsSelection = await pipe(
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
  if (!isNonEmptyArray(receiverNftsSelection)) {
    notFound()
  }
  const receiver = pipe(head, prop('owner')<OwnedNft>)(receiverNftsSelection)
  const receiverChain = pipe(head, path(['collection', 'contract', 'chain']))(receiverNftsSelection)
  const receiverNfts = await pipe(
    prop('username'),
    getNftsForOwner,
    andThen(filter(pathSatisfies(equals(receiverChain), ['collection', 'contract', 'chain']))),
    otherwise(pipe(captureAndLogError, always([])))
  )(receiver)
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
    <CreateOfferManager
      receiverNfts={receiverNfts}
      receiverNftsSelection={receiverNftsSelection}
      receiver={receiver}
      senderNfts={senderNfts}
      sender={user}
    />
  )
}

export default withLoggedInUser(render)
