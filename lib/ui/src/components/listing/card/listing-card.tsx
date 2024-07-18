'use client'
import type { Listing } from '@echo/model/types/listing'
import { CardFooter } from '@echo/ui/components/base/card/card-footer'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { StackFooter } from '@echo/ui/components/base/stack/stack-footer'
import { ListingCardPicture } from '@echo/ui/components/listing/card/listing-card-picture'
import { ListingStackPicture } from '@echo/ui/components/listing/card/listing-stack-picture'
import { getNftStack } from '@echo/ui/helpers/nft/get-nft-stack'
import { getTokenIdString } from '@echo/ui/helpers/nft/get-token-id-string'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { head } from 'ramda'

export interface ListingCardProps<T extends Listing> {
  listing: T
  options?: {
    scaleDisabled?: boolean
  }
  onSelect?: (listing: T) => unknown
}

export const ListingCard = <T extends Listing>({ listing, options, onSelect }: ListingCardProps<T>) => {
  const { items } = listing
  if (isNonEmptyArray(items)) {
    if (items.length > 1) {
      const stack = getNftStack(items)
      return (
        <StackLayout
          onClick={() => {
            onSelect?.(listing)
          }}
        >
          <ListingStackPicture stack={stack} listing={listing} scaleDisabled={options?.scaleDisabled} />
          <StackFooter
            title={stack.collection.name}
            subtitle={getTokenIdString(stack.tokenId, stack.collection.totalSupply)}
          />
        </StackLayout>
      )
    }
    const item = head(items)
    return (
      <CardLayout
        onClick={() => {
          onSelect?.(listing)
        }}
      >
        <ListingCardPicture listing={listing} scaleDisabled={options?.scaleDisabled} />
        <CardFooter
          title={item.collection.name}
          subtitle={getTokenIdString(item.tokenId, item.collection.totalSupply)}
        />
      </CardLayout>
    )
  }
  return null
}
