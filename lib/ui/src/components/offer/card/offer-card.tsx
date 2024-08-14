'use client'
import { CardFooter } from '@echo/ui/components/base/card/card-footer'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { OfferCardPicture } from '@echo/ui/components/offer/card/offer-card-picture'
import { OfferStack } from '@echo/ui/components/offer/card/offer-stack'
import { getCounterpartyOfferItemsFromRole } from '@echo/ui/helpers/offer/get-counterparty-offer-items-from-role'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { clsx } from 'clsx'
import { head } from 'ramda'
import { type FunctionComponent } from 'react'

export interface OfferCardProps {
  offer: OfferWithRole
  options?: {
    asLink?: boolean
    scaleDisabled?: boolean
  }
  onSelect?: (offer: OfferWithRole) => unknown
}

export const OfferCard: FunctionComponent<OfferCardProps> = ({ offer, options, onSelect }) => {
  const items = getCounterpartyOfferItemsFromRole(offer)
  if (isNonEmptyArray(items)) {
    if (items.length > 1) {
      return <OfferStack offer={offer} options={options} items={items} onSelect={onSelect} />
    }
    const nft = head(items)
    return (
      <CardLayout
        className={clsx(options?.asLink && 'group-hover:border-yellow-500')}
        onClick={() => {
          onSelect?.(offer)
        }}
      >
        <OfferCardPicture offer={offer} scaleDisabled={options?.scaleDisabled} />
        <CardFooter title={nft.collection.name} subtitle={nft.tokenIdLabel} />
      </CardLayout>
    )
  }
  return null
}
