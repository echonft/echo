import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { otherwiseEmptyArray } from '@echo/frontend/lib/helpers/otherwise-empty-array'
import { eqOwnedNftOwner } from '@echo/model/helpers/nft/eq-owned-nft-owner'
import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import type { Nft, OwnedNft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import type { OfferSearchParams } from '@echo/routing/types/frontend/search-params/offer-search-params'
import { offerSearchParamsDataSchema } from '@echo/routing/validators/frontend/offer/offer-search-params-data-schema'
import { CreateOfferManager } from '@echo/ui/components/offer/create/create-offer-manager'
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
  isNil,
  map,
  otherwise,
  pathSatisfies,
  pipe,
  prop,
  reject,
  unless
} from 'ramda'

interface Props {
  searchParams: OfferSearchParams
  user: User
}

async function render({ searchParams, user }: Props) {
  const { items, target } = offerSearchParamsDataSchema.parse(searchParams)
  const receiverNftsSelection = await pipe(
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
    otherwiseEmptyArray
  )(items)
  if (!isNonEmptyArray(receiverNftsSelection)) {
    notFound()
  }
  const receiver = pipe(head, prop('owner')<OwnedNft>)(receiverNftsSelection)
  const receiverNfts = await pipe(prop('username'), getNftsForOwner, otherwiseEmptyArray)(receiver)
  const senderNfts = await pipe(
    prop('username'),
    getNftsForOwner,
    andThen(
      unless<OwnedNft[], OwnedNft[]>(
        always(isNil(target)),
        filter(pathSatisfies(equals(target), ['collection', 'slug']))
      )
    ),
    otherwise<OwnedNft[]>(pipe(captureAndLogError, always([])))
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
      sender={user as User & Required<Pick<User, 'wallet'>>} // TODO gatekeep route with connected wallet
    />
  )
}

export default withLoggedInUser(render)
