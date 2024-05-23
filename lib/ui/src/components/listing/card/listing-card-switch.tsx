import type { Listing } from '@echo/model/types/listing'
import type { Nft } from '@echo/model/types/nft'
import { CardFooter } from '@echo/ui/components/base/card/card-footer'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { StackFooter } from '@echo/ui/components/base/stack/stack-footer'
import { ListingCardPicture } from '@echo/ui/components/listing/card/listing-card-picture'
import { ListingStackPicture } from '@echo/ui/components/listing/card/listing-stack-picture'
import { getTokenIdString } from '@echo/ui/helpers/nft/get-token-id-string'
import { getNftStackFromArray } from '@echo/ui/helpers/stack/get-nft-stack-from-array'
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
    const stack = getNftStackFromArray(items)!
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
  const item = head(items as NonEmptyArray<Nft>)
  return (
    <CardLayout>
      <ListingCardPicture listing={listing} scaleDisabled={scaleDisabled} />
      <CardFooter title={item.collection.name} subtitle={getTokenIdString(item.tokenId, item.collection.totalSupply)} />
    </CardLayout>
  )
}
