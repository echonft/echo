import type { OfferItem } from '@echo/model/types/offer-item'
import { CardFooter } from '@echo/ui/components/base/card/card-footer'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { StackFooter } from '@echo/ui/components/base/stack/stack-footer'
import { OfferCardPicture } from '@echo/ui/components/offer/card/offer-card-picture'
import { OfferStackPicture } from '@echo/ui/components/offer/card/offer-stack-picture'
import { getNftStackFromItems } from '@echo/ui/helpers/item/get-nft-stack-from-items'
import { getTokenIdString } from '@echo/ui/helpers/nft/get-token-id-string'
import { getCounterpartyOfferItemsFromRole } from '@echo/ui/helpers/offer/get-counterparty-offer-items-from-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { head } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  hideOwner?: boolean
  scaleDisabled?: boolean
}
export const OfferCardSwitch: FunctionComponent<Props> = ({ offer, hideOwner, scaleDisabled }) => {
  const items = getCounterpartyOfferItemsFromRole(offer)
  if (items.length > 1) {
    const stack = getNftStackFromItems(items)!
    return (
      <StackLayout>
        <OfferStackPicture stack={stack} offer={offer} hideOwner={hideOwner} scaleDisabled={scaleDisabled} />
        <StackFooter
          title={stack.collection.name}
          subtitle={getTokenIdString(stack.tokenId, stack.collection.totalSupply)}
        />
      </StackLayout>
    )
  }
  const item = head(items as NonEmptyArray<OfferItem>)
  return (
    <CardLayout>
      <OfferCardPicture offer={offer} hideOwner={hideOwner} scaleDisabled={scaleDisabled} />
      <CardFooter
        title={item.nft.collection.name}
        subtitle={getTokenIdString(item.nft.tokenId, item.nft.collection.totalSupply)}
      />
    </CardLayout>
  )
}
