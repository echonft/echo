import type { Listing } from '@echo/model/types/listing'
import type { OfferItem } from '@echo/model/types/offer-item'
import { CardFooter } from '@echo/ui/components/base/card/card-footer'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { StackFooter } from '@echo/ui/components/base/stack/stack-footer'
import { ListingCardPicture } from '@echo/ui/components/listing/card/listing-card-picture'
import { ListingStackPicture } from '@echo/ui/components/listing/card/listing-stack-picture'
import { getNftStackFromItems } from '@echo/ui/helpers/item/get-nft-stack-from-items'
import { getTokenIdString } from '@echo/ui/helpers/nft/get-token-id-string'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { head } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  listing: Listing
  scaleDisabled?: boolean
}
export const ListingCardSwitch: FunctionComponent<Props> = ({ listing, scaleDisabled }) => {
  const { items } = listing
  if (items.length > 1) {
    const stack = getNftStackFromItems(items)!
    return (
      <StackLayout>
        <ListingStackPicture stack={stack} listing={listing} scaleDisabled={scaleDisabled} />
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
      <ListingCardPicture listing={listing} scaleDisabled={scaleDisabled} />
      <CardFooter
        title={item.nft.collection.name}
        subtitle={getTokenIdString(item.nft.tokenId, item.nft.collection.totalSupply)}
      />
    </CardLayout>
  )
}
