import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { getNftIndexFromQueryParam } from '@echo/frontend/lib/helpers/nft/get-nft-index-from-query-param'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import type { WithSearchParamsProps } from '@echo/frontend/lib/types/with-search-params-props'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { User } from '@echo/model/types/user'
import { PaddedSectionLayout } from '@echo/ui/components/base/layout/padded-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { CreateOfferManager } from '@echo/ui/components/offer/create/create-offer-manager'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import {
  andThen,
  equals,
  filter,
  head,
  identity,
  is,
  isNil,
  juxt,
  map,
  path,
  pathSatisfies,
  pipe,
  prop,
  reject,
  unless
} from 'ramda'

async function render({
  searchParams: { receiverItems },
  user
}: PropsWithUser<
  WithSearchParamsProps<{
    receiverItems?: string[] | string
  }>
>) {
  // Cannot go to that page without previously selected data
  if (isNilOrEmpty(receiverItems)) {
    notFound()
  }
  const receiverNfts = await unlessNil(
    pipe<[string[] | string], string[], NftIndex[], Promise<Nullable<Nft>>[], Promise<Nullable<Nft>[]>, Promise<Nft[]>>(
      unless(is(Array), juxt([identity])),
      map(getNftIndexFromQueryParam),
      map(getNftByIndex),
      promiseAll,
      andThen<Nullable<Nft>[], Nft[]>(reject(isNil))
    )
  )(receiverItems)
  if (isNilOrEmpty(receiverNfts)) {
    notFound()
  }
  const receiver = pipe<[Nft[]], Nft, User>(head, prop('owner'))(receiverNfts)
  const receiverChain = pipe(
    head,
    nonNullableReturn(path<ChainName>(['collection', 'contract', 'chain']))
  )(receiverNfts)
  const senderNfts: Nft[] = await pipe(
    prop('username'),
    getNftsForOwner as (username: string) => Promise<Nft[]>,
    andThen(filter(pathSatisfies(equals(receiverChain), ['collection', 'contract', 'chain'])))
  )(user)
  if (isNilOrEmpty(senderNfts)) {
    notFound()
  }

  return (
    <PageLayout user={user}>
      <PaddedSectionLayout>
        <CreateOfferManager receiverItems={receiverNfts} receiver={receiver} senderNfts={senderNfts} />
      </PaddedSectionLayout>
    </PageLayout>
  )
}

export default withUser(render)
