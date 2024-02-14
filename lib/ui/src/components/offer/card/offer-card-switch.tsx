import type { OfferItem } from '@echo/model/types/offer-item'
import { CardFooter } from '@echo/ui/components/base/card/card-footer'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { StackFooter } from '@echo/ui/components/base/stack/stack-footer'
import type { OfferCardProps } from '@echo/ui/components/offer/card/offer-card'
import { OfferCardPicture } from '@echo/ui/components/offer/card/offer-card-picture'
import { OfferStackPicture } from '@echo/ui/components/offer/card/offer-stack-picture'
import { classes } from '@echo/ui/helpers/classes'
import { getNftStackFromItems } from '@echo/ui/helpers/item/get-nft-stack-from-items'
import { getTokenIdString } from '@echo/ui/helpers/nft/get-token-id-string'
import { getCounterpartyOfferItemsFromRole } from '@echo/ui/helpers/offer/get-counterparty-offer-items-from-role'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { head } from 'ramda'
import type { FunctionComponent } from 'react'

export const OfferCardSwitch: FunctionComponent<OfferCardProps> = ({ offer, options }) => {
  const items = getCounterpartyOfferItemsFromRole(offer)
  if (items.length > 1) {
    const stack = getNftStackFromItems(items)!
    return (
      <StackLayout className={classes(options?.asLink && 'group-hover:border-yellow-500')}>
        <OfferStackPicture stack={stack} offer={offer} scaleDisabled={options?.scaleDisabled} />
        <StackFooter
          title={stack.collection.name}
          subtitle={getTokenIdString(stack.tokenId, stack.collection.totalSupply)}
        />
      </StackLayout>
    )
  }
  const item = head(items as NonEmptyArray<OfferItem>)
  return (
    <CardLayout className={classes(options?.asLink && 'group-hover:border-yellow-500')}>
      <OfferCardPicture offer={offer} scaleDisabled={options?.scaleDisabled} />
      <CardFooter
        title={item.nft.collection.name}
        subtitle={getTokenIdString(item.nft.tokenId, item.nft.collection.totalSupply)}
      />
    </CardLayout>
  )
}
