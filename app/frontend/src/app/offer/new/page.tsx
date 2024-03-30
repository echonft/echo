import { findNftById } from '@echo/firestore/crud/nft/find-nft-by-id'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextSearchParams } from '@echo/frontend/lib/types/next-search-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { DetailsPaddedContainer } from '@echo/ui/components/base/layout/details-padded-container'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { CreateOfferManager } from '@echo/ui/components/offer/create/create-offer-manager'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import { andThen, assoc, head, identity, is, isNil, juxt, map, pipe, prop, reject, unless } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<
  NextSearchParams<{
    receiverItems?: string[] | string
  }>
>

async function render({ searchParams: { receiverItems }, user }: Params) {
  // Cannot go to that page without previously selected data. Could change in the future
  if (isNilOrEmpty(receiverItems)) {
    notFound()
  }
  const receiverNfts: Nft[] = await pipe<
    [string[] | string],
    string[],
    Promise<Nullable<Nft>>[],
    Promise<Nullable<Nft>[]>,
    Promise<Nft[]>
  >(
    unless(is(Array), juxt([identity])),
    map(findNftById),
    promiseAll,
    andThen<Nullable<Nft>[], Nft[]>(reject(isNil))
  )(receiverItems)
  const receiver = pipe<[Nft[]], Nft, User>(head, prop('owner'))(receiverNfts)
  const senderNfts: SelectableNft[] = await pipe(
    prop('username'),
    getNftsForOwner as (username: string) => Promise<SelectableNft[]>,
    andThen(map<SelectableNft, SelectableNft>(assoc('actionDisabled', true)))
  )(user)

  return (
    <PageLayout user={user}>
      <SectionLayout>
        <DetailsPaddedContainer>
          <CreateOfferManager receiverItems={receiverNfts} receiver={receiver} senderNfts={senderNfts} />
        </DetailsPaddedContainer>
      </SectionLayout>
    </PageLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
