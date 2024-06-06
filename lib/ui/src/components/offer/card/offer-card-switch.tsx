import { CardFooter } from '@echo/ui/components/base/card/card-footer'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import type { OfferCardProps } from '@echo/ui/components/offer/card/offer-card'
import { OfferCardPicture } from '@echo/ui/components/offer/card/offer-card-picture'
import { OfferStack } from '@echo/ui/components/offer/card/offer-stack'
import { getTokenIdString } from '@echo/ui/helpers/nft/get-token-id-string'
import { getCounterpartyOfferItemsFromRole } from '@echo/ui/helpers/offer/get-counterparty-offer-items-from-role'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { clsx } from 'clsx'
import { head } from 'ramda'
import type { FunctionComponent } from 'react'

export const OfferCardSwitch: FunctionComponent<OfferCardProps> = ({ offer, options }) => {
  const items = getCounterpartyOfferItemsFromRole(offer)
  if (isNonEmptyArray(items)) {
    if (items.length > 1) {
      return <OfferStack offer={offer} options={options} items={items} />
    }
    const nft = head(items)
    return (
      <CardLayout className={clsx(options?.asLink && 'group-hover:border-yellow-500')}>
        <OfferCardPicture offer={offer} scaleDisabled={options?.scaleDisabled} />
        <CardFooter title={nft.collection.name} subtitle={getTokenIdString(nft.tokenId, nft.collection.totalSupply)} />
      </CardLayout>
    )
  }
  return null
}
