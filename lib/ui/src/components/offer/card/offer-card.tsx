'use client'
import { offerSenderNftItems } from '@echo/model/helpers/offer/offer-sender-nft-items'
import type { Offer } from '@echo/model/types/offer'
import { CardFooter } from '@echo/ui/components/base/card/card-footer'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { OfferCardPicture } from '@echo/ui/components/offer/card/offer-card-picture'
import { OfferStackPicture } from '@echo/ui/components/offer/card/offer-stack-picture'
import { buildNftStack } from '@echo/ui/helpers/nft/build-nft-stack'
import { nftLabel } from '@echo/ui/helpers/nft/nft-label'
import { head } from 'ramda'
import { type FunctionComponent, useCallback } from 'react'

interface Props {
  offer: Offer
  onSelect?: (slug: Lowercase<string>) => void
}

export const OfferCard: FunctionComponent<Props> = ({ offer, onSelect }) => {
  const items = offerSenderNftItems(offer)
  const select = useCallback(() => {
    onSelect?.(offer.slug)
  }, [offer.slug, onSelect])

  if (items.length > 1) {
    const stack = buildNftStack(items, offer.sender)
    return (
      <StackLayout onClick={select}>
        <OfferStackPicture pictureUrl={stack.pictureUrl} label={stack.label} state={offer.state} />
        <CardFooter title={stack.collection.name} subtitle={stack.label} />
      </StackLayout>
    )
  }
  const item = head(items)
  return (
    <CardLayout onClick={select}>
      <OfferCardPicture pictureUrl={item.token.pictureUrl} label={nftLabel(item.token)} state={offer.state} />
      <CardFooter title={item.token.collection.name} subtitle={nftLabel(item.token)} />
    </CardLayout>
  )
}
