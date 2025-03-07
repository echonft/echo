import { ListingState } from '@echo/model/constants/listing-state'
import { listingItems } from '@echo/model/helpers/listing/listing-items'
import type { NftItem } from '@echo/model/types/item'
import type { Listing } from '@echo/model/types/listing'
import { Banner } from '@echo/ui/components/base/banner'
import { ListingDetailsStateLabel } from '@echo/ui/components/listing/details/listing-details-state-label'
import { TradeDetailsStateDetailsLayout } from '@echo/ui/components/trade/details/layout/trade-details-state-details-layout'
import { TradeDetailsStateExpiration } from '@echo/ui/components/trade/details/trade-details-state-expiration'
import { TradeDetailsStateSeparator } from '@echo/ui/components/trade/details/trade-details-state-separator'
import { Alignment } from '@echo/ui/constants/alignments'
import { useComponentWidth } from '@echo/ui/hooks/use-component-width'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { head, type NonEmptyArray, path, pipe } from 'ramda'
import { forwardRef, type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  listing: Listing
}

const ListingDetailsStateLayout = forwardRef<HTMLDivElement, PropsWithChildren>(({ children }, ref) => {
  return (
    <div className={clsx('relative', 'w-full', 'h-max', 'pt-5', 'pb-24', 'px-8')} ref={ref}>
      {children}
    </div>
  )
})
ListingDetailsStateLayout.displayName = ListingDetailsStateLayout.name

const ListingDetailsInner: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx('flex', 'justify-center', 'items-center', 'w-full', 'h-full', 'relative', 'z-2')}>
      {children}
    </div>
  )
}

export const ListingDetailsState: FunctionComponent<Props> = ({ listing }) => {
  const { ref, width } = useComponentWidth<HTMLDivElement>()
  const { state, locked } = listing
  const url = pipe<[Listing], NonEmptyArray<NftItem>, NftItem, Nullable<string>>(
    listingItems,
    head,
    path<NftItem, 'token', 'pictureUrl'>(['token', 'pictureUrl'])
  )(listing)

  if (state === ListingState.Expired) {
    return (
      <ListingDetailsStateLayout ref={ref}>
        <Banner src={url} width={width} />
        <ListingDetailsInner>
          <TradeDetailsStateExpiration trade={listing} />
        </ListingDetailsInner>
      </ListingDetailsStateLayout>
    )
  } else if (locked) {
    return (
      <ListingDetailsStateLayout ref={ref}>
        <Banner src={url} width={width} />
        <ListingDetailsInner>
          <ListingDetailsStateLabel state={state} />
        </ListingDetailsInner>
      </ListingDetailsStateLayout>
    )
  }

  return (
    <ListingDetailsStateLayout ref={ref}>
      <Banner src={url} width={width} />
      <ListingDetailsInner>
        <TradeDetailsStateDetailsLayout alignment={Alignment.Right}>
          <TradeDetailsStateExpiration trade={listing} />
        </TradeDetailsStateDetailsLayout>
        <TradeDetailsStateSeparator locked={locked} />
        <TradeDetailsStateDetailsLayout alignment={Alignment.Left}>
          <ListingDetailsStateLabel state={state} />
        </TradeDetailsStateDetailsLayout>
      </ListingDetailsInner>
    </ListingDetailsStateLayout>
  )
}
