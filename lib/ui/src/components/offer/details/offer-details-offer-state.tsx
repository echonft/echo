import { OfferState } from '@echo/model/constants/offer-state'
import { offerSenderNftItems } from '@echo/model/helpers/offer/offer-sender-nft-items'
import type { NftItem } from '@echo/model/types/item'
import type { Offer } from '@echo/model/types/offer'
import { Banner } from '@echo/ui/components/base/banner'
import { OfferDetailsOfferStateLabel } from '@echo/ui/components/offer/details/offer-details-offer-state-label'
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
  offer: Offer
}

const OfferDetailsStateLayout = forwardRef<HTMLDivElement, PropsWithChildren>(({ children }, ref) => {
  return (
    <div className={clsx('relative', 'w-full', 'h-max', 'pt-5', 'pb-24', 'px-8')} ref={ref}>
      {children}
    </div>
  )
})
OfferDetailsStateLayout.displayName = OfferDetailsStateLayout.name

const OfferDetailsInner: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx('flex', 'justify-center', 'items-center', 'w-full', 'h-full', 'relative', 'z-2')}>
      {children}
    </div>
  )
}

export const OfferDetailsOfferState: FunctionComponent<Props> = ({ offer }) => {
  const { ref, width } = useComponentWidth<HTMLDivElement>()
  const { state, locked } = offer
  const url = pipe<[Offer], NonEmptyArray<NftItem>, NftItem, Nullable<string>>(
    offerSenderNftItems,
    head,
    path<NftItem, 'token', 'pictureUrl'>(['token', 'pictureUrl'])
  )(offer)

  if (state === OfferState.Expired) {
    return (
      <OfferDetailsStateLayout ref={ref}>
        <Banner src={url} width={width} />
        <OfferDetailsInner>
          <TradeDetailsStateExpiration trade={offer} />
        </OfferDetailsInner>
      </OfferDetailsStateLayout>
    )
  } else if (locked) {
    return (
      <OfferDetailsStateLayout ref={ref}>
        <Banner src={url} width={width} />
        <OfferDetailsInner>
          <OfferDetailsOfferStateLabel state={state} />
        </OfferDetailsInner>
      </OfferDetailsStateLayout>
    )
  }

  return (
    <OfferDetailsStateLayout ref={ref}>
      <Banner src={url} width={width} />
      <OfferDetailsInner>
        <TradeDetailsStateDetailsLayout alignment={Alignment.Right}>
          <TradeDetailsStateExpiration trade={offer} />
        </TradeDetailsStateDetailsLayout>
        <TradeDetailsStateSeparator locked={locked} />
        <TradeDetailsStateDetailsLayout alignment={Alignment.Left}>
          <OfferDetailsOfferStateLabel state={state} />
        </TradeDetailsStateDetailsLayout>
      </OfferDetailsInner>
    </OfferDetailsStateLayout>
  )
}
