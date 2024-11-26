import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { otherwiseEmptyArray } from '@echo/frontend/lib/helpers/otherwise-empty-array'
import { eqOwnedNftOwner } from '@echo/model/helpers/nft/eq-owned-nft-owner'
import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import type { Nft, OwnedNft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import type { CreateOfferSearchParams } from '@echo/routing/types/frontend/search-params/create-offer-search-params'
import { createOfferSearchParamsTransformSchema } from '@echo/routing/validators/frontend/offer/create-offer-search-params-transform-schema'
import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
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
  is,
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
  searchParams: CreateOfferSearchParams
  user: User
}

async function render({ searchParams, user }: Props) {
  // FIXME Handle single item case, this works for now but is a hack
  const normalizedSearchParams = {
    ...searchParams,
    items: is(String, searchParams.items) ? [searchParams.items] : searchParams.items
  }

  const { items, target } = createOfferSearchParamsTransformSchema.parse(normalizedSearchParams)
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
    <PageLayout>
      <Header />
      <MainSectionLayout>
        <CreateOfferManager
          receiverNfts={receiverNfts}
          receiverNftsSelection={receiverNftsSelection}
          receiver={receiver}
          senderNfts={senderNfts}
          sender={user}
        />
        <CalloutManager />
      </MainSectionLayout>
    </PageLayout>
  )
}

export default withLoggedInUser(render)
